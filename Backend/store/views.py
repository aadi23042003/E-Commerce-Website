from django.shortcuts import render
from django.http import JsonResponse
from numpy import dtype
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Product,Category,Cart,CartItems,Order,OrderItem, UserProfile
from .serializers import ProductSerializer,CategorySerializer,CartItemSerializer,CartSerializer
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status

# Create your views here.


# Product List.............
@api_view(['GET'])
def product_list(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def product_details(request,pk):
    try:
       product=Product.objects.get(id=pk)
       serializer=ProductSerializer(product,context={'request':request})
       return Response(serializer.data)
    
    except Product.DoesNotExist:
       return Response({'error':'Product not found'},status=404)
       

    
# Category List.............
@api_view(['GET'])
def category_list(request):
    category=Category.objects.all()
    serializer=CategorySerializer(category,many=True)
    return Response(serializer.data)

#Cart Detail View.........
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_detail(request):
    cart,created=Cart.objects.get_or_create(user=request.user)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id=request.data.get('product_id')
    try:
        product=Product.objects.get(id=product_id)
        cart,created=Cart.objects.get_or_create(user=request.user)
        cart_item,created=CartItems.objects.get_or_create(cart=cart,product=product)
        if not created:
            cart_item.quantity+=1
            cart_item.save()
        return Response({'message':'Product added to cart'})
    except Product.DoesNotExist:
        return Response({'error':'Product not found'},status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    product_id=request.data.get('product_id')
    try:
        product=Product.objects.get(id=product_id)
        cart=Cart.objects.get(user=request.user)
        cart_item=CartItems.objects.get(cart=cart,product=product)
        cart_item.delete()
        return Response({'message':'Product removed from cart'})
    except Product.DoesNotExist:
        return Response({'error':'Product not found'},status=404)
    except Cart.DoesNotExist:
        return Response({'error':'Cart not found'},status=404)
    except CartItems.DoesNotExist:
        return Response({'error':'Cart item not found'},status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    product_id=request.data.get('product_id')
    quantity=request.data.get('quantity')
    try:
        product=Product.objects.get(id=product_id)
        cart=Cart.objects.get(user=request.user)
        cart_item=CartItems.objects.get(product=product,cart=cart)
        cart_item.quantity=quantity
        cart_item.save()
        return Response({'message':'Cart item quantity updated'})
    except Product.DoesNotExist:
        return Response({'error':'Product not found'},status=404)
    except Cart.DoesNotExist:
        return Response({'error':'Cart not found'},status=404)
    except CartItems.DoesNotExist:
        return Response({'error':'Cart item not found'},status=404)
    
# order creation view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data=request.data
        name=data.get('name')
        address=data.get('address')
        phone=data.get('phone')
        payment_method=data.get('payment_method','COD')
        
        #validate phone
        if not phone.isdigit() or len(phone)!=10:
            return Response({'error':'Invalid phone number'},status=400)
        
        cart,created=Cart.objects.get_or_create(user=request.user)
        
        if not cart.items.exists():
            return Response({'error':'Cart is empty'},status=400)
        
        total=sum(item.product.price*item.quantity for item in cart.items.all())
        
        order=Order.objects.create(user=request.user,total_amount=total
                                   
        )
        
        userr,created=UserProfile.objects.get_or_create(user=request.user)
        userr.address=str(address)
        userr.phone=phone
        
        userr.save()
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        cart.items.all().delete()
        return Response({'message':'Order created successfully'})
    except Exception as e:
        return Response({'error':str(e)},status=500)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    
    serializer=RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        user_serializer=UserSerializer(user)
        
        
    
        return Response({
            'message':'User registered successfully',
            'user':user_serializer.data,
        },status=status.HTTP_201_CREATED)
    if not serializer.is_valid():
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    