import { Router } from 'express';
import { getTeacher  } from '../constrollers/teacherController';


const router = Router();

router.get('/', getTeacher);

export default router;