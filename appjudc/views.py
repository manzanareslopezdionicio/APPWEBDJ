from django.shortcuts import render, redirect 
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

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
    return render(request, 'estudiante.html')