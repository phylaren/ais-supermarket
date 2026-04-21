import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/all-by-count/', verifyToken, checkRole(['Менеджер']), storeProductController.insertData);
router.delete('/all-by-count/:UPC', verifyToken, checkRole(['Менеджер']), storeProductController.deleteStoreProduct);
router.patch('/all-by-count/:UPC', verifyToken, checkRole(['Менеджер']), storeProductController.updateData);

router.get('/all-by-count/', verifyToken, checkRole(['Менеджер']), storeProductController.getAllStoreProductsByCount);
router.get('/all-by-name/', verifyToken, checkRole(['Касир']), storeProductController.getAllStoreProductsByName);

export default router;