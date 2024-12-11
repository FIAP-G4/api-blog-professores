import { Router } from 'express'
import { findUser } from './find-user'
import { findUserByEmail } from './findUserByEmail'
import { signin } from './signin'
import { update } from './update'
import { validateLoginUser } from '@/http/middlewares/user/validation-login-user'

const router = Router()

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Recupera um usuário pelo ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do usuário a ser recuperado
 *     responses:
 *       200:
 *         description: Usuário recuperado com sucesso
 */

router.get('/:id', findUser)

/**
 * @swagger
 * /user/email/{email}:
 *   get:
 *     summary: Recupera um usuário pelo email
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "user@professor.com"
 *         description: Email do usuário a ser recuperado
 *     responses:
 *       200:
 *         description: Usuário recuperado com sucesso
 */

router.get('/email/:email', findUserByEmail)

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário pelo ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "Usuário Atualizado"
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "usuario@atualizado.com"
 *               password:
 *                 type: string
 *                 description: Nova senha do usuário (opcional)
 *                 example: "novaSenha123"
 *     responses:
 *       201:
 *         description: Usuário atualizado com sucesso
 */

router.put('/:id', update)

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "user@professor.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

router.post('/signin', validateLoginUser, signin)

export default router
