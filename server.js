import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  if (!message) return res.status(400).send({ error: 'Message required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const reply = result.response.text();
    res.send({ response: reply });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).send({ error: 'Gemini failed' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Gemini API is running on Render');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Gemini API running at port ${port}`);
});
