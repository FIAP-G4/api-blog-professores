import { makeFindWithTeacherUseCase } from '@/use-cases/factory/teacher/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export async function isNotTeacher(
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
    const findWithTeacherUseCase = makeFindWithTeacherUseCase()
    const user = await findWithTeacherUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.teachers !== undefined && user.teachers.length > 0) {
      return res
        .status(403)
        .json({ message: 'User is already registered as a teacher' })
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
