const form_data = document.forms['feedbacks-page'];
const submitButton = document.getElementById("submit-button");
const loadingSpinner = document.getElementById("loading-spinner");

form_data.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form_data["name"].value.trim();
    const avaliacao = form_data["rating"].value.trim();
    const comentario = form_data["comment"].value.trim();

    if (nome === '' || comentario === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('avaliacao', avaliacao);
    formData.append('comentario', comentario);

    submitButton.disabled = true;
    loadingSpinner.style.display = "inline-block";

    fetch("/api/sendFeedback", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Feedback enviado com sucesso!');
        form_data.reset();
    })
    .catch(error => {
        alert('Erro ao enviar feedback, tente novamente.', error);
        console.error('Erro:', error);
    })
    .finally(() => {
        submitButton.disabled = false;
        loadingSpinner.style.display = "none";
    });
});