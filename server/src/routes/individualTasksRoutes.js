import { Router } from 'express';
import * as individualTasksController from '../controllers/individualTasksController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/category-revenue', individualTasksController.getCategoryRevenue);
router.get('/full-category-checks', individualTasksController.getChecksWithAllProducts);

router.get('/universal-cashiers', individualTasksController.getUniversalCashiers);
router.get('/customer-spendings', individualTasksController.getCustomerCategorySpendings);

export default router;