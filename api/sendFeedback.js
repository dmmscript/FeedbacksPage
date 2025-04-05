export default async function handler(req, res) {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  
    if (req.method === "POST") {
      try {
        const { nome, avaliacao, comentario } = req.body;
  
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  
        const payload = {
          nome,
          avaliacao,
          comentario,
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
  
    } else if (req.method === "GET") {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar feedbacks" });
      }
  
    } else {
      res.status(405).json({ error: "Método não permitido" });
    }
  }
  