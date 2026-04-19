import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkRole(['Менеджер']), productController.insertData);
router.delete('/:id_product', verifyToken, checkRole(['Менеджер']), productController.deleteProduct);
router.patch('/:id_product', verifyToken, checkRole(['Менеджер']), productController.updateData);

router.get('/', verifyToken, checkRole(['Менеджер', 'Касир']), productController.getAllProducts);
router.get('/:categoryName', verifyToken, checkRole(['Менеджер', 'Касир']), productController.getProductsByCategory);

export default router;