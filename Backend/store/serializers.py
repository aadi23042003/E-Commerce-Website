from rest_framework import serializers
from .models import Category,Product,CartItems,Cart
from django.contrib.auth.models import User
# Category Serializer.....
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'
# Product Serializer .....
class ProductSerializer(serializers.ModelSerializer):
    category=CategorySerializer(read_only=True)
    class Meta:
        model=Product
        fields='__all__'

# Cart Item Serializer....
class CartItemSerializer(serializers.ModelSerializer):
    product_name=serializers.CharField(source='product.name',read_only=True)
    product_price=serializers.DecimalField(source='product.price',read_only=True,max_digits=10,decimal_places=2)
    product_image=serializers.ImageField(source='product.image',read_only=True)
    class Meta:
        model=CartItems
        fields='__all__'

# Cart Serializer ....
class CartSerializer(serializers.ModelSerializer):
    items=CartItemSerializer(many=True,read_only=True)
    total=serializers.ReadOnlyField()
    class Meta:
        model=Cart
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class RegisterSerializer(serializers.ModelSerializer):
    
    password=serializers.CharField(write_only=True)
    password2=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password','password2']
    
    def validate(self,data):
        if data['password']!=data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
