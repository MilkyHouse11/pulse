from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/blacklist', views.CustomTokenBlacklistView.as_view(), name='token_black_lisk'),
    path('token/refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.UserRegistrationView.as_view())
]