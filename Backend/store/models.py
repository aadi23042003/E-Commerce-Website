from django.db import models

# Create your models here.
from django.contrib.auth.models import User
#Category Model
class Category(models.Model):
    name=models.CharField(max_length=50,unique=True)
    slug=models.SlugField(unique=True)
    description=models.TextField(max_length=200,blank=True)
    def __str__(self):
        return self.name
    
# Product Model...
class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    name=models.CharField(max_length=100)
    original_price=models.DecimalField(max_digits=10,decimal_places=2)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    image=models.ImageField(upload_to='products/',blank=True,null=True)
    quantity=models.IntegerField(default=1)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
# User Profile Table......
class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    phone=models.CharField(max_length=15,blank=True,null=True)
    address=models.TextField(blank=True,null=True)
    bio=models.TextField(max_length=200,blank=True,null=True)
    avatar=models.URLField(blank=True,null=True)
    def __str__(self):
        return self.user.username
    
# Order Table here ......
class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='order',null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    total_amount=models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"Order {self.id}"

# Order item table.....
class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    def __str__(self):
        return f"{self.quantity} X {self.product.name}"

# Cart of User
class Cart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user}"
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())

# Cart Items Model.....
class CartItems(models.Model):
    cart=models.ForeignKey(Cart,related_name='items',on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    def __str__(self):
        return f"{self.quantity} X {self.product.name}"
    
    @property
    def subtotal(self):
        return self.quantity * self.product.price
