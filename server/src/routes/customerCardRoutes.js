import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';

const router = Router();

router.get('/', customerCardController.getAll);
router.post('/', customerCardController.insertData);
router.delete('/:id_card', customerCardController.deleteCustomerCard);
router.patch('/:id_card', customerCardController.updateData);

export default router;