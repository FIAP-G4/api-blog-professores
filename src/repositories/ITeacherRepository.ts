import { Teacher } from '../models/Teacher';

export interface ITeacherRepository {
  findAll(): Promise<Teacher[]>;
  findById(id: number): Promise<Teacher | null>;
  create(teacher: Teacher): Promise<void>;
  update(id: number, teacher: Partial<Teacher>): Promise<void>;
  remove(id: number): Promise<void>;
}