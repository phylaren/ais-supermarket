import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';

const router = Router();

router.post('/', customerCardController.insertData);
router.delete('/:id_card', customerCardController.deleteCustomerCard);
router.patch('/:id_card', customerCardController.updateData);

router.get('/', customerCardController.getAllCustomers);
router.get('/:percent', customerCardController.getCustomersByDiscount);
router.get('/:surname', customerCardController.getCustomerBySurname);

export default router;