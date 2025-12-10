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
