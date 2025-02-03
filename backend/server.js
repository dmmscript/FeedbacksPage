require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const scriptGoogle = process.env.APPS_SCRIPT_URL;

app.post('/send-feedback', async (req, res) => {
    try {
        const response = await fetch(scriptGoogle, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send('Erro ao enviar feedback.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
