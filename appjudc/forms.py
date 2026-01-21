from django import forms
from .models import Carrera, PerfilUsuario

class CarreraForm(forms.ModelForm):
    class Meta:
        model = Carrera
        fields = '__all__'


class PerfilUsuarioForm(forms.ModelForm):
    """Formulario para actualizar el perfil del usuario"""
    first_name = forms.CharField(
        max_length=30, 
        label="Nombre",
        widget=forms.TextInput(attrs={'class': 'form-control mi-input', 'placeholder': 'Nombre'})
    )
    last_name = forms.CharField(
        max_length=30, 
        label="Apellidos",
        widget=forms.TextInput(attrs={'class': 'form-control mi-input', 'placeholder': 'Apellidos'})
    )
    email = forms.EmailField(
        label="Correo Electrónico",
        widget=forms.EmailInput(attrs={'class': 'form-control mi-input', 'placeholder': 'email@dominio.com'})
    )
    
    class Meta:
        model = PerfilUsuario
        fields = ['telefono', 'direccion']
        widgets = {
            'telefono': forms.TextInput(attrs={
                'class': 'form-control mi-input', 
                'placeholder': '9999-9999',
                'pattern': r'^\d{4}-\d{4}$'
            }),
            'direccion': forms.Textarea(attrs={
                'class': 'form-control mi-input', 
                'placeholder': 'Dirección',
                'style': 'height: 70px'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            self.fields['first_name'].initial = user.first_name
            self.fields['last_name'].initial = user.last_name
            self.fields['email'].initial = user.email
