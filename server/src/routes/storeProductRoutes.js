import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';

const router = Router();

router.get('/', storeProductController.getAll);
router.post('/', storeProductController.insertData);
router.delete('/:UPC', storeProductController.deleteStoreProduct);
router.patch('/:UPC', storeProductController.updateData);

export default router;