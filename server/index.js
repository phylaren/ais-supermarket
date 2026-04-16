import express from 'express';
import cors from 'cors';
import { initDatabase, initData } from './src/initDatabase.js';

import categoryRoutes from './src/routes/categoryRoutes/categoryRoutes.js';
import saleRoutes from './src/routes/saleRoutes/saleRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes/employeeRoutes.js';
import customerCardRoutes from './src/routes/customerCardRoutes/customerCardRoutes.js';
import productRoutes from './src/routes/productRoutes/productRoutes.js';
import storeProductRoutes from './src/routes/storeProductRoutes/storeProductRoutes.js';
import roleRoutes from './src/routes/roleRoutes/roleRoutes.js';
import receiptRoutes from './src/routes/receiptRoutes/receiptRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);
app.post('/api/init-data', initData);

app.use('/api/categories', categoryRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/customer-cards', customerCardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/store-products', storeProductRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/receipts', receiptRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});