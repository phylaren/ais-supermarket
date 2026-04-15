import { Router } from 'express';
import * as saleController from '../../controllers/saleController.js';

const router = Router();

router.get('/getAll', saleController.getAll);
router.post('/insertData', saleController.insertData);

export default router;