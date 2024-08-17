// src/services/ITeacherService.ts
import { Teacher } from '../models/Teacher';

export interface ITeacherService {
  findAll(): Promise<Teacher[]>;
  findById(id: number): Promise<Teacher | null>;
  create(teacher: Teacher): Promise<void>;
  update(id: number, teacher: Partial<Teacher>): Promise<void>;
  remove(id: number): Promise<void>;
}
