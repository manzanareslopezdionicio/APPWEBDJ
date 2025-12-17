from django.contrib import admin
from .models import AreaConocimiento, Carrera, Estudiante, EvaluacionArticuloCientifico, Docente

# Register your models here.

@admin.register(AreaConocimiento)
class AreaConocimientoAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'nombre']
    search_fields = ['codigo', 'nombre']

@admin.register(Carrera)
class CarreraAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'nombre', 'area_conocimiento', 'fecha_registro']
    list_filter = ['area_conocimiento', 'fecha_registro']
    search_fields = ['codigo', 'nombre']
    readonly_fields = ['fecha_registro']

@admin.register(Estudiante)
class EstudianteAdmin(admin.ModelAdmin):
    list_display = ['carnet', 'nombre', 'apellido', 'email', 'carrera', 'get_area_conocimiento', 'fecha_registro']
    list_filter = ['carrera', 'fecha_registro']
    search_fields = ['carnet', 'nombre', 'apellido', 'email']
    readonly_fields = ['fecha_registro']
    
    def get_area_conocimiento(self, obj):
        """Muestra el área de conocimiento a través de la carrera"""
        return obj.area_conocimiento if obj.area_conocimiento else '-'
    get_area_conocimiento.short_description = 'Área de Conocimiento'

@admin.register(Docente)
class DocenteAdmin(admin.ModelAdmin):
    list_display = ['codigo_docente', 'nombre', 'email', 'telefono', 'especialidad', 'get_area_display', 'fecha_registro']
    list_filter = ['area_conocimiento', 'fecha_registro']
    search_fields = ['codigo_docente', 'nombre', 'email', 'especialidad']
    readonly_fields = ['fecha_registro']
    
    def get_area_display(self, obj):
        return obj.get_area_conocimiento_display()
    get_area_display.short_description = 'Área de Conocimiento'

@admin.register(EvaluacionArticuloCientifico)
class EvaluacionArticuloCientificoAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo', 'evaluador', 'puntuacion_total', 'porcentaje', 'fecha_evaluacion', 'fecha_creacion']
    list_filter = ['area_conocimiento', 'categoria', 'fecha_evaluacion']
    search_fields = ['titulo', 'autores','autores1','autores2', 'evaluador', 'carrera']
    readonly_fields = ['fecha_creacion']
    
    fieldsets = (
        ('Información General', {
            'fields': ('area_conocimiento', 'categoria', 'carrera', 'titulo', 'autores')
        }),
        ('Puntuaciones de Criterios', {
            'fields': (
                'criterio1_planteamiento',
                'criterio2_objetivos',
                'criterio3_marco_teorico',
                'criterio4_metodologia',
                'criterio5_analisis',
                'criterio6_conclusiones',
                'criterio7_presentacion'
            )
        }),
        ('Resultados', {
            'fields': ('puntuacion_total', 'porcentaje')
        }),
        ('Información del Evaluador', {
            'fields': ('evaluador', 'firma', 'fecha_evaluacion')
        }),
        ('Metadatos', {
            'fields': ('fecha_creacion',),
            'classes': ('collapse',)
        }),
    )
