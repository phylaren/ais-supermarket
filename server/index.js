import express from 'express';
import cors from 'cors';
import { initDatabase } from './src/initDatabase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});