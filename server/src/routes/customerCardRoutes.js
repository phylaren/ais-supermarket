import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.insertData);
router.delete('/:id_card', verifyToken, checkRole(['Менеджер']), customerCardController.deleteCustomerCard);
router.patch('/:id_card', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.updateData);

router.get('/', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.getAllCustomers);
router.get('/discount/:percent', verifyToken, checkRole(['Менеджер', 'Касир']), customerCardController.getCustomersByDiscount);
router.get('/surname/:surname', verifyToken, checkRole(['Касир']), customerCardController.getCustomerBySurname);

export default router;