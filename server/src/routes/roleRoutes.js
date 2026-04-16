import { Router } from 'express';
import * as roleController from '../../controllers/roleController.js';

const router = Router();

router.get('/getAll', roleController.getAll);
router.post('/insert-data', roleController.insertData);

export default router;