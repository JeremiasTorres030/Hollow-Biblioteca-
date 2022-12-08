from django.db import models
from django.contrib.auth.models import User

class Libro(models.Model):
    title=models.CharField(max_length=255, null=False, default="Book")
    file=models.FileField(upload_to='pdfs')
    path_file= models.CharField(max_length=255, null=False, default='')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    thumbnail = models.TextField(null=False,default="https://res.cloudinary.com/drifqbdtu/image/upload/v1669833009/Lectura/Libro-Abierto-B%C3%A1sico_nqspcx.jpg")

