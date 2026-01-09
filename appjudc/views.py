from django.shortcuts import render, redirect, get_object_or_404 
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import EvaluacionArticuloCientifico, Docente
import json
from datetime import datetime
from django.contrib import messages
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def login(request):
    if request.method == 'POST':
        carnet = request.POST.get('carnet')
        password = request.POST.get('password')
        user = authenticate(request, username=carnet, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('index')
    return render(request, 'registration/login.html')

@login_required
def salir(request):
    auth_logout(request)
    return redirect('login')

def registro(request):
    return render(request, 'registration/registro.html')

@login_required
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

def proyectoInnovacion(request):
    return render(request, 'vistas/ProyectoInnovacion.html') 

def carrera(request):
    return render(request, 'vistas/carrera.html')

def docente(request):
    docentes = Docente.objects.all()
    return render(request, 'vistas/docente.html', {'docentes': docentes})

# VISTA PARA REGISTRAR DOCENTE
def registrarDocente(request):
    codigo_docente = request.POST.get('codigodocente') 
    codigo_inss = request.POST.get('codigoinss')
    nombre = request.POST.get('nombre')
    apellido = request.POST.get('apellido')
    email = request.POST.get('email')
    telefono = request.POST.get('telefono')
    especialidad = request.POST.get('especialidad')
    area_conocimiento = request.POST.get('areaconocimiento')
    tipo_contrato = request.POST.get('tipo_contrato')
    estado = request.POST.get('estado')
    
    docente = Docente.objects.create(
        codigo_docente=codigo_docente,
        codigo_inss=codigo_inss,
        nombre=nombre,
        apellido=apellido,
        email=email,
        telefono=telefono,
        especialidad=especialidad,
        area_conocimiento=area_conocimiento,
        tipo_contrato=tipo_contrato,
        estado=estado
    )
    return redirect('docente')

# VISTA DE BORRAR DOCENTE
def borrarDocente(request, codigo_docente):
    if request.method == 'DELETE' or request.method == 'POST':
        try:
            docente = Docente.objects.get(codigo_docente=codigo_docente)
            nombre = docente.nombre
            docente.delete()
            
            return JsonResponse({
                'success': True,
                'message': f'Docente "{nombre}" eliminado exitosamente'
            })
        except Docente.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Docente no encontrado'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Error al eliminar el docente: {str(e)}'
            }, status=400)
    
    return JsonResponse({
        'success': False,
        'message': 'Método no permitido'
    }, status=405)

# VISTA DE ARTICULO CIENTIFICO
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