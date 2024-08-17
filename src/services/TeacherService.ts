// src/services/TeacherService.ts
import { ITeacherService } from './ITeacherService';
import { Teacher } from '../models/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';

export class TeacherService implements ITeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  public async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.findAll();
  }

  public async findById(id: number): Promise<Teacher | null> {
    return this.teacherRepository.findById(id);
  }

  public async create(teacher: Teacher): Promise<void> {
    await this.teacherRepository.create(teacher);
  }

  public async update(id: number, teacher: Partial<Teacher>): Promise<void> {
    await this.teacherRepository.update(id, teacher);
  }

  public async delete(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
