import { makeFindUserByEmailUseCase } from '@/use-cases/factory/user/make-find-user-by-email-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export async function validateCreateUserWithUniqueEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body

    const findUserByEmailUseCase = makeFindUserByEmailUseCase()
    const userByEmail = await findUserByEmailUseCase.handler(email)

    if (userByEmail) {
      return res
        .status(409)
        .json({ message: 'There is already a registration with this e-mail.' })
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