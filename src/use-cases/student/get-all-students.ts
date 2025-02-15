import { IStudent } from '@/entities/models/student.interface'
import { IStudentRepository } from '@/repositories/student.repository.interface'

export class GetAllStudentsUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async handler(page?: number, limit?: number): Promise<IStudent[]> {
    const students = await this.studentRepository.getAllStudents(page, limit)

    if (!students) {
      throw new Error('Estudante não encontrado')
    }
    return students
  }
}
