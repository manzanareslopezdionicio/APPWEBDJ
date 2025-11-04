from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='login'),
    path('registro/', views.registro, name='registro'),
   # path('login1/', views.login1, name='login1'),
]
