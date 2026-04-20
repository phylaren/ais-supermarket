import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', verifyToken, checkRole(['Касир']), employeeController.getMe);

router.post('/', verifyToken, checkRole(['Менеджер']), employeeController.insertData);
router.delete('/:id_employee', verifyToken, checkRole(['Менеджер']), employeeController.deleteEmployee);
router.patch('/:id_employee', verifyToken, checkRole(['Менеджер']), employeeController.updateData);

router.get('/', verifyToken, checkRole(['Менеджер']), employeeController.getAllEmployees);

export default router;