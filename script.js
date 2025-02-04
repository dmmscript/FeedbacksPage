const form_data = document.forms['clientleads-page'];
const submitButton = document.getElementById("submit-button");
const loadingSpinner = document.getElementById("loading-spinner");

form_data.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form_data["name"].value.trim();
    const comentario = form_data["comment"].value.trim();

    if (nome === '' || comentario === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    submitButton.disabled = true;
    loadingSpinner.style.display = "inline-block";

    fetch("http://localhost:3000/send-feedback", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nome,
            comment: comentario
        })
    })
    .then(response => {
        alert('Feedback enviado com sucesso!', response);
        form_data.reset();
    })
    .catch(error => {
        alert('Erro ao enviar feedback, tente novamente.', error);
    })
    .finally(() => {
        submitButton.disabled = false;
        loadingSpinner.style.display = "none";
    });
});

