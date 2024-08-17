import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';
import { Teacher } from '../models/Teacher';

const teacherService = new TeacherService();

export const getAll = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const teachers: Teacher[] = await teacherService.findAll();
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const teacher: Teacher | null = await teacherService.findById(Number(id));
    if (teacher) {
      return res.status(200).json(teacher);
    } else {
      return res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const teacher: Teacher = req.body;
    await teacherService.create(teacher);
    return res.status(201).json({ message: 'Teacher created successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
  
export const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const teacher: Partial<Teacher> = req.body;
    await teacherService.update(Number(id), teacher);
    return res.status(200).json({ message: 'Teacher updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
  
export const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await teacherService.remove(Number(id));
    return res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
