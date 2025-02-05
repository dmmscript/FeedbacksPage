export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    try {
        const { nome, avaliacao, comentario } = req.body;
        
        const payload = {
            nome,
            avaliacao,
            comentario
        };

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        res.status(response.status).json({ message: data });
        
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar feedback" });
    }
}
