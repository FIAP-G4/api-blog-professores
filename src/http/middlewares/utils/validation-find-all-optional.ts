import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationFindAllOptional(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })

  try {
    req.body = registerParamsSchema.parse(req.query)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: error.format(),
      })
    }

    next(error)
  }
}
