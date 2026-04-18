import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';

const router = Router();

router.get('/', customerCardController.getAll);
router.post('/', customerCardController.insertData);
router.delete('/:id_card', customerCardController.deleteCustomerCard);

export default router;