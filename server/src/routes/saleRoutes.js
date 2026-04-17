import { Router } from 'express';
import * as saleController from '../controllers/saleController.js';

const router = Router();

router.get('/getAll', saleController.getAll);
router.post('/insert-data', saleController.insertData);
router.delete('/delete/:id_category', saleController.deleteSale);

export default router;