from django.db import models
from django.conf import settings
# Create your models here.

from .manager import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.conf import settings

'''deceased>>memorial>>biography'''


class myuser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=40,blank=False)
    last_name = models.CharField(max_length=40,blank=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_student = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name',]
    objects = CustomUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'



class Categories(models.Model):
    title = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.title


class SubCategories(models.Model):
    category = models.ForeignKey(Categories,on_delete=models.CASCADE,null=True)
    title = models.CharField(max_length=200)
    
    class Meta:
        verbose_name_plural = 'SubCategories'

    def __str__(self):
        return self.title


class Course(models.Model):
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    category = models.ForeignKey(Categories,on_delete=models.CASCADE)
    sub_category = models.ForeignKey(SubCategories,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to ='thumbnail')
    preview_video = models.FileField(upload_to='course-preview-video/', null=True, blank=True)
    overview = models.CharField(max_length=100)
    description = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Add this line for the price field

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    biography = models.TextField()
    phone = models.CharField(max_length=200)
    website = models.CharField(max_length=200)
    picture = models.ImageField(upload_to ='profile/')

    def __str__(self):
        return f'{self.title}'



class Section(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return f"{self.title} - {self.course.title}"


class Content(models.Model):
    CONTENT_TYPES = [
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('document', 'Document'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
        # Add more content types as needed
    ]

    title = models.CharField(max_length=255)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    content_file = models.FileField(upload_to='content_files/', null=True, blank=True)
    content = models.TextField(null=True)
    section = models.ForeignKey('Section', on_delete=models.CASCADE, related_name='contents')

    def __str__(self):
        return f"{self.title} - {self.content_type} - {self.section.title}"


class Enrollment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='enrollments')
    enrollment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} enrolled in {self.course}"



class Requirements(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='requirements')

    def __str__(self):
        return f"{self.title} - {self.course.title}"



class Objectives(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='objectives')

    def __str__(self):
        return f"{self.title} - {self.course.title}"


class ShoppingCart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)

    def calculate_total_amount(self):
        return sum(course.price for course in self.courses.all())

    def clear(self):
        self.courses.clear()

class Order(models.Model):
    ORDER_STATUS = [
        ('pending', 'pending'),
        ('success', 'success'),
        ('cancel', 'cancel'),
        # Add more payment methods as needed
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    stripe_checkout_session_id = models.CharField(max_length=100,null=True,blank=True)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS,default='pending')
    
class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
        # Add more payment methods as needed
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

class Discount(models.Model):
    CHOICES = [
        (0.1, '10%'),
        (0.2, '20%'),
        (0.3, '30%'),
        (0.4, '40%'),
        (0.5, '50%'),
        (0.6, '60%'),
        (0.7, '70%'),
        (0.8, '80%'),
        # Add more discount options as needed
    ]
    amount = models.FloatField(choices=CHOICES, default=0.1)

    def __str__(self):
        return f'{self.get_amount_display()} Discount'
    class Meta:
        ordering = ['-id']
