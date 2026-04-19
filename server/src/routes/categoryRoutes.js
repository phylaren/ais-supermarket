import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, checkRole(['Менеджер']), categoryController.insertData);
router.delete('/:id_category', verifyToken, checkRole(['Менеджер']), categoryController.deleteCategory);
router.patch('/:id_category', verifyToken, checkRole(['Менеджер']), categoryController.updateData);

router.get('/', verifyToken, checkRole(['Менеджер', 'Касир']), categoryController.getAllCategories);

export default router;