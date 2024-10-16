import { makeGetCommentByIdUseCase } from '@/use-cases/factory/comment/get-comment-by-id-use-case'
import { makeFindWithTeacherUseCase } from '@/use-cases/factory/user/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number
    userType: string
  }
}

export async function validateDeleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const commentParamsSchema = z.object({
      id: z.coerce.string(),
    })

    req.params = commentParamsSchema.parse(req.params)

    const { id } = req.params

    const { auth } = req as AuthenticatedRequest

    if (!auth || !auth.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user_id: number = auth.id

    const getCommentUseCase = makeGetCommentByIdUseCase()
    const comment = await getCommentUseCase.handler(id)

    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    const findWithTeacherUseCase = makeFindWithTeacherUseCase()
    const teacher = await findWithTeacherUseCase.handler(comment.user_id)

    if (!teacher || comment.user_id !== user_id) {
      return res.status(403).json({
        message:
          'User is not a teacher or user is not responsible for the comment.',
      })
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
