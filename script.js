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
        fetchFeedbacks();
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

        const feedbackList = document.getElementById("feedbacks-list");
        feedbackList.innerHTML = "";
        
        data.feedbacks.forEach(feedback => {
            const card = document.createElement("div");
            card.classList.add("feedback-card");

            const formattedDate = new Date(feedback.data).toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            const stars = "★".repeat(feedback.avaliacao) + "☆".repeat(5 - feedback.avaliacao);

            card.innerHTML = `
                <h3>${feedback.nome}</h3>
                <p>${feedback.comentario}</p>
                <p><strong>Avaliação:</strong> ${stars}</p>
                <small>${formattedDate}</small>
            `;

            feedbackList.appendChild(card);
        });
        
    } catch (error) {
        alert('Erro ao buscar feedbacks, tente novamente.');
        console.error('Erro:', error);
    }
}
