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
        $c.attr('maxlength', 10).attr('inputmode', 'numeric').attr('placeholder', '12-34567-8');

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
function validatePasswordMatch(){
    const p = document.getElementById('password1');
    const pf = document.getElementById('passwordf');
    const feedback = document.getElementById('pw-match-feedback');
    if(!pf) return;
    if(pf.value && pf.value !== p.value){
        pf.setCustomValidity('Las contraseñas no coinciden');
        if(feedback) feedback.style.display = 'block';
    } else {
        pf.setCustomValidity('');
        if(feedback) feedback.style.display = '';
    }
}
document.addEventListener('DOMContentLoaded', function(){
    const p = document.getElementById('password1');
    if(p) p.addEventListener('input', validatePasswordMatch);
});