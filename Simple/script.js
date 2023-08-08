window.onload = function() {
    const form = document.querySelector('form');
    const mainContent = document.querySelector('#main-content');
    const btnSubmit = document.querySelector('input[type="submit"]');
    btnSubmit.disabled = true;

    const normalizeId = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').toLowerCase();
    };
    
    form.addEventListener('input', function() {
        let isValid = true;
        for (let input of form.querySelectorAll('input, select')) {
            if (!input.checkValidity()) {
                isValid = false;
                break;
            }
        }
        btnSubmit.disabled = !isValid;
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let result = '';
        for (let input of form.querySelectorAll('input, select')) {
            if (input.type !== 'submit') {
                let value = '';
                if (input.type === 'checkbox') {
                    value = input.checked ? 'verdadero' : 'falso';
                } else if (input.type === 'radio') {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        continue;
                    }
                } else {
                    value = input.value;
                }
                let id = normalizeId(input.name);
                result += `<p><strong>${input.name}:</strong> <span class='result-value' id='${id}'>${value}</span></p>`;
            }
        }

        mainContent.innerHTML = `
            <div class="container">
                <h1>Resultados del Formulario</h1>
                ${result}
                <button id="back-btn">Volver</button>
            </div>
        `;

        document.querySelector('#back-btn').addEventListener('click', function() {
            location.reload();
        });
    });
}
