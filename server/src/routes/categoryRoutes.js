import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.get('/getAll', categoryController.getAll);
router.post('/insert-data', categoryController.insertData);
router.delete('/delete/:id_category', categoryController.deleteCategory);

export default router;