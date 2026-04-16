import express from 'express';
import cors from 'cors';
import { initDatabase, initData } from './src/initDatabase.js';

import { getAllCategories } from './src/controllers/categoryController.js'
import { getAllCustomerCards } from './src/controllers/customerCardController.js'
import { getAllEmployees } from './src/controllers/employeeController.js'
import { getAllProducts } from './src/controllers/productController.js'
import { getAllReceipts } from './src/controllers/receiptController.js'
import { getAllSales } from './src/controllers/saleController.js'
import { getAllStoreProducts } from './src/controllers/storeProductController.js'

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/init-db', initDatabase);
app.post('/api/init-data', initData);

app.get('/api/category', getAllCategories);
app.get('/api/customer-card', getAllCustomerCards);
app.get('/api/employee', getAllEmployees);
app.get('/api/product', getAllProducts);
app.get('/api/receipt', getAllReceipts);
app.get('/api/sale', getAllSales);
app.get('/api/store-product', getAllStoreProducts);

//app.get('/api/employee/me', getAll);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});