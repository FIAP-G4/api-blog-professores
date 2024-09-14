import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import express from 'express'
import teacherRouter from '@/http/controllers/teacher/routes'
import userRouter from '@/http/controllers/user/routes'
import postRouter from '@/http/controllers/post/routes'
import subjectRouter from '@/http/controllers/subject/routes'
import tagRouter from '@/http/controllers/tag/routes'
import { generateJwt, validateJwt } from './http/middlewares/jwt-validate'
// import { globalErrorHandler } from '@/utils/global-error-handler';

const app = express()

app.use(express.json())

app.use('/teacher', validateJwt, teacherRouter)
app.use('/user', userRouter)
app.use('/post', validateJwt, postRouter)
app.use('/subject', validateJwt, subjectRouter)
app.use('/tag', validateJwt, tagRouter)

export default app // Exportação correta
