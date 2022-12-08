from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Libro

class LibroSerializer(ModelSerializer):
    class Meta:
        model=Libro
        fields = "__all__"


class UserLibroSerializer(ModelSerializer):
    class Meta:
        model= User
        fields = "__all__"