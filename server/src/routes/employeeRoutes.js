import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, checkRole(['MANAGER']), employeeController.getAll);
//router.get('/getAll', employeeController.getAll);
router.post('/insert-data', employeeController.insertData);
router.delete('/delete/:id_category', employeeController.deleteEmployee);

export default router;

