const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Configura OpenAI con la tua API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint per caricare la storia iniziale
app.post('/start', async (req, res) => {
  try {
    const prompt = `Sei un game master di un gioco horror ambientato in un complesso di appartamenti di 4 unità.
Crea una storia iniziale inquietante e malata, diversa ogni volta.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    res.json({ story: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Errore nella generazione della storia:', error);
    res.status(500).json({ error: 'Errore nel server' });
  }
});

// Porta da Render (o default 10000)
const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
