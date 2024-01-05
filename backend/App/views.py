
from django.shortcuts import render, redirect,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings  
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import F,Q, ExpressionWrapper
# Create your views here.
from decimal import Decimal,ROUND_HALF_UP



def calculateDiscount(discount,price):
    
   
    new = (price) -  Decimal(discount) * price
    return new.quantize(Decimal('0.00'), rounding=ROUND_HALF_UP)

def calculateDiscountStripe(discount,price):
    
    new = (price) -  Decimal(discount) * price
    return new

def calculateTotalDiscount(discount,price):
    print('price:',price)
   
    new = (price) -  Decimal(discount) * price
    return new.quantize(Decimal('0.00'), rounding=ROUND_HALF_UP)

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = MyUserSerializer(data=request.data)
       
        
        
        if serializer.is_valid():
            
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.save()
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'isLoggedIn':'true',
                'auth_token': token.key, 
            }
            return Response({'success': True, 'message': 'Signup successful', 'user': user_data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': 'Signup failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class InstructorSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = MyUserSerializer(data=request.data)
       
        
        
        if serializer.is_valid():
            
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.is_teacher = True
            user.is_student = False
            user.save()
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'isLoggedIn':'true',
                'auth_token': token.key, 
            }
            return Response({'success': True, 'message': 'Signup successful', 'user': user_data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': 'Signup failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):

    def post(self, request, *args, **kwargs):
        # Perform logout logic
        #request.auth.delete()  # Delete the user's token to log them out
        return Response({'success': True, 'message': 'Logout successful'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user:
            login(request, user)
            serializer = MyUserSerializer(user)

            #return Response(serializer.data)
            token, created = Token.objects.get_or_create(user=user)
            
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name, 
                'isLoggedIn':'true',
                'auth_token': token.key, 
                'isInstructor': user.is_teacher ,
            }
            print(user_data)
            print(user.is_authenticated)
            print(user.is_teacher)
            return Response({'success': True, 'message': 'Login successful', 'user': user_data})
        else:
            return Response({'success': False, 'error': 'Invalid credentials'}, status=401)




class InstructorLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user.is_teacher:
            login(request, user)
            serializer = MyUserSerializer(user)

            #return Response(serializer.data)
            token, created = Token.objects.get_or_create(user=user)
            
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name, 
                'isLoggedIn':'true',
                'auth_token': token.key, 
                'isInstructor': user.is_teacher ,
            }
          
            return Response({'success': True, 'message': 'Login successful', 'user': user_data},status=status.HTTP_201_CREATED)
        else:
            return Response({'success': False, 'error': 'Invalid credentials'}, status=401)




class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    
    def post(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
       
       
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=user)  # Set the instructor to the current user
            
            return Response({'success': True, },status=status.HTTP_201_CREATED)
       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class CategoryListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        
        categories = Categories.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubCategoryListAPIView(APIView):
    def get(self, request, category_id, *args, **kwargs):
        try:
            category = Categories.objects.get(id=category_id)
        except Categories.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        subcategories = SubCategories.objects.filter(category=category)
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class InstructorCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        courses = Course.objects.filter(instructor=user)
        serializer = InstructorCourseSerializer(courses, many=True)
        all_courses = []
        for course in courses:
            course_data = {
                'id': course.id,
                'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                'category': course.category.title,
                'subCategory': course.sub_category.title,
                'thumbnail': course.thumbnail.url,
                'description': course.description,
                'title': course.title,
    
            }
            all_courses.append(course_data)#
       
        return Response({'all_courses':all_courses}, status=status.HTTP_200_OK)



class SectionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id, *args, **kwargs):
        # Check if the course exists
        try:
            auth_header = request.headers.get('Authorization', '')
            _, token = auth_header.split()
            # Check if the token is valid
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            course = Course.objects.get(id=course_id, instructor=user)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found or you do not have permission to add sections to this course.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SectionSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(course=course)
        
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseSectionsView(APIView):
    def get(self, request, course_id, *args, **kwargs):
        try:
            sections = Section.objects.filter(course_id=course_id)
            serializer = SectionSerializer(sections, many=True)
            
            # Manually serialize contents for each section
            data = []
            for section in serializer.data:
                section_id = section['id']
                contents = Content.objects.filter(section_id=section_id)
                content_serializer = ContentSerializer(contents, many=True)
                
                section['contents'] = content_serializer.data
                data.append(section)
               
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ContentDetailView(APIView):
    def get(self, request, content_id, format=None):
        try:
            # Fetch content details based on content_id
            content = Content.objects.get(pk=content_id)
            serializer = ContentSerializer(content)
            print('serializer.data:',serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Content.DoesNotExist:
            return Response({"error": "Content not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        content = Content.objects.get(pk=pk)
        serializer = ContentSerializer(content, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        content = Content.objects.get(pk=pk)
        content.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SectionContentsView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, section_id, *args, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
            serializer = ContentSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(section=section)

                # List all contents under the section after saving
                contents = section.contents.all()  # Assuming related name is 'contents'
                content_serializer = ContentSerializer(contents, many=True)

                return Response({
                    'content': serializer.data,
                    'section_contents': content_serializer.data,
                }, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class UpdateSectionView(APIView):
    def put(self, request, section_id, *args, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
            serializer = SectionSerializer(instance=section, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteSectionView(APIView):
    def delete(self, request, section_id, *args, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
            section.delete()
            return Response({'message': 'Section deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UpdateContentView(APIView):
    def put(self, request, section_id, content_id, *args, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
            content = Content.objects.get(id=content_id, section=section)
            
            # Assuming you have a ContentSerializer for updating content
            serializer = ContentSerializer(instance=content, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except Content.DoesNotExist:
            return Response({'error': 'Content not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteContentView(APIView):
    def delete(self, request, section_id, content_id, *args, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
            content = Content.objects.get(id=content_id, section=section)
            content.delete()
            
            return Response({'message': 'Content deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except Content.DoesNotExist:
            return Response({'error': 'Content not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CourseListView(APIView):
    permission_classes = []
    authentication_classes = []
   
    def get(self, request, format=None):
        auth_header = request.headers.get('Authorization', '')
      
        if  auth_header != 'Token undefined':
            _, token = auth_header.split()
            
            # Check if the token is valid
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
        else:
            user = None
        
        courses = Course.objects.all()
        discount = Discount.objects.all()[0]

        all_courses = []
        for course in courses:
            is_enrolled = False
            if user:
                is_enrolled = Enrollment.objects.filter(student=user, course=course).exists()
            course_data = {
                'id': course.id,
                'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                'category': course.category.title,
                'subCategory': course.sub_category.title,
                'thumbnail': course.thumbnail.url,
                'description': course.description,
                'title': course.title,
                'price': course.price,
                'is_enrolled':is_enrolled,
                'discountPrice':calculateDiscount(discount.amount,course.price),
    
            }
            all_courses.append(course_data)#
        print('all_courses#@...:',all_courses)
       
        return Response({'all_courses':all_courses}, status=status.HTTP_200_OK)


class CourseDetailView(APIView):
    def get(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
            serializer = CourseDetailSerializer(course)
            discount = Discount.objects.all()[0]
            course_data = {
                'id': course.id,
                'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                'category': course.category.title,
                'subCategory': course.sub_category.title,
                'thumbnail': course.thumbnail.url,
                'description': course.description,
                'title': course.title,
                'price': course.price,
                'preview_video':course.preview_video.url if course.preview_video else '',
                'percentage': discount.get_amount_display(),
                'discountPrice':calculateDiscount(discount.amount,course.price),
    
            }
           
           
            return Response(course_data , status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)


class SectionListView(APIView):
    def get(self, request,courseId, format=None):
        sections = Section.objects.filter(course__id = courseId)
        print('sections..:',sections)
        serializer = SectionSerializer(sections, many=True)        
        # Manually serialize contents for each section
        data = []
        for section in serializer.data:
            section_id = section['id']
            contents = Content.objects.filter(section_id=section_id)
            content_serializer = ContentSerializer(contents, many=True)
            
            section['contents'] = content_serializer.data
            data.append(section)
       
        return Response(data, status=status.HTTP_200_OK)


class RequirementsCreateView(APIView):
    def post(self, request, course_id, format=None):
        # Assuming the course_id is passed as a parameter in the URL
        data = request.data.copy()
        data['course'] = course_id

        serializer = RequirementsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            # Fetch all requirements for the associated course after posting
            requirements = Requirements.objects.filter(course_id=course_id)
            requirements_serializer = RequirementsSerializer(requirements, many=True)

            return Response({
                'success': True,
                'message': 'Requirement created successfully',
                'requirements': requirements_serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, course_id, format=None):
        requirements = Requirements.objects.filter(course_id=course_id)
        serializer = RequirementsSerializer(requirements, many=True)
       
        return Response(serializer.data)


class RequirementsUpdateAPIView(APIView):
    def put(self, request, course_id, requirement_id, format=None):
        data = request.data.copy()
        data['course'] = course_id
       
        try:
            requirement = Requirements.objects.get(pk=requirement_id, course_id=course_id)
        except Requirements.DoesNotExist:
            return Response({'error': 'Requirement not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RequirementsSerializer(requirement, data=data)
        if serializer.is_valid():
            serializer.save()
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequirementsDeleteAPIView(APIView):
    def delete(self, request, course_id, requirement_id, format=None):
        try:
            requirement = Requirements.objects.get(pk=requirement_id, course_id=course_id)
        except Requirements.DoesNotExist:
            return Response({'error': 'Requirement not found'}, status=status.HTTP_404_NOT_FOUND)

        requirement.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)
        


class ObjectivesCreateView(APIView):
    def post(self, request, course_id, format=None):
        # Assuming the course_id is passed as a parameter in the URL
        data = request.data.copy()
        data['course'] = course_id
       
        serializer = ObjectivesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            # Fetch all requirements for the associated course after posting
            objectives = Objectives.objects.filter(course_id=course_id)
            objectives_serializer = ObjectivesSerializer(objectives, many=True)

            return Response({
                'success': True,
                'message': 'Objective created successfully',
                'objectives': objectives_serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, course_id, format=None):
        objectives = Objectives.objects.filter(course_id=course_id)
        serializer = ObjectivesSerializer(objectives, many=True)
      
        return Response(serializer.data)




class ObjectivesUpdateAPIView(APIView):
    def put(self, request, course_id, requirement_id, format=None):
        data = request.data.copy()
        data['course'] = course_id
       
        try:
            objectives = Objectives.objects.get(pk=requirement_id, course_id=course_id)
        except Objectives.DoesNotExist:
            return Response({'error': 'objectives not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ObjectivesSerializer(objectives, data=data)
        if serializer.is_valid():
            serializer.save()
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
      
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObjectivesDeleteAPIView(APIView):
    def delete(self, request, course_id, requirement_id, format=None):
        try:
            objective = Objectives.objects.get(pk=requirement_id, course_id=course_id)
        except Objectives.DoesNotExist:
            return Response({'error': 'objectives not found'}, status=status.HTTP_404_NOT_FOUND)

        objective.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)
        



class ContentTypeCountView(APIView):
    def get(self, request, course_id, format=None):
        try:
            # Get the course
            course = Course.objects.get(pk=course_id)

            # Get distinct content types related to the course
            content_types = Content.objects.filter(section__course=course).values('content_type').distinct()

            # Count the number of each content type
            content_counts = []
            for content_type in content_types:
                count = Content.objects.filter(section__course=course, content_type=content_type['content_type']).count()
                content_counts.append({'content_type': content_type['content_type'], 'count': count})
          
            serializer = ContentTypeCountSerializer(content_counts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class AddToCartView(APIView):
    # authentication_classes = [TokenAuthentication]

    def post(self, request,course_id, *args, **kwargs):
      
        auth_header = request.headers.get('Authorization', '')

        try:
            _, token = auth_header.split()
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
        except (ValueError, Token.DoesNotExist):
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

        shopping_cart, created = ShoppingCart.objects.get_or_create(user=user)

        # Check if the course is already in the cart
        
        if Course.objects.filter(id=course_id, shoppingcart__user=user).exists():
            # Get the Course object and remove it from the cart
            course = Course.objects.get(id=course_id)
            shopping_cart.courses.remove(course)
            return Response({"success": "Course is removed from cart"}, status=status.HTTP_200_OK)

        # Get the Course object and add it to the cart
       
        course = Course.objects.get(id=course_id)
        shopping_cart.courses.add(course)

        serializer = ShoppingCartSerializer(shopping_cart)
        return Response({"success": "Course is added to cart", 'data': serializer.data}, status=status.HTTP_201_CREATED)





class GoToCartView(APIView):
    # authentication_classes = [TokenAuthentication]

    def post(self, request,course_id, *args, **kwargs):
      
        auth_header = request.headers.get('Authorization', '')

        try:
            _, token = auth_header.split()
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
        except (ValueError, Token.DoesNotExist):
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

        shopping_cart, created = ShoppingCart.objects.get_or_create(user=user)

        # Check if the course is already in the cart
       
        if Course.objects.filter(id=course_id, shoppingcart__user=user).exists():
            # Get the Course object and remove it from the cart
            #course = Course.objects.get(id=course_id)
            
            #shopping_cart.courses.remove(course)
            return Response({"success": "Course is already in cart"}, status=status.HTTP_200_OK)

        # Get the Course object and add it to the cart
       
        course = Course.objects.get(id=course_id)
        shopping_cart.courses.add(course)

        serializer = ShoppingCartSerializer(shopping_cart)
        return Response({"success": "Course is added to cart", 'data': serializer.data}, status=status.HTTP_201_CREATED)





def get_line_items(cart_items,totalAmount):
    line_items = []
    
    discount = Discount.objects.all()[0]
    for cart_item in cart_items.courses.all():
        
        
        line_item = {
            'price_data': {
                'currency': 'gbp',
                'unit_amount': int(calculateDiscountStripe(discount.amount,cart_item.price)) * 100,  # cart_item.product.discount_priceStripe uses amounts in cents, so multiply by 100
                'product_data': {
                    'name': cart_item.title,

                },
            },
            'quantity': 1,

        }

        line_items.append(line_item)

    return line_items

class CheckoutView(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request, *args, **kwargs):
       
        stripe.api_key = ""
        #sk_test_51MqMCzE0QuPBMsJ4GQmlZdaPbRphrv3cdthwpQIsf2X5Z2Bz9EHMEvi3rIjH005ewvUyQ91NUJ4B0Kupkv18d3bc00Ooulm6QJ
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        print('token:',token)
            # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        shopping_cart = ShoppingCart.objects.get(user=user)
        courses = shopping_cart.courses.all()
       
        payment_method = request.data.get('payment-method')
        # Calculate total_amount based on your logic (e.g., summing up course prices)
        total_amount = shopping_cart.calculate_total_amount()

        order = Order.objects.create(user=user, total_amount=total_amount)
        order.courses.set(courses)
        

        # Create a Checkout Session using Stripe Checkout
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items= get_line_items(shopping_cart,total_amount),
            mode='payment',
            success_url='http://localhost:3000/payment-success/',
            cancel_url='http://localhost:3000/api/payment/cancel/',
        )

        # Save the Stripe Checkout Session ID in your database
        order.stripe_checkout_session_id = session.id
        order.save()

        # Clear the user's cart after creating the order
        #shopping_cart.clear()
        

        order_serializer = OrderSerializer(order)
        user_data = {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name, 
            'isLoggedIn':'true',
            'auth_token': token, 
            'isInstructor': user.is_teacher ,
            'stripeId':session.id,
        }
        print('session.id',session.id)
        print('user_data :',user_data )
        #print(session.url)
        payment = Payment.objects.create(
            order=order,
            payment_method=payment_method,
            transaction_id=session.id,
            amount=total_amount
        )
        return Response({'user':user_data,'success':True,'data':order_serializer.data,'url':session.url}, status=status.HTTP_201_CREATED)

class PaymentSuccessView(APIView):
    def get(self, request,stripeId, *args, **kwargs):
        # Extract the session ID from the query parameters
        print('request.data:',stripeId)
        session_id = stripeId
        print('session_id:',session_id)
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
            # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        shopping_cart = ShoppingCart.objects.get(user=user)

        # Retrieve the order based on the Stripe Checkout Session ID
        try:
            order = Order.objects.get(stripe_checkout_session_id=session_id)
            order.order_status = 'success'
            order.save()
            serializer = OrderSerializer(order)

            # Enroll the user in the courses associated with the order
            for course in order.courses.all():
                Enrollment.objects.create(student= user, course=course)
            shopping_cart.clear()
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Order.DoesNotExist:
            # Handle the case where the order is not found
            return Response({'success': False, 'error_message': 'Order not found'}, status=status.HTTP_201_CREATED)


class PaymentCancelView(APIView):
    def get(self, request, *args, **kwargs):
        print('request.session:',request.session.get('stripe_id'))
        print(request.session)
        return Response({'success':False,'error_message': 'Payment cancelled',}, status=status.HTTP_201_CREATED)


class ShoppingCartView(APIView):
    #permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
       
        try:
            shopping_cart = ShoppingCart.objects.get(user=user)
            
            serializer = ShoppingCartSerializer(shopping_cart)
            #print('serializer.data:',serializer.data)
          
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ShoppingCart.DoesNotExist:
            return Response({'error': 'Shopping cart not found for the user.'}, status=status.HTTP_404_NOT_FOUND)



class ShoppingCartList(APIView):
    #permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
       
        try:
            shopping_cart = ShoppingCart.objects.get(user=user)
            total_amount = shopping_cart.calculate_total_amount()
            discount = Discount.objects.all()[0]
            all_courses = []
            for course in shopping_cart.courses.all():
                course_data = {
                    'id': course.id,
                    'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                    'category': course.category.title,
                    'subCategory': course.sub_category.title,
                    'thumbnail': course.thumbnail.url,
                    'description': course.description,
                    'title': course.title,
                    'overview': course.overview,
                    'price': course.price,
                    'discountPrice':calculateDiscount(discount.amount,course.price),
        
                }
                all_courses.append(course_data)#
            
          
           
            serializer = ShoppingCartSerializer(shopping_cart)
           
            return Response({'courses': all_courses, 'total_amount': calculateTotalDiscount(discount.amount,total_amount)}, status=status.HTTP_200_OK)
        except ShoppingCart.DoesNotExist:
            return Response({'error': 'Shopping cart not found for the user.'}, status=status.HTTP_404_NOT_FOUND)






class EnrolledCoursesView(APIView):
    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        print('user :',user )
        # Retrieve the enrolled courses for the authenticated user
        enrolled_courses = Enrollment.objects.filter(student=user)
        print('enrolled_courses:',enrolled_courses)
        serializer = EnrollmentSerializer(enrolled_courses, many=True)
        all_courses = []
        for enrollment in enrolled_courses:
            course = enrollment.course
            course_data = {
                'id': course.id,
                'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                'category': course.category.title,
                'subCategory': course.sub_category.title,
                'thumbnail': course.thumbnail.url,
                'description': course.description,
                'title': course.title,
                'overview': course.overview,
                'price': course.price,
                'enrollment_date': enrollment.enrollment_date.strftime('%Y-%m-%d %H:%M:%S'),
            }
            all_courses.append(course_data)
        
        # Return the serialized data in the response
        return Response({'all_courses': all_courses}, status=status.HTTP_200_OK)


class CheckEnrollmentView(APIView):
    def get(self, request, course_id, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
      
        enrollment = Enrollment.objects.filter(student=user, course__id=course_id)
        if enrollment.exists():
            enrollment = Enrollment.objects.filter(student=user, course__id=course_id)
           
            return Response({'enrolled': True}, status=status.HTTP_200_OK)
        else:
            return Response({'enrolled': False}, status=status.HTTP_200_OK)


class ProfileCreateView(APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Assuming the user is authenticated, you can access the user through request.user
       
        
        auth_header = request.headers.get('Authorization', '')
        
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        data = request.data.copy()
        data['user'] = user.id
       

        # Validate the data sent in the request
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            # Save the profile with the associated user
            serializer.save(user=user)
            print('serializer.data:',serializer.data)
            return Response({'success':True,'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        try:
            # Retrieve the user's profile
            profile = Profile.objects.get(user=user)

            # Check if the user making the request is the profile owner
            self.check_object_permissions(request, profile)

            # Serialize the existing profile data
            serializer = ProfileSerializer(profile, data=request.data, partial=True)

            if serializer.is_valid():
                # Update the profile with the new data
                serializer.save()

                return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Profile.DoesNotExist:
            # Handle the case where the profile is not found
            return Response({'success': False, 'error_message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            # Handle other exceptions and return an error response
            return Response({'success': False, 'error_message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class FetchProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        if Profile.objects.filter(user = user).exists():
            profile = Profile.objects.get(user = user)
            profile_data = {
                'title':profile.title,
                'biography':profile.biography,
                'website':profile.website,
                'picture':profile.picture.name,
                'phone':profile.phone
            }
            print(' profile_data :', profile_data )
            return Response({'success': True,'data':profile_data}, status=status.HTTP_200_OK)
        else:
             return Response({'success': False,}, status=status.HTTP_200_OK)
      
        
   
class EditCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, course_id, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        # Get the course to be updated

        if Course.objects.filter(id=course_id, instructor = user).exists():
            course = Course.objects.get(id=course_id)
            serializer = CourseSerializer(course, data=request.data, partial=True)

            if serializer.is_valid():
                # Update the course with the new data
                serializer.save()
                return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

        else:
            return Response({'success': False, 'error_message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

   
class SearchCoursesView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')

        # Customize the search logic based on your requirements
        courses = Course.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) | 
            Q(category__title__icontains=query) |
            Q(sub_category__title__icontains=query) 
           
        )
        discount = Discount.objects.all()[0]
        all_courses = []
        for course in courses:
            course_data = {
                'id': course.id,
                'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                'category': course.category.title,
                'subCategory': course.sub_category.title,
                'thumbnail': course.thumbnail.url,
                'description': course.description,
                'title': course.title,
                'price':course.price,
                'discountPrice':calculateDiscount(discount.amount,course.price),
    
            }
            all_courses.append(course_data)#
        print(all_courses)
        #serializer = CourseSerializer(queryset, many=True)
        return Response({'all_courses':all_courses}, status=status.HTTP_200_OK)





class FetchProfileView(APIView):
    #permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
       
        if Profile.objects.filter(user=user).exists():
            profile = Profile.objects.get(user=user)
            
            user_data = {
                'first_name':profile.user.first_name,
                'last_name':profile.user.last_name,
                'picture':profile.picture.url if profile.picture  else '',
                'title':profile.title,
                'biography':profile.biography,
                'website':profile.website,
                'phone':profile.phone,
            }
            print(user_data)
            return Response({'data':user_data,'success':True}, status=status.HTTP_200_OK)
        else:
            return Response({'success':False}, status=status.HTTP_404_NOT_FOUND)
        



class CheckCourseOwnerView(APIView):
    #permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request,courseId, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        _, token = auth_header.split()
        
        # Check if the token is valid
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
       
        if Course.objects.filter(instructor=user,id = courseId).exists():
            return Response({'success':True}, status=status.HTTP_200_OK)
        else:
            return Response({'success':False}, status=status.HTTP_404_NOT_FOUND)
        

