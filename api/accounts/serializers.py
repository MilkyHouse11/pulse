from rest_framework.serializers import ModelSerializer, ValidationError
from .models import User


class UserRegistrationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

    def validate_password(self, value):
        if len(value) < 6:
            raise ValidationError('Длина пароля должна быть минимум 6 символов')
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value):
            raise ValidationError("Этот email уже зарегистрирован")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user