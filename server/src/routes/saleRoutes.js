import { Router } from 'express';
import * as saleController from '../controllers/saleController.js';

const router = Router();

router.get('/', saleController.getAll);
router.post('/', saleController.insertData);
router.delete('/:id_sale', saleController.deleteSale);
router.patch('/:id_sale', saleController.updateData);

router.get('/stats', saleController.getProductSalesStats);

export default router;