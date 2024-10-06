import { makeFindWithStudentUseCase } from '@/use-cases/factory/student/make-find-with-student'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export async function isNotStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      user_id: z.coerce.number(),
    })
    const { user_id } = registerBodySchema.parse(req.body)
    const findWithStudentUseCase = makeFindWithStudentUseCase()
    const user = await findWithStudentUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.students !== undefined && user.students.length > 0) {
      return res
        .status(403)
        .json({ message: 'User is already registered as a student' })
    }

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }

    next(error)
  }
}