// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Procto Gemini API is running');
});

app.post('/chat', (req, res) => {
  const prompt = req.body.prompt;
  res.json({
    response: `🧠 AI Reply: You said, "${prompt}"`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
