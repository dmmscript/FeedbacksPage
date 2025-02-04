export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    try {
        const { nome, avaliacao, comentario } = req.body;
        const formData = new URLSearchParams();
        formData.append("nome", nome);
        formData.append("avaliacao", avaliacao);
        formData.append("comentario", comentario);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-ww-form-urlencoded" },
            body: formData.toString()
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar feedback" });
    }
}
