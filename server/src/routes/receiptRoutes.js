import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';

const router = Router();

router.get('/', receiptController.getAll);
router.post('/', receiptController.insertData);
router.delete('/:id', receiptController.deleteReceipt);

export default router;