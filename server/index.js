import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, initData } from './src/initDatabase.js';

import categoryRoutes from './src/routes/categoryRoutes.js';
import saleRoutes from './src/routes/saleRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import customerCardRoutes from './src/routes/customerCardRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import storeProductRoutes from './src/routes/storeProductRoutes.js';
import receiptRoutes from './src/routes/receiptRoutes.js';

import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);
app.post('/api/init-data', initData);

app.use('/api/category', categoryRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/customer-card', customerCardRoutes);
app.use('/api/product', productRoutes);
app.use('/api/store-product', storeProductRoutes);
app.use('/api/receipt', receiptRoutes);

app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});