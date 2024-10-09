import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindWithTeacherUseCase } from '@/use-cases/teacher/find-with-teacher'

export function makeFindWithTeacherUseCase() {
  const userRepository = new UserRepository()
  const findWithTeacherUseCase = new FindWithTeacherUseCase(userRepository)
  return findWithTeacherUseCase
}
