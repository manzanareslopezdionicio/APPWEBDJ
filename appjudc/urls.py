from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='login'),
    path('login/', views.login, name='login'),
    path('registro/', views.registro, name='registro'),
    #path('estudiante/', views.estudiante, name='estudiante'),
    #path('index/', views.index, name='index'),
    path('indexU/', views.indexUsuario, name='indexUsuario'),
    path('estudiante/', views.estudiante,  name='estudiante'),
    path('inscripcion/', views.inscripcion, name='inscripcion'),
    path('inicio/', views.inicio, name='inicio'),
    path('acercade/', views.acercade, name='acercade'),
    path('organizador/', views.organizador, name='organizador'),
    path('perfil/', views.perfil, name='perfil'),
    path('docente/', views.docente, name='docente'),
    path('articuloCientifico/', views.articuloCientifico, name='articuloCientifico'),
    path('registrarDocente/', views.registrarDocente, name='registrarDocente'),
    path('borrarDocente/<str:codigo_docente>/', views.borrarDocente, name='borrarDocente'),
    path('proyectoInnovacion/', views.proyectoInnovacion, name='proyectoInnovacion'),
    path('carrera/', views.carrera, name='carrera'),
    path('salir/', views.salir, name='salir'),
]
