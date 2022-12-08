from django.urls import path
from .views import *
from knox.views import LogoutView


urlpatterns = [
    path('libros/',LibrosView.as_view()),
    path('libros/<int:id>/',LibrosView.as_view()),
    path('user/',userView.as_view()),
    path('user/login/',userLoginView.as_view()),
    path('user/logout/',LogoutView.as_view()),
    path('pdf/<libro_id>/',PdfView.as_view()),
]
