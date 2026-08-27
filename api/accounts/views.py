from rest_framework.generics import CreateAPIView
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView


class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

class CustomTokenBlacklistView(TokenBlacklistView):
    permission_classes = [AllowAny]