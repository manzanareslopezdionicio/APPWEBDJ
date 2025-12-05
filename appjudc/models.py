from django.db import models

# Create your models here.

class estudiante(models.Model):
    carnet=models.CharField(primary_key=True,max_length=10)
    nombre=models.CharField(max_length=30)
    apellido=models.CharField(max_length=30)
    email=models.EmailField(unique=True, blank=False)

class usuario(models.Model):
    carnet=models.CharField()  

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