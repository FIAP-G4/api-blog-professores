import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationFindAllPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    tag: z.coerce.number().optional(),
  })

  try {
    req.body = registerParamsSchema.parse(req.query)
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