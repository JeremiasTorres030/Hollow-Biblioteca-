
from django.contrib import admin
from django.urls import path, include , re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name="index.html")),
    path('user/libros', TemplateView.as_view(template_name="index.html")),
    path("user/libro/<id>", TemplateView.as_view(template_name="index.html")),
    path("register", TemplateView.as_view(template_name="index.html")),
]
