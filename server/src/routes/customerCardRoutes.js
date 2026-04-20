import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.insertData);
router.get('/:id_card', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.getCustomerById);
router.delete('/:id_card', verifyToken, checkRole(['Менеджер']), customerCardController.deleteCustomerCard);
router.patch('/:id_card', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.updateData);

router.get('/', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.getAllCustomers);

export default router;