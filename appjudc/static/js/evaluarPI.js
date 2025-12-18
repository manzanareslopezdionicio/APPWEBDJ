// PROYECTOS DE INNOVACIÓN
// Variables para almacenar puntuaciones
let scores = {
    1: null, 2: null, 3: null, 4: null, 5: null,
    6: null, 7: null, 8: null, 9: null
};

// Pesos de cada criterio (en porcentaje)
const weights = {
    1: 10, // Contextualización de la problemática
    2: 10, // Metodologías empleadas
    3: 10, // Fundamentación teórica
    4: 5,  // Definición del alcance del proyecto
    5: 10, // Generación de prototipos
    6: 15, // Propuesta de valor
    7: 10, // Resultados del proyecto
    8: 15, // Valores institucionales
    9: 15  // Comunicación y trabajo en equipo
};

// Niveles de desempeño
const nivelesDesempeno = {
    5: { nombre: "Excelente", clase: "bg-success" },
    4: { nombre: "Muy Bueno", clase: "bg-info" },
    3: { nombre: "Bueno", clase: "bg-warning" },
    2: { nombre: "Insuficiente", clase: "bg-danger" }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    // Establecer fecha actual por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;

    // Añadir eventos a las opciones de puntuación
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function () {
            const criteria = parseInt(this.getAttribute('data-criteria'));
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
            const totalScore = parseFloat(document.getElementById('totalScore').textContent);
            const nivel = getNivelDesempeno(totalScore);

            alert(`Evaluación enviada exitosamente.\n\nPuntuación total: ${totalScore.toFixed(2)}\nNivel de desempeño: ${nivel.nombre}`);
        }
    });

    // Botón de reinicio
    document.getElementById('resetBtn').addEventListener('click', function () {
        if (confirm('¿Está seguro de que desea reiniciar el formulario? Se perderán todos los datos ingresados.?')) {
            resetForm();
        }
    });

    // Botón de impresión
    //document.getElementById('printBtn').addEventListener('click', function () {
    //    window.print();
    //});
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
        badge.className = 'badge score-badge';
        if (value === 2) badge.classList.add('bg-danger');
        else if (value === 3) badge.classList.add('bg-warning');
        else if (value === 4) badge.classList.add('bg-info');
        else if (value === 5) badge.classList.add('bg-success');
        else badge.classList.add('bg-secondary');
    }
}

// Determinar nivel de desempeño basado en puntuación
function getNivelDesempeno(score) {
    if (score >= 4.5) return nivelesDesempeno[5];
    if (score >= 3.5) return nivelesDesempeno[4];
    if (score >= 2.5) return nivelesDesempeno[3];
    return nivelesDesempeno[2];
}

// Calcular puntuación total ponderada
function calculateTotalScore() {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    let allScored = true;

    // Crear resumen de puntuaciones
    let summaryHTML = '';
    //let totalPonderado = 0;

    for (let criteria = 1; criteria <= 9; criteria++) {
        if (scores[criteria] !== null) {
            const puntos = (scores[criteria] * weights[criteria]) / 100;
            totalWeightedScore += scores[criteria] * weights[criteria];
            totalWeight += weights[criteria];
            //totalPonderado += puntos;

            summaryHTML += `
                        <tr>
                            <td>${criteria}</td>
                            <td>${scores[criteria]}</td>
                            <td>${weights[criteria]}%</td>
                            <!-- <td>${puntos.toFixed(2)}</td>  -->
                        </tr>
                    `;
        } else {
            allScored = false;
        }
    }

    if (totalWeight > 0) {
        const weightedAverage = totalWeightedScore / totalWeight;
        const percentage = (weightedAverage / 5) * 100;
        //const nivel = getNivelDesempeno(weightedAverage);

        // Actualizar totales
        document.getElementById('totalScore').textContent = weightedAverage.toFixed(2);
        document.getElementById('totalPercentage').textContent = percentage.toFixed(1) + '%';
        //document.getElementById('totalPonderado').textContent = totalPonderado.toFixed(2);

        // Actualizar nivel de desempeño
        const nivelElement = document.getElementById('nivelDesempeno');
        //nivelElement.innerHTML = `<span class="badge ${nivel.clase}">Nivel: ${nivel.nombre}</span>`;

        // Actualizar resumen
        if (summaryHTML) {
            document.getElementById('scoreSummary').innerHTML = summaryHTML;
            //document.getElementById('scoreFooter').style.display = 'table-row';
        }
    } else {
        document.getElementById('totalScore').textContent = '0.0';
        document.getElementById('totalPercentage').textContent = '0%';
        //document.getElementById('nivelDesempeno').innerHTML = `<span class="badge bg-secondary">Nivel: Pendiente</span>`;
        document.getElementById('scoreSummary').innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center">No hay puntuaciones seleccionadas</td>
                    </tr>
                `;
        document.getElementById('scoreFooter').style.display = 'none';
    }
}

// Validar formulario antes de enviar
function validateForm() {
    // Verificar que todos los criterios tengan puntuación
    for (let criteria = 1; criteria <= 9; criteria++) {
        if (scores[criteria] === null) {
            alert(`Por favor, seleccione una puntuación para el criterio ${criteria}`);
            document.querySelector(`.rating-option[data-criteria="${criteria}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
    }

    // Verificar campos obligatorios
    const requiredFields = ['areaConocimiento', 'categoria', 'carrera', 'titulo', 'autor1', 'evaluador', 'fecha'];
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
    for (let i = 1; i <= 9; i++) {
        scores[i] = null;
    }

    // Reiniciar selecciones visuales
    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Reiniciar badges
    for (let i = 1; i <= 9; i++) {
        const badge = document.getElementById(`score${i}`);
        if (badge) {
            badge.textContent = 'Pendiente';
            badge.className = 'badge bg-secondary score-badge';
        }
    }

    // Reiniciar totales
    document.getElementById('totalScore').textContent = '0.0';
    document.getElementById('totalPercentage').textContent = '0%';
    document.getElementById('nivelDesempeno').innerHTML = `<span class="badge bg-secondary">Nivel: Pendiente</span>`;
    document.getElementById('scoreSummary').innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">No hay puntuaciones seleccionadas</td>
                </tr>
            `;
    document.getElementById('scoreFooter').style.display = 'none';

    // Reiniciar formulario
    document.querySelectorAll('input, select').forEach(element => {
        if (element.type !== 'button' && element.id !== 'printBtn') {
            element.value = '';
        }
    });

    // Establecer fecha actual
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;

    alert('Formulario reiniciado correctamente.');
}
// FIN PROYECTOS DE INNOVACIÓN