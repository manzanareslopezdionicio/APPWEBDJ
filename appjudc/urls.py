from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='login'),
    path('registro/', views.registro, name='registro'),
    path('estudiante/', views.estudiante, name='estudiante'),
    path('index/', views.index, name='index'),
    path('indexU/', views.indexUsuario, name='indexUsuario'),
]
