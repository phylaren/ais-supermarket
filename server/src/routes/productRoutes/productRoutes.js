import { Router } from 'express';
import * as productController from '../../controllers/productController.js';

const router = Router();

router.get('/getAll', productController.getAll);
router.post('/insertData', productController.insertData);

export default router;