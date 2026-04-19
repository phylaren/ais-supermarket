import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';

const router = Router();

router.post('/', storeProductController.insertData);
router.delete('/:UPC', storeProductController.deleteStoreProduct);
router.patch('/:UPC', storeProductController.updateData);

router.get('/all-by-count/', storeProductController.getAllStoreProductsByCount);


export default router;