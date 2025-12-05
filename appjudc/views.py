from django.shortcuts import render, redirect 
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import EvaluacionArticuloCientifico, Docente
import json
from datetime import datetime

# Create your views here.
def login(request):
    if request.method == 'POST':
        carnet = request.POST.get('carnet')
        password = request.POST.get('password')
        user = authenticate(request, username=carnet, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('estudiante')
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registro.html')

def index(request):
    return render(request, 'index.html')

def estudiante(request):
    return render(request, 'vistas/estudiante.html')

def inscripcion(request):
    return render(request, 'vistas/inscripcion.html')

def indexUsuario(request):
    return render(request, 'indexusuario.html')

def inicio(request):
    return render(request, 'vistas/webapp/inicio.html')

def acercade(request):
    return render(request, 'vistas/webapp/acercade.html')

def organizador(request):
    return render(request, 'vistas/webapp/organizador.html')

def perfil(request):
    return render(request, 'vistas/perfil.html')

def docente(request):
    if request.method == 'POST':
        try:
            # Obtener datos del request
            data = json.loads(request.body)
            
            # Crear nuevo docente
            docente_obj = Docente(
                codigo_docente=data.get('codigodocente'),
                nombre=data.get('nombre'),
                email=data.get('email'),
                telefono=data.get('telefono'),
                especialidad=data.get('especialidad'),
                area_conocimiento=data.get('areaconocimiento')
            )
            
            # Guardar en la base de datos
            docente_obj.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Docente registrado exitosamente',
                'id': docente_obj.id,
                'docente': {
                    'codigo_docente': docente_obj.codigo_docente,
                    'nombre': docente_obj.nombre,
                    'email': docente_obj.email,
                    'telefono': docente_obj.telefono,
                    'especialidad': docente_obj.especialidad,
                    'area_conocimiento': docente_obj.get_area_conocimiento_display()
                }
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Error al registrar el docente: {str(e)}'
            }, status=400)
    
    # GET request - obtener lista de docentes
    docentes = Docente.objects.all()
    return render(request, 'vistas/docente.html', {'docentes': docentes})

def articuloCientifico(request):
    if request.method == 'POST':
        try:
            # Obtener datos del request
            data = json.loads(request.body)
            
            # Crear nueva evaluación
            evaluacion = EvaluacionArticuloCientifico(
                area_conocimiento=data.get('areaConocimiento'),
                categoria=data.get('categoria'),
                carrera=data.get('carrera'),
                titulo=data.get('titulo'),
                autores=data.get('autores'),
                criterio1_planteamiento=data.get('criterio1'),
                criterio2_objetivos=data.get('criterio2'),
                criterio3_marco_teorico=data.get('criterio3'),
                criterio4_metodologia=data.get('criterio4'),
                criterio5_analisis=data.get('criterio5'),
                criterio6_conclusiones=data.get('criterio6'),
                criterio7_presentacion=data.get('criterio7'),
                puntuacion_total=data.get('puntuacionTotal'),
                porcentaje=data.get('porcentaje'),
                evaluador=data.get('evaluador'),
                firma=data.get('firma', ''),
                fecha_evaluacion=datetime.strptime(data.get('fecha'), '%Y-%m-%d').date()
            )
            
            # Guardar en la base de datos
            evaluacion.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Evaluación guardada exitosamente',
                'id': evaluacion.id
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Error al guardar la evaluación: {str(e)}'
            }, status=400)
    
    return render(request, 'vistas/ArticuloCientifico.html')