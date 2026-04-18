import { Router } from 'express';
import * as roleController from '../controllers/roleController.js';

const router = Router();

router.get('/', roleController.getAll);
router.post('/', roleController.insertData);
router.delete('/:id_role', roleController.deleteRole);

export default router;