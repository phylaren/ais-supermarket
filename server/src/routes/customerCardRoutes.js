import { Router } from 'express';
import * as customerCardController from '../controllers/customerCardController.js';

const router = Router();

router.get('/getAll', customerCardController.getAll);
router.post('/insert-data', customerCardController.insertData);
router.delete('/delete/:id_category', customerCardController.deleteCustomerCard);

export default router;