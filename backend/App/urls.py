from django.urls import path
from .views import (SignupView,CheckCourseOwnerView,FetchProfileView,SearchCoursesView,EditCourseView,FetchProfileView,EditProfileView,ProfileCreateView,InstructorLoginView,InstructorSignupView,GoToCartView,CheckEnrollmentView,EnrolledCoursesView,PaymentSuccessView,PaymentCancelView,CheckoutView,ShoppingCartList,AddToCartView,ShoppingCartView,ContentTypeCountView,ObjectivesDeleteAPIView,ObjectivesUpdateAPIView,RequirementsCreateView,ObjectivesCreateView, RequirementsUpdateAPIView,RequirementsDeleteAPIView, SectionListView,CourseDetailView,CourseListView,DeleteSectionView,UpdateContentView, DeleteContentView,ContentDetailView,UpdateSectionView,SectionContentsView,CourseSectionsView,SectionCreateView,LogoutView,LoginView,InstructorCoursesView,CourseCreateView,CategoryListAPIView,SubCategoryListAPIView)


urlpatterns = [
    path('api/courses/', CourseListView.as_view(), name='course-list'),
    path('courses/<int:course_id>/add-requirements/', RequirementsCreateView.as_view(), name='add-requirements'),
    path('courses/<int:course_id>/add-objectives/', ObjectivesCreateView.as_view(), name='add-objectives'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('api/sections/<int:courseId>/', SectionListView.as_view(), name='section-list'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('instructor-signup/', InstructorSignupView.as_view(), name='instructor-signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
    path('Instuctor-login/', InstructorLoginView.as_view(), name='Instuctor-login'),
    path('courses/create/', CourseCreateView.as_view(), name='create-course'),
    path('api/categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('api/subcategories/<int:category_id>/', SubCategoryListAPIView.as_view(), name='subcategory-list'),
    path('instructor-courses/', InstructorCoursesView.as_view(), name='instructor-courses'),
    path('courses/<int:course_id>/add-section/', SectionCreateView.as_view(), name='add-section'),
    path('courses/<int:course_id>/sections/', CourseSectionsView.as_view(), name='course-sections'),
    path('sections/<int:section_id>/contents/', SectionContentsView.as_view(), name='section-contents'),
    path('api/sections/<int:section_id>/update/', UpdateSectionView.as_view(), name='update_section'),
    path('api/sections/<int:section_id>/delete/', DeleteSectionView.as_view(), name='delete_section'),

    path('api/sections/<int:section_id>/contents/<int:content_id>/update/', UpdateContentView.as_view(), name='update-content'),
    path('api/sections/<int:section_id>/contents/<int:content_id>/delete/', DeleteContentView.as_view(), name='delete-content'),

    path('courses/<int:course_id>/requirements/<int:requirement_id>/edit/', RequirementsUpdateAPIView.as_view(), name='requirements-update'),
    path('courses/<int:course_id>/requirements/<int:requirement_id>/delete/', RequirementsDeleteAPIView.as_view(), name='requirements-delete'),
    path('courses/<int:course_id>/objectives/<int:requirement_id>/edit/', ObjectivesUpdateAPIView.as_view(), name='objectives-update'),
    path('courses/<int:course_id>/objectives/<int:requirement_id>/delete/', ObjectivesDeleteAPIView.as_view(), name='objectives-delete'),
    path('api/course/<int:course_id>/content-type-count/', ContentTypeCountView.as_view(), name='content-type-count'),
    path('api/contents/<int:content_id>/', ContentDetailView.as_view(), name='content-detail'),

    path('api/shopping-cart/', ShoppingCartView.as_view(), name='shopping-cart'),
    path('add-to-cart/<int:course_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('go-to-cart/<int:course_id>/', GoToCartView.as_view(), name='go-to-cart'),
    path('api/shopping-cart-list/', ShoppingCartList.as_view(), name='shopping-cart-list'),
    path('api/checkout/', CheckoutView.as_view(), name='checkout'),
    path('api/payment/cancel/', PaymentCancelView.as_view(), name='payment-cancel'),
    path('api/payment/<str:stripeId>/success/', PaymentSuccessView.as_view(), name='payment-success'),
    path('enrolled-courses/', EnrolledCoursesView.as_view(), name='enrolled-courses'),
    path('api/check-enrollment/<int:course_id>/', CheckEnrollmentView.as_view(), name='check-enrollment'),
    path('profile/create/',ProfileCreateView.as_view(), name='profile-create'),
    path('profile/edit/',EditProfileView.as_view(), name='profile-edit'),
    path('profile/fetch/',FetchProfileView.as_view(), name='profile-fetch'),
    path('courses/<int:course_id>/edit/', EditCourseView.as_view(), name='course-edit'),
    path('api/search-courses/', SearchCoursesView.as_view(), name='search-courses'),
    path('api/fetch-profile/', FetchProfileView.as_view(), name='fetch-profile'),
    path('api/check-course-owner/<int:courseId>/',CheckCourseOwnerView.as_view(),name='check-course-owner'),
    
]