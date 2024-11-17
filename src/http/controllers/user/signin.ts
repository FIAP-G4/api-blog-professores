import { generateJwt } from '@/http/middlewares/jwt-validate'
import { makeSigninUseCase } from '@/use-cases/factory/user/make-signin-use-case'
import { compare } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    const signinUseCase = makeSigninUseCase()

    const user = await signinUseCase.handler(email)

    const doestPasswordMatch = await compare(password, user.password)

    if (!doestPasswordMatch) {
      throw new Error('Credenciais inválidas')
    }
    const plainUser = {
      id: user.id,
      email: user.email,
    }
    const token = generateJwt(plainUser)
    return res
      .status(200)
      .json({ token, user: { email: user.email, name: user.name } })
  } catch (error) {
    next(error)
  }
}
