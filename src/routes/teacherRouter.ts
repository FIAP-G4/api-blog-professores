import { Router } from 'express';
import { getAll,getById  } from '../constrollers/teacherController';


const router = Router();

router.get('/', getAll);
router.get('/:id', getById);

export default router;