import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = Router();

router.post('/', productController.insertData);
router.delete('/:id_product', productController.deleteProduct);
router.patch('/:id_product', productController.updateData);

router.get('/', productController.getAllProducts);
router.get('/:categoryName', productController.getProductsByCategory);

export default router;