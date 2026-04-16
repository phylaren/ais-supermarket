import { Router } from 'express';
import * as receiptController from '../../controllers/receiptController.js';

const router = Router();

router.get('/getAll', receiptController.getAll);
router.post('/insertData', receiptController.insertData);

export default router;