import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = Router();

router.get('/', productController.getAll);
router.post('/', productController.insertData);
router.delete('/:id_product', productController.deleteProduct);

export default router;