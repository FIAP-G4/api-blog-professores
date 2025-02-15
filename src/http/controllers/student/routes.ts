import { Router } from 'express'
import { getAllStudents } from '@/http/controllers/student/get-all-students'
import { create } from '@/http/controllers/student/create'
import { deleteStudent } from './delete'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { validateCreateStudent } from '@/http/middlewares/student/validation-create-student'
import { validationFindAllOptional } from '@/http/middlewares/utils/validation-find-all-optional'

const router = Router()

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Cria um novo estudante
 *     tags:
 *       - Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do estudante
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Email do estudante
 *                 example: "joao.silva@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do estudante
 *                 example: "senhaSegura123"
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 */

router.post(
  '/',
  validateCreateUserWithUniqueEmail,
  validateCreateStudent,
  create,
)

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Recupera todos os estudantes
 *     tags:
 *       - Student
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           description: Número da página para paginar os resultados
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           description: Limite de estudantes a serem retornados por página
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de estudantes recuperada com sucesso
 */

router.get('/', validationFindAllOptional, getAllStudents)

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Deleta um estudante pelo ID
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante a ser deletado
 *         example: 1
 *     responses:
 *       204:
 *         description: Estudante deletado com sucesso
 */

router.delete('/:id', deleteStudent)

export default router
