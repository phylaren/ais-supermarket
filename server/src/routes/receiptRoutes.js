import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';

const router = Router();

router.get('/getAll', receiptController.getAll);
router.post('/insert-data', receiptController.insertData);
router.delete('/delete/:id_category', receiptController.deleteReceipt);

export default router;