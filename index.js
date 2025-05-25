const express = require('express');
const fetch = require('node-fetch');  // Se usi Node 18+, puoi usare fetch nativo
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Manca il prompt" });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Agisci come un narratore horror malato e imprevedibile. Genera una scena inquietante in un complesso di appartamenti. Offri 2-3 scelte spaventose al giocatore. Rispondi in italiano, in modo inquietante e visivo.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 1.1
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Errore nella richiesta a OpenAI:', error);
    res.status(500).json({ error: 'Errore nella richiesta a OpenAI' });
  }
});

module.exports = app;