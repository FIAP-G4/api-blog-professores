import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validateCreateStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format. Please try again'),
    password: z.string().min(1, 'Password is required'),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed for create Student',
        errors: error.format(),
      })
    }

    next(error)
  }
}
