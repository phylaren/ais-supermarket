import { Router } from 'express';
import * as categoryController from '../../controllers/categoryController.js';

const router = Router();

router.get('/getAll', categoryController.getAll);
router.post('/insertData', categoryController.insertData);

export default router;