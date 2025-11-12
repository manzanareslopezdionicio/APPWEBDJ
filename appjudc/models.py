from django.db import models

# Create your models here.

class estudiante(models.Model):
    carnet=models.CharField(primary_key=True,max_length=10)
    nombre=models.CharField(max_length=30)
    apellido=models.CharField(max_length=30)
    email=models.EmailField(unique=True, blank=False)
  
    