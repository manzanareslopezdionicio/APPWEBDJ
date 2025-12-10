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

// MOSTRAR Y OCULTAR CONTRASEÑA LOGIN
$(document).ready(function () {
    $('#topass').on('mouseenter', function () {
        $(this).css('color', 'blue');
    }).on('mouseleave', function () {
        // Si el campo está en modo texto, mantener rojo; si no, negro
        var passwordField = $('#password');
        if (passwordField.attr('type') === 'text') {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'green');
        }
    });

    $('#topass').click(function () {
        var passwordField = $('#password');
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $(this).removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
            $(this).css('color', 'red');
        } else {
            passwordField.attr('type', 'password');
            $(this).removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
            $(this).css('color', 'green');
        }
    });
});
// Mostrar y ocultar contraseña registro
$(document).ready(function () {
    $('#topass1').on('mouseenter', function () {
        $(this).css('color', 'blue');
    }).on('mouseleave', function () {
        // Si el campo está en modo texto, mantener rojo; si no, negro
        var passwordField = $('#password1');
        if (passwordField.attr('type') === 'text') {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'green');
        }
    });

    $('#topass1').click(function () {
        var passwordField = $('#password1');
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $(this).removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
            $(this).css('color', 'red');
        } else {
            passwordField.attr('type', 'password');
            $(this).removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
            $(this).css('color', 'green');
        }
    });
});
// Mostrar y ocultar contraseña registro
$(document).ready(function () {
    $('#topass2').on('mouseenter', function () {
        $(this).css('color', 'blue');
    }).on('mouseleave', function () {
        // Si el campo está en modo texto, mantener rojo; si no, verde
        var passwordField = $('#passwordf');
        if (passwordField.attr('type') === 'text') {
            $(this).css('color', 'red');
        } else {
            $(this).css('color', 'green');
        }
    });

    $('#topass2').click(function () {
        var passwordField = $('#passwordf');
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $(this).removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
            $(this).css('color', 'red');
        } else {
            passwordField.attr('type', 'password');
            $(this).removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
            $(this).css('color', 'green');
        }
    });
});

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
/* Validación de coincidencia de contraseñas */
function validatePasswordMatch() {
    const p = document.getElementById('password1');
    const pf = document.getElementById('passwordf');
    const feedback = document.getElementById('pw-match-feedback');
    if (!pf) return;
    if (pf.value && pf.value !== p.value) {
        pf.setCustomValidity('Las contraseñas no coinciden');
        if (feedback) feedback.style.display = 'block';
    } else {
        pf.setCustomValidity('');
        if (feedback) feedback.style.display = '';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const p = document.getElementById('password1');
    if (p) p.addEventListener('input', validatePasswordMatch);
});

// MOSTRAR SIMPLE PARA FORMATO ORCID ESTUDIANTE
$(document).ready(function () {
    var $c = $('#orcid');
    if ($c.length) {
        $c.on('input', function () {
            var v = $(this).val().replace(/\D/g, '').slice(0, 19); // solo dígitos, máximo 19
            var p1 = v.slice(0, 4);
            var p2 = v.slice(4, 8);
            var p3 = v.slice(8, 12);
            var p4 = v.slice(12, 16);
            var out = '';
            if (p1) out += p1;
            if (p2) out += '-' + p2;
            if (p3) out += '-' + p3;
            if (p4) out += '-' + p4;
            $(this).val(out);

            // Validación en tiempo real usando el pattern nativo
            var isValid = this.checkValidity();
            if (isValid) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
                // No agregamos 'is-invalid' aquí para no mostrar el error mientras escribe
            }
        });

        // Validar al perder el foco
        $c.on('blur', function () {
            var isValid = this.checkValidity();
            if (!isValid) {
                $(this).addClass('is-invalid');
            }
        });

        // Limpiar validación al enfocar
        $c.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Validación personalizada en submit (como respaldo)
        $c.closest('form').on('submit', function (e) {
            var isValid = $c[0].checkValidity();
            if (!isValid) {
                e.preventDefault();
                $c.addClass('is-invalid');
                $c.focus();
            }
        });
    }
});

// MOSTRAR SIMPLE PARA FORMATO ORCID TUTOR
$(document).ready(function () {
    var $c = $('#orcidt');
    if ($c.length) {
        $c.on('input', function () {
            var v = $(this).val().replace(/\D/g, '').slice(0, 19); // solo dígitos, máximo 19
            var p1 = v.slice(0, 4);
            var p2 = v.slice(4, 8);
            var p3 = v.slice(8, 12);
            var p4 = v.slice(12, 16);
            var out = '';
            if (p1) out += p1;
            if (p2) out += '-' + p2;
            if (p3) out += '-' + p3;
            if (p4) out += '-' + p4;
            $(this).val(out);

            // Validación en tiempo real usando el pattern nativo
            var isValid = this.checkValidity();
            if (isValid) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
                // No agregamos 'is-invalid' aquí para no mostrar el error mientras escribe
            }
        });

        // Validar al perder el foco
        $c.on('blur', function () {
            var isValid = this.checkValidity();
            if (!isValid) {
                $(this).addClass('is-invalid');
            }
        });

        // Limpiar validación al enfocar
        $c.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Validación personalizada en submit (como respaldo)
        $c.closest('form').on('submit', function (e) {
            var isValid = $c[0].checkValidity();
            if (!isValid) {
                e.preventDefault();
                $c.addClass('is-invalid');
                $c.focus();
            }
        });
    }
});

// MOSTRAR SIMPLE PARA FORMATO TELEFONO
$(document).ready(function () {
    var $telefono = $('#telefono');
    if ($telefono.length) {

        // Máscara de formato automático
        $telefono.on('input', function () {
            var valor = $(this).val().replace(/\D/g, '').slice(0, 8); // solo dígitos, máximo 8
            var parte1 = valor.slice(0, 4);
            var parte2 = valor.slice(4, 8);
            var resultado = '';

            if (parte1) resultado += parte1;
            if (parte2) resultado += '-' + parte2;

            $(this).val(resultado);

            // Validación visual en tiempo real
            var esValido = this.checkValidity();
            if (esValido && resultado.length === 9) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
            }
        });

        // Validación al perder el foco
        $telefono.on('blur', function () {
            var esValido = this.checkValidity();
            $(this).toggleClass('is-invalid', !esValido);
            $(this).toggleClass('is-valid', esValido);
        });

        // Limpiar estilos al enfocar
        $telefono.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Validación en el submit del formulario
        $telefono.closest('form').on('submit', function (e) {
            var esValido = $telefono[0].checkValidity();
            if (!esValido) {
                e.preventDefault();
                $telefono.addClass('is-invalid');
                $telefono.focus();
            }
        });
    }
});

// MOSTRAR SIMPLE PARA FORMATO NOMBRE
$(document).ready(function () {
    var $inputLetras = $('#nombre');
    if ($inputLetras.length) {

        // Máscara: solo permitir letras en tiempo real
        $inputLetras.on('input', function () {
            var valor = $(this).val();

            // Remover cualquier carácter que no sea letra, espacio o letra acentuada
            var soloLetras = valor.replace(/[^A-Za-záéíóúñÁÉÍÓÚÑ\s]/g, '');

            $(this).val(soloLetras);

            // Validación visual en tiempo real
            var esValido = this.checkValidity() && soloLetras.length > 0;
            if (esValido) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
            }
        });

        // Validación al perder el foco
        $inputLetras.on('blur', function () {
            var esValido = this.checkValidity() && $(this).val().length > 0;
            $(this).toggleClass('is-invalid', !esValido);
            $(this).toggleClass('is-valid', esValido);
        });

        // Limpiar estilos al enfocar
        $inputLetras.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Prevenir pegado de texto no válido
        $inputLetras.on('paste', function (e) {
            var textoPegado = (e.originalEvent || e).clipboardData.getData('text/plain');
            if (!/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/.test(textoPegado)) {
                e.preventDefault();
            }
        });

        // Validación en el submit
        $inputLetras.closest('form').on('submit', function (e) {
            var esValido = $inputLetras[0].checkValidity() && $inputLetras.val().length > 0;
            if (!esValido) {
                e.preventDefault();
                $inputLetras.addClass('is-invalid');
                $inputLetras.focus();
            }
        });
    }
});

/* MOSTRAR SIMPLE PARA FORMATO APELLIDO */
$(document).ready(function () {
    var $inputLetras = $('#apellido');
    if ($inputLetras.length) {

        // Máscara: solo permitir letras en tiempo real
        $inputLetras.on('input', function () {
            var valor = $(this).val();

            // Remover cualquier carácter que no sea letra, espacio o letra acentuada
            var soloLetras = valor.replace(/[^A-Za-záéíóúñÁÉÍÓÚÑ\s]/g, '');

            $(this).val(soloLetras);

            // Validación visual en tiempo real
            var esValido = this.checkValidity() && soloLetras.length > 0;
            if (esValido) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
            }
        });

        // Validación al perder el foco
        $inputLetras.on('blur', function () {
            var esValido = this.checkValidity() && $(this).val().length > 0;
            $(this).toggleClass('is-invalid', !esValido);
            $(this).toggleClass('is-valid', esValido);
        });

        // Limpiar estilos al enfocar
        $inputLetras.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Prevenir pegado de texto no válido
        $inputLetras.on('paste', function (e) {
            var textoPegado = (e.originalEvent || e).clipboardData.getData('text/plain');
            if (!/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/.test(textoPegado)) {
                e.preventDefault();
            }
        });

        // Validación en el submit
        $inputLetras.closest('form').on('submit', function (e) {
            var esValido = $inputLetras[0].checkValidity() && $inputLetras.val().length > 0;
            if (!esValido) {
                e.preventDefault();
                $inputLetras.addClass('is-invalid');
                $inputLetras.focus();
            }
        });
    }
});

/* MOSTRAR SIMPLE PARA FORMATO ESPECIALIDAD */
$(document).ready(function () {
    var $inputLetras = $('#especialidad');
    if ($inputLetras.length) {

        // Máscara: solo permitir letras en tiempo real
        $inputLetras.on('input', function () {
            var valor = $(this).val();

            // Remover cualquier carácter que no sea letra, espacio o letra acentuada
            var soloLetras = valor.replace(/[^A-Za-záéíóúñÁÉÍÓÚÑ\s]/g, '');

            $(this).val(soloLetras);

            // Validación visual en tiempo real
            var esValido = this.checkValidity() && soloLetras.length > 0;
            if (esValido) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
            }
        });

        // Validación al perder el foco
        $inputLetras.on('blur', function () {
            var esValido = this.checkValidity() && $(this).val().length > 0;
            $(this).toggleClass('is-invalid', !esValido);
            $(this).toggleClass('is-valid', esValido);
        });

        // Limpiar estilos al enfocar
        $inputLetras.on('focus', function () {
            $(this).removeClass('is-invalid is-valid');
        });

        // Prevenir pegado de texto no válido
        $inputLetras.on('paste', function (e) {
            var textoPegado = (e.originalEvent || e).clipboardData.getData('text/plain');
            if (!/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/.test(textoPegado)) {
                e.preventDefault();
            }
        });

        // Validación en el submit
        $inputLetras.closest('form').on('submit', function (e) {
            var esValido = $inputLetras[0].checkValidity() && $inputLetras.val().length > 0;
            if (!esValido) {
                e.preventDefault();
                $inputLetras.addClass('is-invalid');
                $inputLetras.focus();
            }
        });
    }
});


// MOSTRAR SIMPLE PARA FORMATO EMAIL
$(document).ready(function () {
    var $email = $('#email');
    var $feedback = $email.next('.invalid-feedback');

    function validarEmailCompleto(email) {
        if (email === '') {
            return { valido: false, mensaje: 'El email es requerido' };
        }

        // Verificar formato básico
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { valido: false, mensaje: 'Formato de email inválido' };
        }

        // Verificar que no empiece o termine con punto
        if (email.startsWith('.') || email.endsWith('.')) {
            return { valido: false, mensaje: 'El email no puede empezar o terminar con punto' };
        }

        // Verificar que el dominio tenga al menos 2 caracteres
        var dominio = email.split('@')[1];
        if (!dominio || dominio.length < 3) {
            return { valido: false, mensaje: 'El dominio del email es muy corto' };
        }

        return { valido: true, mensaje: '' };
    }

    $email.on('blur', function () {
        var email = $(this).val().trim();
        var validacion = validarEmailCompleto(email);

        if (email === '') {
            $(this).removeClass('is-invalid is-valid');
            $feedback.text('Por favor, ingrese un email válido');
        } else if (validacion.valido) {
            $(this).removeClass('is-invalid').addClass('is-valid');
        } else {
            $(this).removeClass('is-valid').addClass('is-invalid');
            $feedback.text(validacion.mensaje);
        }
    });
});

// MOSTRAR SIMPLE PARA VALIDACIÓN DE FORMULARIO DE BOOTSTRAP
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

/* VALIDACIÓN DE CONTRASEÑA */
/* $(document).ready(function () {
    var $password = $('#password');
    var $confirmPassword = $('#confirm-password');
    var $passwordFeedback = $('#password-feedback');
    var $confirmFeedback = $('#confirm-feedback');

    // Elementos para mostrar requisitos
    var $length = $('#length');
    var $uppercase = $('#uppercase');
    var $lowercase = $('#lowercase');
    var $number = $('#number');
    var $special = $('#special');
 
// Función para validar fortaleza de password
function validarFortalezaPassword(password) {
    var requisitos = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };

    // Actualizar visualización de requisitos
    $length.toggleClass('text-success', requisitos.length).toggleClass('text-danger', !requisitos.length);
    $uppercase.toggleClass('text-success', requisitos.uppercase).toggleClass('text-danger', !requisitos.uppercase);
    $lowercase.toggleClass('text-success', requisitos.lowercase).toggleClass('text-danger', !requisitos.lowercase);
    $number.toggleClass('text-success', requisitos.number).toggleClass('text-danger', !requisitos.number);
    $special.toggleClass('text-success', requisitos.special).toggleClass('text-danger', !requisitos.special);

    return requisitos.length && requisitos.uppercase && requisitos.lowercase &&
        requisitos.number && requisitos.special;
}

// Función para validar coincidencia
function validarCoincidencia() {
    var password = $password.val();
    var confirmacion = $confirmPassword.val();

    if (confirmacion === '') {
        $confirmPassword.removeClass('is-invalid is-valid');
        return false;
    }

    var coinciden = password === confirmacion;

    $confirmPassword.toggleClass('is-valid', coinciden && confirmacion.length > 0);
    $confirmPassword.toggleClass('is-invalid', !coinciden && confirmacion.length > 0);

    return coinciden;
}

// Validación en tiempo real para password
$password.on('input', function () {
    var password = $(this).val();
    var esValido = validarFortalezaPassword(password);

    if (password === '') {
        $(this).removeClass('is-invalid is-valid');
        // Resetear requisitos
        $length.removeClass('text-success').addClass('text-danger');
        $uppercase.removeClass('text-success').addClass('text-danger');
        $lowercase.removeClass('text-success').addClass('text-danger');
        $number.removeClass('text-success').addClass('text-danger');
        $special.removeClass('text-success').addClass('text-danger');
    } else if (esValido) {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $passwordFeedback.text('Contraseña segura');
    } else {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $passwordFeedback.text('La contraseña no cumple con todos los requisitos');
    }

    // Validar confirmación también cuando cambia el password
    if ($confirmPassword.val().length > 0) {
        validarCoincidencia();
    }
});

// Validación en tiempo real para confirmación
$confirmPassword.on('input', function () {
    validarCoincidencia();
});

// Validación al perder el foco
$password.add($confirmPassword).on('blur', function () {
    var esPassword = $(this).attr('id') === 'password';

    if (esPassword) {
        var password = $password.val();
        if (password.length > 0) {
            validarFortalezaPassword(password);
        }
    } else {
        validarCoincidencia();
    }
});

// Limpiar estilos al enfocar
$password.add($confirmPassword).on('focus', function () {
    $(this).removeClass('is-invalid');
});

// Mostrar/ocultar password (opcional)
function togglePasswordVisibility($input, $icon) {
    var type = $input.attr('type') === 'password' ? 'text' : 'password';
    $input.attr('type', type);
    $icon.toggleClass('fa-eye fa-eye-slash');
}

// Agregar botones para mostrar/ocultar (opcional)
$password.after('<span class="password-toggle"><i class="fas fa-eye"></i></span>');
$confirmPassword.after('<span class="password-toggle"><i class="fas fa-eye"></i></span>');

$('.password-toggle').on('click', function () {
    var $input = $(this).prev('input');
    var $icon = $(this).find('i');
    togglePasswordVisibility($input, $icon);
});

// Validación en el submit del formulario
$password.closest('form').on('submit', function (e) {
    var password = $password.val();
    var confirmacion = $confirmPassword.val();

    var passwordValido = validarFortalezaPassword(password);
    var coinciden = password === confirmacion;

    if (!passwordValido || !coinciden) {
        e.preventDefault();

        if (!passwordValido) {
            $password.addClass('is-invalid');
            $password.focus();
        } else if (!coinciden) {
            $confirmPassword.addClass('is-invalid');
            $confirmFeedback.text('Las contraseñas no coinciden');
            $confirmPassword.focus();
        }
    }
});
}); 
 */
/*  $(document).ready(function () {
    // Toggle mostrar/ocultar
    $('.password-toggle').click(function () {
        const $input = $(this).siblings('.password-input');
        const $icon = $(this).find('i');
        const type = $input.attr('type') === 'password' ? 'text' : 'password';
        $input.attr('type', type);
        $icon.toggleClass('bi-eye-slash-fill bi-eye-fill');
    });
    // Validación de fortaleza y coincidencia
    $('.password-input').on('input', function () {
        const password = $(this).val();
        const $feedback = $(this).siblings('.password-strength');

        if ($(this).attr('id') === 'password-confirm') {
            const match = password === $('#password-registro').val();
            $feedback.html(match ? '✓ Coinciden' : '✗ No coinciden').toggleClass('match mismatch', match);
            return;
        }

        if (!password) {
            $feedback.html('').removeClass('weak medium strong');
            return;
        }

        const strength = password.length < 6 ? 'Débil' :
            password.length < 8 ? 'Medio' : 'Fuerte';
        const clase = strength.toLowerCase();
        $feedback.html(`Fortaleza: ${strength}`).removeClass('weak medium strong').addClass(clase);
    });
}); */


// MOSTRAR SIMPLE PARA VALIDACIÓN DE CONTRASEÑA Y COINCIDENCIA DE CONTRASEÑA
$(document).ready(function () {
    // Función para verificar fortaleza
    function checkPasswordStrength(password) {
        let score = 0;

        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { nivel: 'Débil', clase: 'weak' };
        if (score <= 4) return { nivel: 'Medio', clase: 'medium' };
        return { nivel: 'Fuerte', clase: 'strong' };
    }

    // Función para verificar coincidencia
    function checkPasswordMatch() {
        const passRegistro = $('#password-registro').val();
        const passConfirm = $('#password-confirm').val();
        const $strengthDiv = $('#password-confirm').siblings('.password-strength');

        if (!passConfirm) {
            $strengthDiv.html('').removeClass('weak medium strong match mismatch');
            return;
        }

        if (passRegistro === passConfirm) {
            $strengthDiv.html('✓ Las contraseñas coinciden').addClass('match').removeClass('mismatch');
        } else {
            $strengthDiv.html('✗ Las contraseñas no coinciden').addClass('mismatch').removeClass('match');
        }
    }

    // Función para toggle mostrar/ocultar password
    function togglePassword($input, $icon) {
        const isPassword = $input.attr('type') === 'password';
        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.toggleClass('bi-eye-slash-fill bi-eye-fill');
        $icon.css('color', isPassword ? 'green' : 'rgba(0, 57, 201, 1)');
        $font - zize.css()
    }

    // Evento para mostrar/ocultar password
    $('.password-toggle').click(function () {
        const $input = $(this).siblings('.password-input');
        const $icon = $(this).find('i');
        togglePassword($input, $icon);
    });

    // Evento para todos los inputs de password
    $('.password-input').on('input', function () {
        const password = $(this).val();
        const $strengthDiv = $(this).siblings('.password-strength');
        const inputId = $(this).attr('id');

        // Si es confirmación, verificar coincidencia
        if (inputId === 'password-confirm') {
            checkPasswordMatch();
            return;
        }

        if (!password) {
            $strengthDiv.html('').removeClass('weak medium strong');
            return;
        }

        const strength = checkPasswordStrength(password);
        $strengthDiv.html(`Fortaleza: ${strength.nivel}`).removeClass('weak medium strong').addClass(strength.clase);

        // Si cambia el password de registro, verificar confirmación
        if (inputId === 'password-registro') {
            checkPasswordMatch();
        }
    });
});

/* ACTIVAR  Y DESACTIVAR BOTON ACTUALIZAR */
/* $(document).ready(function () {
    const $campos = $('.required-field');
    const $btnEnviar = $('#btnEnviar');

    function validarFormulario() {
        let todosValidos = true;

        // Verificar que todos los campos tengan valor
        $campos.each(function () {
            if (!$(this).val().trim()) {
                todosValidos = false;
                return false; // Salir del each
            }
        });

        // Verificar que las contraseñas coincidan
        const pass1 = $('#password').val();
        const pass2 = $('#confirm-password').val();
        if (pass1 !== pass2 || pass1.length < 6) {
            todosValidos = false;
        }

        // Actualizar botón
        $btnEnviar.prop('disabled', !todosValidos);
    }

    // Validar en cada cambio
    $campos.on('input', validarFormulario);

    // Manejar envío
    $('#formActualizar').on('submit', function (e) {
        if ($btnEnviar.prop('disabled')) {
            e.preventDefault();
            return false;
        }
        $btnEnviar.prop('disabled', true).text('Enviando...');
    });
}); */

// HABILITAR/DESHABILITAR BOTON "ACTUALIZAR" SEGÚN VALIDEZ DEL FORMULARIO

// VALIDAR NOMBRES Y APELLIDOS PARA QUE SOLO CONTENGAN LETRAS Y ESPACIOS

/* VALIDAR FECHA FECHA ACTUAL */
document.addEventListener('DOMContentLoaded', function () {
    // Obtener la fecha actual
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const fechaActual = `${year}-${month}-${day}`;

    // Establecer la fecha en el input
    const fechaInput = document.getElementById('fechaInscripcion');
    if (fechaInput && !fechaInput.value) {
        fechaInput.value = fechaActual;
    }
})();

/* DESACTIVAR EL BOTON "AGREGAR DOCENTE" HASTA QUE EL FORMULARIO SEA VALIDO */
(function () {
    const form = document.querySelector('form.needs-validation');
    if (!form) return;
    const btn = document.getElementById('btnAgregarDocente');
    const inputs = Array.from(form.querySelectorAll('.mi-input, select'));

    const allValid = () => {
        return inputs.every(el => {
            // Para selects: comprobar que tenga valor distinto de vacío
            if (el.tagName === 'SELECT') return el.value && el.value !== '';
            // Para inputs: usar checkValidity (pattern, required, type, etc.)
            return el.value && el.checkValidity();
        });
    };

    const updateButton = () => {
        btn.disabled = !allValid();
    };

    // Escuchar cambios
    inputs.forEach(i => {
        i.addEventListener('input', updateButton);
        i.addEventListener('change', updateButton);
        i.addEventListener('blur', updateButton);
    });

    // Prevención de envío si el formulario no es válido (comportamiento HTML5)
    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');
            updateButton();
        }
    });

    // Comprobación inicial al cargar el DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateButton);
    } else {
        updateButton();
    }
})();
/* ********************************************************************************************************** */
document.addEventListener('DOMContentLoaded', function () {
    const inputInss = document.getElementById('codigoinss');
    if (inputInss) {
        inputInss.addEventListener('input', function (e) {
            // Reemplazar cualquier caracter que no sea número por vacío
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});