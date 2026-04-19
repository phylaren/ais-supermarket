import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';

const router = Router();

router.get('/', receiptController.getAll);
router.post('/', receiptController.insertData);
router.delete('/:id_check', receiptController.deleteReceipt);
router.patch('/:id_check', receiptController.updateData);

router.get('/report-cashier', receiptController.getCashierReport);

export default router;