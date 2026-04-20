import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/all-by-count/', verifyToken, checkRole(['Менеджер']), storeProductController.insertData);
router.delete('/all-by-count/:UPC', verifyToken, checkRole(['Менеджер']), storeProductController.deleteStoreProduct);
router.patch('/all-by-count/:UPC', verifyToken, checkRole(['Менеджер']), storeProductController.updateData);

router.get('/all-by-count/', verifyToken, checkRole(['Менеджер']), storeProductController.getAllStoreProductsByCount);
router.get('/all-by-name/', verifyToken, checkRole(['Касир']), storeProductController.getAllStoreProductsByName);
router.get('/upc/:upc', verifyToken, checkRole(['Менеджер', 'Касир']), storeProductController.getStoreProductByUPC);
router.get('/all-in-category/:categoryName', verifyToken, checkRole(['Менеджер', 'Касир']), storeProductController.getStoreProductsByCategory);
router.get('/by-name/:productName', verifyToken, checkRole(['Касир']), storeProductController.getStoreProductByName);
//for this 2: if sorting by name /promotional but if sorting by count /promotional?sort=number
router.get('/promotional', verifyToken, checkRole(['Менеджер', 'Касир']), storeProductController.getPromotional);
router.get('/non-promotional', verifyToken, checkRole(['Менеджер', 'Касир']), storeProductController.getNonPromotional);

export default router;