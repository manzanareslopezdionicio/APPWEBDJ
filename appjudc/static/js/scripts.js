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