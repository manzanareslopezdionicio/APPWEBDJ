from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class AreaConocimiento(models.Model):
    codigo=models.CharField(max_length=10, primary_key=True, unique=True, verbose_name="Codigo del Area de Conocimiento")
    nombre=models.CharField(max_length=100, verbose_name="Nombre del Area de Conocimiento")
    
    class Meta:
        verbose_name = "Area de Conocimiento"
        verbose_name_plural = "Areas de Conocimiento"
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre

class Carrera(models.Model):
    codigo=models.CharField(max_length=10, primary_key=True, unique=True, verbose_name="Codigo de la Carrera")
    nombre=models.CharField(max_length=100, verbose_name="Nombre de la Carrera")
    area_conocimiento=models.ForeignKey(
        AreaConocimiento, 
        on_delete=models.CASCADE, 
        related_name="carreras", 
        verbose_name="Área de Conocimiento"
    )
    fecha_registro=models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Fecha de Registro"
    )
    
    class Meta:
        verbose_name = "Carrera"
        verbose_name_plural = "Carreras"
        ordering = ['nombre']
        indexes = [
            models.Index(fields=['nombre']),
        ]
    
    def __str__(self):
        return f"{self.codigo} - {self.nombre}"

class Estudiante(models.Model):
    carnet=models.CharField(max_length=10, primary_key=True, verbose_name="Numero de Carnet")
    nombre=models.CharField(max_length=30, verbose_name="Nombre del Estudiante")
    apellido=models.CharField(max_length=30, verbose_name="Apellido del Estudiante")
    email=models.EmailField(unique=True, blank=False, verbose_name="Correo Electrónico")
    telefono=models.CharField(max_length=9, verbose_name="Teléfono",null=True,blank=True)
    fecha_nacimiento=models.DateField(verbose_name="Fecha de Nacimiento",null=True,blank=True)
    direccion=models.CharField(max_length=100, verbose_name="Dirección",null=True,blank=True)
    fecha_registro=models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")
    carrera=models.ForeignKey(
        Carrera, 
        on_delete=models.CASCADE,
        related_name="estudiantes", 
        verbose_name="Carrera"
    )
    area_conocimiento=models.ForeignKey(
        AreaConocimiento, 
        on_delete=models.CASCADE, 
        related_name="estudiantes", 
        verbose_name="Área de Conocimiento"
    )
    class Meta:
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"
        ordering = ['nombre','apellido']
        indexes = [
            models.Index(fields=['nombre','apellido']),
        ]    
    def __str__(self):
        return f"{self.carnet} - {self.nombre} {self.apellido}"

class Docente(models.Model):
    AREA_CHOICES = [
        ('1', 'Departamento de Ciencias y Tecnología'),
        ('2', 'Departamento de Ciencias Economicas y Administrativas'),
        ('3', 'Departamento de Educación y Humanidades'),
    ]
    codigo_docente = models.CharField(max_length=20, primary_key=True, unique=True, verbose_name="Código del Docente")
    nombre = models.CharField(max_length=200, verbose_name="Nombre del Docente")
    email = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    telefono = models.CharField(max_length=9, verbose_name="Teléfono")
    especialidad = models.CharField(max_length=200, verbose_name="Especialidad")
    area_conocimiento = models.CharField(max_length=1, choices=AREA_CHOICES, verbose_name="Área de Conocimiento")
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")
    
    class Meta:
        verbose_name = "Docente"
        verbose_name_plural = "Docentes"
        ordering = ['nombre']
    
    def __str__(self):
        return f"{self.codigo_docente} - {self.nombre}"

class EvaluacionArticuloCientifico(models.Model):
    # Información general
    area_conocimiento = models.CharField(max_length=100, verbose_name="Área de Conocimiento")
    categoria = models.CharField(max_length=50, verbose_name="Categoría")
    carrera = models.CharField(max_length=200, verbose_name="Carrera")
    titulo = models.CharField(max_length=500, verbose_name="Título de la investigación")
    autores = models.TextField(verbose_name="Autores")
    
    # Puntuaciones de criterios (2-5 puntos cada uno)
    criterio1_planteamiento = models.IntegerField(verbose_name="Planteamiento del problema")
    criterio2_objetivos = models.IntegerField(verbose_name="Objetivos de investigación")
    criterio3_marco_teorico = models.IntegerField(verbose_name="Marco teórico y antecedentes")
    criterio4_metodologia = models.IntegerField(verbose_name="Calidad metodológica")
    criterio5_analisis = models.IntegerField(verbose_name="Análisis y discusión")
    criterio6_conclusiones = models.IntegerField(verbose_name="Conclusiones y recomendaciones")
    criterio7_presentacion = models.IntegerField(verbose_name="Presentación de resultados")
    
    # Puntuación total calculada
    puntuacion_total = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Puntuación Total")
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Porcentaje")
    
    # Información del evaluador
    evaluador = models.CharField(max_length=200, verbose_name="Nombre del evaluador")
    firma = models.CharField(max_length=200, blank=True, null=True, verbose_name="Firma")
    fecha_evaluacion = models.DateField(verbose_name="Fecha de evaluación")
    
    # Metadatos
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    
    class Meta:
        verbose_name = "Evaluación de Artículo Científico"
        verbose_name_plural = "Evaluaciones de Artículos Científicos"
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"{self.titulo} - {self.evaluador} ({self.fecha_evaluacion})"