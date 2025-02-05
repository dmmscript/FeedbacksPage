function sanitizeInput(input) {
    return input.replace(/[' ";]/g, "");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }
    
    try {
        const { nome, avaliacao, comentario } = req.body;
        
        const sanitizedNome = sanitizeInput(nome);
        const sanitizedAvaliacao = sanitizeInput(avaliacao);
        const sanitizedComentario = sanitizeInput(comentario);

        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
        
        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        const payload = {
            nome: sanitizedNome,
            avaliacao: sanitizedAvaliacao,
            comentario: sanitizedComentario,
            ip
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
