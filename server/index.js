import express from 'express';
import cors from 'cors';
import { initDatabase, initData } from './src/initDatabase.js';

import { getAll } from './src/controllers/customerCardController.js'
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);
app.post('/api/init-data', initData);

app.get('/api/customer-cards', getAll);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});