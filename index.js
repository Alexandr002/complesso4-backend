// index.js
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/start', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    res.json({ choices: response.data.choices });
  } catch (error) {
    console.error('Errore nella generazione della storia:', error);
    res.status(500).json({ error: 'Errore nel server' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
