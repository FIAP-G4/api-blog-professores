import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';
import { Teacher } from '../models/Teacher';

const teacherService = new TeacherService();

export const getTeacher = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const teachers: Teacher[] = await TeacherService.getAllTeachers();
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// export const getTeacherById = async (req: Request, res: Response): Promise<Response> => {
//   const id = parseInt(req.params.id, 10);

//   try {
//     const teacher: Teacher | null = await teacherService.getTeacherById(id);
//     if (teacher) {
//       return res.status(200).json(teacher);
//     } else {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: (error as Error).message });
//   }
// };
