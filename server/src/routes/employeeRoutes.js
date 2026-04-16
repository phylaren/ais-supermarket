import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';

const router = Router();

router.get('/getAll', employeeController.getAll);
router.post('/insert-data', employeeController.insertData);
router.delete('/delete/:id_category', employeeController.deleteEmployee);

export default router;