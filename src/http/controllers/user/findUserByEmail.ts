import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { makeFindUserByEmailUseCase } from '@/use-cases/factory/user/make-find-user-by-email-use-case'
import { makeFindWithTeacherUseCase } from '@/use-cases/factory/user/make-find-with-teacher'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/user/make-find-with-student'

export async function findUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      email: z.coerce.string(),
    })

    const { email } = registerBodySchema.parse(req.params)

    const findUserByEmail = makeFindUserByEmailUseCase()
    const foundUser = await findUserByEmail.handler(email)

    const findWithTeacher = makeFindWithTeacherUseCase()
    const teacher = await findWithTeacher.handler(foundUser.id)

    const findWithStudent = makeFindWithStudentUseCase()
    const student = await findWithStudent.handler(foundUser.id)

    const user = student || teacher

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    if (student) {
      user.students = student.students
    }
    if (teacher) {
      user.teachers = teacher.teachers
    }
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
