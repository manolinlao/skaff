import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para leer JSON en POST

app.get('/', (req, res) => {
  res.send('¡Hola desde Skaff API!');
});

app.post('/notes', (req, res) => {
  const note = req.body;
  console.log('Nota recibida:', note);
  res.status(201).json({ message: 'Nota recibida', note });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
