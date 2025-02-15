import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Student } from '@/entities/student.entity'
import { IStudentRepository } from '@/repositories/student.repository.interface'
import { IStudent } from '@/entities/models/student.interface'

export class StudentRepository implements IStudentRepository {
  private repository: Repository<Student>

  constructor() {
    this.repository = appDataSource.getRepository(Student)
  }

  async create(studentData: IStudent): Promise<IStudent> {
    const student = this.repository.create(studentData)
    return this.repository.save(student)
  }

  async getAllStudents(page: number, limit: number): Promise<IStudent[]> {
    const queryOptions: any = {
      relations: ['user'],
      where: { status: 1 },
    }

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit
      queryOptions.take = limit
    }

    const students = await this.repository.find(queryOptions)

    return students.map((student: Student) => ({
      id: student.id,
      user_id: student.user_id,
      email: student.user?.email || null,
      name: student.user?.name || null,
    }))
  }

  async getById(studentId: number): Promise<IStudent | null> {
    return this.repository.findOne({ where: { id: studentId, status: 1 } })
  }

  async delete(studentId: number): Promise<void> {
    await this.repository.update(studentId, { status: 0 })
  }
}
