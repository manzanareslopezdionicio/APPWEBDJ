// ==========================================
// MODO OSCURO DE BOOTSTRAP 5
// ==========================================
(function () {
    'use strict';

    // Obtener el tema guardado en localStorage o usar 'light' por defecto
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    // Obtener el tema preferido del sistema
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Aplicar el tema al documento
    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme);

        // Actualizar el icono del botón si existe
        updateThemeIcon(theme);
    };

    // Actualizar el icono del botón de tema
    const updateThemeIcon = theme => {
        const themeIcon = document.querySelector('#theme-icon');
        const themeText = document.querySelector('#theme-text');

        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-moon-stars-fill fs-5';
                if (themeText) themeText.textContent = 'Modo Oscuro';
            } else {
                themeIcon.className = 'bi bi-sun-fill fs-5';
                if (themeText) themeText.textContent = 'Modo Claro';
            }
        }
    };

    // Aplicar el tema al cargar la página
    setTheme(getPreferredTheme());

    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (!storedTheme) {
            setTheme(getPreferredTheme());
        }
    });

    // Función para alternar el tema
    window.toggleTheme = function () {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setStoredTheme(newTheme);
        setTheme(newTheme);
    };

    // Configurar el botón de alternancia cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', window.toggleTheme);
        }
    });
})();

/* 
// Funcionalidad para el modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Cambiar tema
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    // Cambiar icono
    if (newTheme === 'dark') {
        themeIcon.classList.remove('bi-moon');
        themeIcon.classList.add('bi-sun');
    } else {
        themeIcon.classList.remove('bi-sun');
        themeIcon.classList.add('bi-moon');
    }

    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', savedTheme);

if (savedTheme === 'dark') {
    themeIcon.classList.remove('bi-moon');
    themeIcon.classList.add('bi-sun');
}
 */
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