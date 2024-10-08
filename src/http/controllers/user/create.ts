import { makeCreateUserUseCase } from '@/use-cases/factory/user/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await hash(password, 8)

    const userWithHashedPassword = { name, email, password: hashedPassword }

    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.handler(userWithHashedPassword)

    return res
      .status(201)
      .json({ id: user?.id, email: user?.email, name: user?.name })
  } catch (error) {
    next(error)
  }
}
