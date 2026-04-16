import { Router } from 'express';
import * as storeProductController from '../../controllers/storeProductController.js';

const router = Router();

router.get('/getAll', storeProductController.getAll);
router.post('/insert-data', storeProductController.insertData);

export default router;