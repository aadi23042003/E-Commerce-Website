from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('products/',views.product_list),
    path('products/<int:pk>/',views.product_details),
    path('category/',views.category_list),
    path('cart/',views.cart_detail),
    path('cart/add/',views.add_to_cart),
    path('cart/remove/',views.remove_from_cart),
    path('cart/update/',views.update_cart_quantity),
    path('orders/create/',views.create_order),
    path('register/',views.register),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]
