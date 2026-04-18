import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';

const router = Router();

router.get('/', storeProductController.getAll);
router.post('/', storeProductController.insertData);
router.delete('/:id', storeProductController.deleteStoreProduct);

export default router;