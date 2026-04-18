import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.post('/', categoryController.insertData);
router.delete('/:id_category', categoryController.deleteCategory);
router.patch('/:id_category', categoryController.updateData);

router.get('/', categoryController.getAllCategories);

export default router;