import { Router } from 'express';
import * as individualTasksController from '../controllers/individualTasksController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/category-revenue', verifyToken, checkRole(['Менеджер']), individualTasksController.getCategoryRevenue);
router.get('/full-category-checks', verifyToken, checkRole(['Менеджер']), individualTasksController.getChecksWithAllProducts);

router.get('/universal-cashiers', verifyToken, checkRole(['Менеджер']), individualTasksController.getUniversalCashiers);
router.get('/customer-spendings', verifyToken, checkRole(['Менеджер']), individualTasksController.getCustomerCategorySpendings);

export default router;