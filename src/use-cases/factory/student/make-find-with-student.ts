import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindWithStudentUseCase } from '@/use-cases/student/find-with-student'

export function makeFindWithStudentUseCase() {
  const userRepository = new UserRepository()
  const findWithStudentUseCase = new FindWithStudentUseCase(userRepository)
  return findWithStudentUseCase
}