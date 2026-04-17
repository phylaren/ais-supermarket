import { Router } from 'express';
import * as storeProductController from '../controllers/storeProductController.js';

const router = Router();

router.get('/getAll', storeProductController.getAll);
router.post('/insert-data', storeProductController.insertData);
router.delete('/delete/:id_category', storeProductController.deleteStoreProduct);

export default router;