const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/start', async (req, res) => {
  try {
    const prompt = `Sei un game master di un gioco horror ambientato in un complesso di appartamenti di 4 unità.
Crea una storia iniziale inquietante e malata, diversa ogni volta.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    res.json({ story: response.choices[0].message.content });
  } catch (error) {
    console.error('Errore nella generazione della storia:', error);
    res.status(500).json({ error: 'Errore nel server' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
