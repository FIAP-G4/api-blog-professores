import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Teacher } from '@/entities/teacher.entity'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'
import { ITeacher } from '@/entities/models/teacher.interface'
import { ISubject } from '@/entities/models/subject.interface'
import { Subject } from '@/entities/subject.entity'

export class TeacherRepository implements ITeacherRepository {
  private repository: Repository<Teacher>
  private subjectRepository: Repository<Subject>

  constructor() {
    this.repository = appDataSource.getRepository(Teacher)
    this.subjectRepository = appDataSource.getRepository(Subject)
  }

  async create(teacherData: ITeacher): Promise<ITeacher> {
    const { subjects, ...rest } = teacherData

    let existingSubjects: ISubject[] = []

    if (subjects && subjects.length > 0) {
      existingSubjects = await Promise.all(
        subjects.map(async (subject) => {
          const existingSubject = await this.subjectRepository.findOne({
            where: { name: subject.name, status: 1 },
          })
          return existingSubject || this.subjectRepository.create(subject)
        }),
      )
    }

    const teacher = this.repository.create({
      ...rest,
      subjects: existingSubjects.length > 0 ? existingSubjects : undefined,
    })

    return this.repository.save(teacher)
  }

  async getAllTeachers(page?: number, limit?: number): Promise<ITeacher[]> {
    const queryOptions: any = {
      relations: ['subjects', 'user'],
      where: { status: 1 },
    }

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit
      queryOptions.take = limit
    }

    const teachers = await this.repository.find(queryOptions)

    return teachers.map((teacher) => ({
      id: teacher.id,
      user_id: teacher.user_id,
      email: teacher.user?.email || null,
      name: teacher.user?.name || null,
      subjects:
        teacher.subjects?.map((subject) => ({
          id: subject.id,
          name: subject.name,
        })) || [],
    }))
  }

  async getById(teacherId: number): Promise<ITeacher | null> {
    return this.repository.findOne({ where: { id: teacherId, status: 1 } })
  }

  async delete(teacherId: number): Promise<void> {
    await this.repository.update(teacherId, { status: 0 })
  }
}
