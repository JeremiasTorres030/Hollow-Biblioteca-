from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth.hashers import make_password
from server.settings import env
from django.http import FileResponse
from knox.auth import AuthToken
import os
import environ
import dropbox
import time

from django.contrib.auth.models import User
from .models import Libro
from .serializers import LibroSerializer
from .serializers import UserLibroSerializer

dbx = dropbox.Dropbox(app_key = environ.Env.get_value(env,"APP_KEY"),app_secret = environ.Env.get_value(env,"APP_SECRET"),oauth2_refresh_token = environ.Env.get_value(env,"ACCESS_TOKEN_DROPBOX"))

class PdfView(APIView):
    def get(self,request,libro_id,format = None):
        libros = Libro.objects.filter(id=libro_id)
        if libros:
            for libro in libros:
                ubicacion = os.path.abspath(f"{libro.file.url[1:]}")
                dbx.files_download_to_file(path=libro.path_file,download_path=ubicacion)
            return FileResponse(open(ubicacion, 'rb'), content_type='application/pdf')
        return FileNotFoundError()

    def delete(self,request,libro_id,format = None):
        libros = Libro.objects.filter(id=libro_id)
        if libros:
            for libro in libros:
                ubicacion = os.path.abspath(f"{libro.file.url[1:]}")
                os.remove(ubicacion)
                return Response({"msg":"Libro eliminado con exito", "ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error en el servidor","ok":False}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)


class LibrosView(APIView):
    parser_classes = [MultiPartParser,JSONParser]

    def get(self,request,format=None):
        user = request.user
        if user.is_authenticated:
            libro = Libro.objects.filter(user_id=user.id)
            if libro.__len__() == 0:
                return Response([],status=status.HTTP_200_OK)
            serializer = LibroSerializer(libro,many=True) 
            return Response(serializer.data)
        return Response({"msg":"El usuario no esta autenticado","ok":False}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self,request,format=None): 
        user = request.user
        if user.is_authenticated:
            request.data["user_id"] = user.id
            serializer = LibroSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                timeFile= int(time.time())
                pdf=open(os.path.abspath(f"pdfs/{request.data['file'].name.replace(' ','_')}"),'rb')
                pdf=pdf.read()
                dbx.files_upload(pdf,f"/pdfs/{timeFile}{request.data['file']}")
                os.remove(os.path.abspath(f"pdfs/{request.data['file'].name.replace(' ','_')}"))
                libro = Libro.objects.filter(id=serializer.data["id"]).update(path_file=f"/pdfs/{timeFile}{request.data['file']}")
                return Response({"msg":"Libro registrado con exito","ok":True}, status=status.HTTP_200_OK)
            return Response(serializer.errors)
        return Response({"msg":"El usuario no esta autenticado","ok":False},status= status.HTTP_401_UNAUTHORIZED)

    def put(self,request,id,format = None):
        user = request.user
        libro = Libro.objects.filter(id=id)
        if user.is_authenticated and libro:
           libro.update(title= request.data['title'],thumbnail = request.data['thumbnail'])
           return Response({'ok':True,'msg':'el libro ha sido modificado con exito'}, status= status.HTTP_200_OK)
        return Response({"ok":False, 'msg':"Hubo un error en el servidor"}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self,request,id,format = None):
        user = request.user
        libro = Libro.objects.filter(id=id)
        if user.is_authenticated and libro:
           dbx.files_delete(libro[0].path_file)
           libro.delete()
           return Response({'ok':True,'msg':'el libro ha sido eliminado con exito'},status=status.HTTP_200_OK)
        return Response({"ok":False, 'msg':"Hubo un error en el servidor"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class userView(APIView):
    def get(self,request, format=None):
        user = User.objects.all()
        serializer = UserLibroSerializer(user,many=True) 
        return Response(serializer.data)
    
    def post(self,request,format=None):
        request.data["password"] = make_password(request.data["password"])
        user_email = User.objects.filter(email=request.data["email"])
        user_username = User.objects.filter(username=request.data["username"])
        if user_username.__len__() != 0 :
            return Response({"ok":False,"msg":"El nombre de usuario ya existe"}, status=status.HTTP_226_IM_USED)
        if user_email.__len__() != 0 :
             return Response({"ok":False,"msg":"El correo ya esta en uso"}, status=status.HTTP_226_IM_USED)
        serializer = UserLibroSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"ok":True,"msg":"Usuario registrado con exito"},status=status.HTTP_200_OK)
        return Response({"ok":False,"msg":"Hubo un error en el servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        

class userLoginView(APIView):
    def post(self,request,format=None):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            _,token = AuthToken.objects.create(user)
            return Response({
                "user":{
                    "username":user.username,
                    "email":user.email,
                    "id":user.id
                },
                "token":token
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_500_INTERNAL_SERVER_ERROR)



