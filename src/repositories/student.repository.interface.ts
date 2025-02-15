import { IStudent } from '@/entities/models/student.interface'

export interface IStudentRepository {
  create(student: IStudent): Promise<IStudent | undefined>
  getAllStudents(page?: number, limit?: number): Promise<IStudent[]>
  getById(id: number): Promise<IStudent | null>
  delete(id: number): Promise<void>
}
