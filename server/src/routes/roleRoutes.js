import { Router } from 'express';
import * as roleController from '../controllers/roleController.js';

const router = Router();

router.get('/getAll', roleController.getAll);
router.post('/insert-data', roleController.insertData);
router.delete('/delete/:id_category', roleController.deleteRole);

export default router;