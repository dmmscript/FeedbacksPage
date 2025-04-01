const form_data = document.forms['feedbacks-page'];
const submitButton = document.getElementById("submit-button");
const loadingSpinner = document.getElementById("loading-spinner");

form_data.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form_data["nome"].value.trim();
    const avaliacao = form_data["avaliacao"].value.trim();
    const comentario = form_data["comentario"].value.trim();

    if (nome === '' || comentario === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const payload  = { nome, avaliacao, comentario };

    submitButton.disabled = true;
    loadingSpinner.style.display = "inline-block";

    fetch("/api/sendFeedback", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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

async function fetchFeedbacks() {
    try {
        const response = await fetch("/api/sendFeedback");
        const data = await response.json();

        const feedbackList = document.getElementById("feedbackList");
        feedbackList.innerHTML = "";
        
        data.feedbacks.forEach(feedback => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${feedback.nome}:</strong> ${feedback.comentario} <em>(Nota: ${feedback.avaliacao})</em>`;
            feedbackList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Erro ao buscar feedbacks:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchFeedbacks);