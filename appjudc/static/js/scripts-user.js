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


// MOSTRAR SIMPLE PARA FORMATO 99-99999-9 EN #CARNET (SIN LIBRERÍAS EXTERNAS)
$(document).ready(function () {
    var $c = $('#carnet');
    if ($c.length) {
        // Asegurar atributos HTML básicos
        $c.attr('maxlength', 10)
            .attr('inputmode', 'numeric')
            .attr('placeholder', '12-34567-8');

        $c.on('input', function () {
            var v = $(this).val().replace(/\D/g, '').slice(0, 8); // solo dígitos, máximo 8
            var p1 = v.slice(0, 2);
            var p2 = v.slice(2, 7);
            var p3 = v.slice(7, 8);
            var out = '';
            if (p1) out += p1;
            if (p2) out += '-' + p2;
            if (p3) out += '-' + p3;
            $(this).val(out);
            // quitar estado inválido al corregir
            if (/^\d{2}-\d{5}-\d$/.test(out)) {
                $(this).removeClass('is-invalid');
            }
        });

        // Validación al enviar el formulario: impedir submit si formato inválido
        $c.closest('form').on('submit', function (e) {
            var val = $c.val();
            var re = /^\d{2}-\d{5}-\d$/;
            if (!re.test(val)) {
                e.preventDefault();
                $c.addClass('is-invalid');
                $c.focus();
            } else {
                $c.removeClass('is-invalid');
            }
        });
    }
});
