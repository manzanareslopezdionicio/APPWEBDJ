/* VALIDACION DEL FORMULARIO DE EVALUACIÓN */
// Variables para almacenar puntuaciones
let scores = {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null
};

// Pesos de cada criterio (en porcentaje)
const weights = {
    1: 8,  // Planteamiento del problema
    2: 7,  // Objetivos de investigación
    3: 10, // Marco teórico y antecedentes
    4: 20, // Calidad metodológica y aportes
    5: 10, // Análisis y discusión
    6: 5,  // Conclusiones y recomendaciones
    7: 30  // Presentación de resultados
};

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    // Establecer fecha actual por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;

    // Añadir eventos a las opciones de puntuación
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function () {
            const criteria = this.getAttribute('data-criteria');
            const value = parseInt(this.getAttribute('data-value'));

            // Actualizar puntuación
            scores[criteria] = value;

            // Actualizar interfaz
            updateRatingSelection(criteria, value);
            updateScoreBadge(criteria, value);
            calculateTotalScore();
        });
    });

    // Botón de envío
    document.getElementById('submitBtn').addEventListener('click', function () {
        if (validateForm()) {
            // Aquí normalmente se enviarían los datos al servidor
            alert('Evaluación enviada exitosamente. La puntuación total es: ' + document.getElementById('totalScore').textContent);
        }
    });

    // Botón de reinicio
    document.getElementById('resetBtn').addEventListener('click', function () {
        if (confirm('¿Está seguro de que desea reiniciar el formulario? Se perderán todos los datos ingresados.')) {
            resetForm();
        }
    });
});

// Actualizar selección visual
function updateRatingSelection(criteria, value) {
    // Remover selección previa para este criterio
    document.querySelectorAll(`.rating-option[data-criteria="${criteria}"]`).forEach(option => {
        option.classList.remove('selected');
    });

    // Añadir selección a la opción actual
    const selectedOption = document.querySelector(`.rating-option[data-criteria="${criteria}"][data-value="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

// Actualizar badge de puntuación
function updateScoreBadge(criteria, value) {
    const badge = document.getElementById(`score${criteria}`);
    if (badge) {
        badge.textContent = value;

        // Cambiar color según puntuación
        badge.className = 'badge';
        if (value === 2) badge.classList.add('bg-danger');
        else if (value === 3) badge.classList.add('bg-warning');
        else if (value === 4) badge.classList.add('bg-info');
        else if (value === 5) badge.classList.add('bg-success');
        else badge.classList.add('bg-secondary');
    }
}

// Calcular puntuación total ponderada
function calculateTotalScore() {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    let allScored = true;

    // Crear resumen de puntuaciones
    let summaryHTML = '';

    for (let criteria = 1; criteria <= 7; criteria++) {
        if (scores[criteria] !== null) {
            totalWeightedScore += scores[criteria] * weights[criteria];
            totalWeight += weights[criteria];

            summaryHTML += `
                        <tr>
                            <td>${criteria}</td>
                            <td>${scores[criteria]}</td>
                            <td>${weights[criteria]}%</td>
                        </tr>
                    `;
        } else {
            allScored = false;
        }
    }

    if (totalWeight > 0) {
        const weightedAverage = totalWeightedScore / totalWeight;
        const percentage = (weightedAverage / 5) * 100;

        // Actualizar totales
        document.getElementById('totalScore').textContent = weightedAverage.toFixed(2);
        document.getElementById('totalPercentage').textContent = percentage.toFixed(1) + '%';

        // Actualizar resumen
        if (summaryHTML) {
            document.getElementById('scoreSummary').innerHTML = summaryHTML;
        }
    } else {
        document.getElementById('totalScore').textContent = '0.0';
        document.getElementById('totalPercentage').textContent = '0%';
        document.getElementById('scoreSummary').innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center">No hay puntuaciones seleccionadas</td>
                    </tr>
                `;
    }
}

// Validar formulario antes de enviar
function validateForm() {
    // Verificar que todos los criterios tengan puntuación
    for (let criteria = 1; criteria <= 7; criteria++) {
        if (scores[criteria] === null) {
            alert(`Por favor, seleccione una puntuación para el criterio ${criteria}`);
            document.querySelector(`.rating-option[data-criteria="${criteria}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
    }

    // Verificar campos obligatorios
    const requiredFields = ['areaConocimiento', 'categoria', 'carrera', 'titulo', 'autores', 'evaluador', 'fecha'];
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert(`Por favor, complete el campo: ${field.previousElementSibling.textContent.replace(' *', '')}`);
            field.focus();
            return false;
        }
    }

    return true;
}

// Reiniciar formulario
function resetForm() {
    // Reiniciar puntuaciones
    scores = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null };

    // Reiniciar selecciones visuales
    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Reiniciar badges
    for (let i = 1; i <= 7; i++) {
        const badge = document.getElementById(`score${i}`);
        if (badge) {
            badge.textContent = 'Pendiente';
            badge.className = 'badge bg-secondary';
        }
    }

    // Reiniciar totales
    document.getElementById('totalScore').textContent = '0.0';
    document.getElementById('totalPercentage').textContent = '0%';
    document.getElementById('scoreSummary').innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">No hay puntuaciones seleccionadas</td>
                </tr>
            `;

    // Reiniciar formulario
    document.querySelector('form').reset();

    // Establecer fecha actual
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;

    alert('Formulario reiniciado correctamente.');
}
