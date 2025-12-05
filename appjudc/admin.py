from django.contrib import admin
from .models import estudiante, EvaluacionArticuloCientifico

# Register your models here.

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