
// Funcionalidad del sidebar para móviles
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('mobile-show');
    overlay.classList.toggle('show');
});

overlay.addEventListener('click', function () {
    sidebar.classList.remove('mobile-show');
    this.classList.remove('show');
});

// Cerrar sidebar al hacer clic en un enlace en dispositivos móviles
const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
            sidebar.classList.remove('mobile-show');
            overlay.classList.remove('show');
        }
    });
});

// Botón para volver al principio
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('d-none');
    } else {
        backToTopButton.classList.add('d-none');
    }
});

backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efecto de suscripción al newsletter
const subscribeButtons = document.querySelectorAll('button[type="button"]');
subscribeButtons.forEach(button => {
    if (button.textContent.includes('Suscribirse')) {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input.value && input.value.includes('@')) {
                const originalText = this.textContent;
                this.innerHTML = '<i class="bi bi-check"></i>';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                    input.value = '';
                }, 2000);
            } else {
                input.classList.add('is-invalid');
                setTimeout(() => {
                    input.classList.remove('is-invalid');
                }, 2000);
            }
        });
    }
});

// Ajustar contenido al cambiar tamaño de ventana
window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
        // En escritorio, asegurar que el sidebar esté visible
        sidebar.classList.remove('mobile-show');
        overlay.classList.remove('show');
    }
});

// Inicializar
console.log("Diseño cargado correctamente. Footer visible dentro del contenido principal.");