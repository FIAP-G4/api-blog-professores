import { ITeacher } from '@/entities/models/teacher.interface'

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher | undefined>
  getAllTeachers(page?: number, limit?: number): Promise<ITeacher[]>
  getById(id: number): Promise<ITeacher | null>
  delete(id: number): Promise<void>
}
