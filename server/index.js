import express from 'express';
import cors from 'cors';
import { initDatabase, initData } from './src/initDatabase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);
app.post('/api/init-data', initData);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});