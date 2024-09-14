import { SubjectRepository } from '@/repositories/typeorm/subject.repository'
import { CreateSubjectUseCase } from '../subject/create-subject'

export function makeCreateSubjectUseCase() {
  const subjectRepository = new SubjectRepository()
  const createSubjectUseCase = new CreateSubjectUseCase(subjectRepository)
  return createSubjectUseCase
}
