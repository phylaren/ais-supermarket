import { Router } from 'express';
import * as saleController from '../controllers/saleController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkRole(['Касир']), saleController.insertData);

router.get('/stats', verifyToken, checkRole(['Менеджер']), saleController.getProductSalesStats);

//delete
router.get('/', saleController.getAll);
router.delete('/:id_sale', saleController.deleteSale);
router.patch('/:id_sale', saleController.updateData);

export default router;