import { makeFindUserByIdUseCase } from '@/use-cases/factory/user/make-find-user-by-id-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export async function validateCreateComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const commentParamsSchema = z.object({
      post_id: z.coerce.string(),
    })
    const commentBodySchema = z.object({
      content: z.coerce.string().min(1, 'Content cannot be empty'),
      user_id: z.coerce.number(),
    })

    req.params = commentParamsSchema.parse(req.params)
    req.body = commentBodySchema.parse(req.body)

    const { post_id } = req.params
    const { user_id } = req.body

    const findWithUserUseCase = makeFindUserByIdUseCase()
    const user = await findWithUserUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!post_id) {
      return res.status(404).json({ message: 'Post not found' })
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
