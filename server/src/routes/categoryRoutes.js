import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', categoryController.insertData);
router.delete('/:id', categoryController.deleteCategory);

export default router;