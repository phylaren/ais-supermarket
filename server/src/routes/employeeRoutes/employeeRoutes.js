import { Router } from 'express';
import * as employeeController from '../../controllers/employeeController.js';

const router = Router();

router.get('/getAll', employeeController.getAll);
router.post('/insertData', employeeController.insertData);

export default router;