import { makeFindWithTeacherUseCase } from '@/use-cases/factory/teacher/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/student/make-find-with-student'

export async function findUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = registerBodySchema.parse(req.params)
    const findWithTeacherUseCase = makeFindWithTeacherUseCase()
    const teacher = await findWithTeacherUseCase.handler(id)

    const findWithStudent = makeFindWithStudentUseCase()
    const student = await findWithStudent.handler(id)

    const user = student || teacher

    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
