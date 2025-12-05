from django.contrib import admin
from .models import estudiante, EvaluacionArticuloCientifico, Docente

# Register your models here.

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
    search_fields = ['titulo', 'autores', 'evaluador', 'carrera']
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

admin.site.register(estudiante)