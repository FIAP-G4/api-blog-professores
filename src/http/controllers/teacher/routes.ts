import { Router } from 'express'
import { getAllTeachers } from '@/http/controllers/teacher/get-all-teachers'
import { create } from '@/http/controllers/teacher/create'
import { deleteTeacher } from './delete'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher'
import { validationFindAllOptional } from '@/http/middlewares/utils/validation-find-all-optional'

const router = Router()

/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Retorna uma lista de todos os professores
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para a paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 */

router.get('/', validationFindAllOptional, getAllTeachers)

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: Cria um novo professor e usuário
 *     tags:
 *       - Teacher
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
 *               - subjects
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do professor
 *                 example: "usuário teste"
 *               email:
 *                 type: string
 *                 description: Email do professor
 *                 example: "user@professor.com"
 *               password:
 *                 type: string
 *                 description: Senha do professor
 *                 example: "123456"
 *               subjects:
 *                 type: array
 *                 description: Lista de matérias que o professor ensina
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome da matéria
 *                       example: "Matemática"
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 */

router.post(
  '/',
  validateCreateUserWithUniqueEmail,
  validateCreateTeacher,
  create,
)

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     summary: Remove um professor pelo ID
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do professor a ser removido
 *     responses:
 *       204:
 *         description: Professor removido com sucesso
 */

router.delete('/:id', deleteTeacher)

export default router
