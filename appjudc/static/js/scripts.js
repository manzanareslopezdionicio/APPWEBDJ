// Mostrar y ocultar contraseña login
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

// Máscara simple para formato 99-99999-9 en #carnet (sin librerías externas)
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

// Máscara simple para formato ORCID ESTUDIANTE
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

/* $(document).ready(function () {
    var $c = $('#orcid');
    if ($c.length) {
        // Asegurar atributos HTML básicos
        $c.attr('maxlength', 19)
            .attr('inputmode', 'numeric')
            .attr('placeholder', '0000-0000-0000-0000');

        function validateORCID(value) {
            return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value);
        }

        function updateValidationState(value) {
            if (validateORCID(value)) {
                $c.removeClass('is-invalid').addClass('is-valid');
            } else {
                $c.removeClass('is-valid').addClass('is-invalid');
            }
        }

        $c.on('input', function () {
            var v = $(this).val().replace(/\D/g, '').slice(0, 16); // solo dígitos, máximo 16
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

            // Validar en tiempo real
            updateValidationState(out);
        });

        // Validar también cuando el campo pierde el foco
        $c.on('blur', function () {
            updateValidationState($(this).val());
        });

        // Validación inicial si ya tiene valor
        if ($c.val()) {
            updateValidationState($c.val());
        }

        // Validación al enviar el formulario
        $c.closest('form').on('submit', function (e) {
            var val = $c.val();
            if (!validateORCID(val)) {
                e.preventDefault();
                $c.addClass('is-invalid');
                $c.focus();

                // Mostrar mensaje de error si es necesario
                if (!$c.next('.invalid-feedback').length) {
                    // $c.after('<div class="invalid-feedback">Por favor, ingrese un ORCID válido (formato: 0000-0000-0000-0000)</div>');
                }
            } else {
                $c.removeClass('is-invalid');
            }
        });
    }
});
 */
// Máscara simple para formato ORCID TUTOR
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

/* $(document).ready(function () {
    var $c = $('#orcidt');
    if ($c.length) {
        // Asegurar atributos HTML básicos
        $c.attr('maxlength', 19)
            .attr('inputmode', 'numeric')
            .attr('placeholder', '0000-0000-0000-0000');

        function validateORCID(value) {
            return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value);
        }

        function updateValidationState(value) {
            if (validateORCID(value)) {
                $c.removeClass('is-invalid').addClass('is-valid');
            } else {
                $c.removeClass('is-valid').addClass('is-invalid');
            }
        }

        $c.on('input', function () {
            var v = $(this).val().replace(/\D/g, '').slice(0, 16); // solo dígitos, máximo 16
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

            // Validar en tiempo real
            updateValidationState(out);
        });

        // Validar también cuando el campo pierde el foco
        $c.on('blur', function () {
            updateValidationState($(this).val());
        });

        // Validación inicial si ya tiene valor
        if ($c.val()) {
            updateValidationState($c.val());
        }

        // Validación al enviar el formulario
        $c.closest('form').on('submit', function (e) {
            var val = $c.val();
            if (!validateORCID(val)) {
                e.preventDefault();
                $c.addClass('is-invalid');
                $c.focus();

                // Mostrar mensaje de error si es necesario
                if (!$c.next('.invalid-feedback').length) {
                    // $c.after('<div class="invalid-feedback">Por favor, ingrese un ORCID válido (formato: 0000-0000-0000-0000)</div>');
                }
            } else {
                $c.removeClass('is-invalid');
            }
        });
    }
});
 */
/* Mascara del Telefono */
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

/* Validación de formulario */
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
