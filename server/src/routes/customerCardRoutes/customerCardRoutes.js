import { Router } from 'express';
import * as customerCardController from '../../controllers/customerCardController.js';

const router = Router();

router.get('/getAll', customerCardController.getAll);
router.post('/insertData', customerCardController.insertData);

export default router;