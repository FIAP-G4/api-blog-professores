import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';
import { Teacher } from '../models/Teacher';

const teacherService = new TeacherService();

/**
 * @swagger
 * /teachers:
 *   get:
 *     tags:
 *       - Professores
 *     summary: Retorna todos os professores
 *     responses:
 *       200:
 *         description: Lista de professores
 */
export const getAll = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const teachers: Teacher[] = await teacherService.findAll();
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

/**
 * @swagger
 * /teachers/{id}:
 *   get:
*     tags:
 *       - Professores
 *     summary: Retorna um professor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do professor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro no servidor
 */
export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const teacher: Teacher | null = await teacherService.findById(Number(id));
    if (teacher) {
      return res.status(200).json(teacher);
    } else {
      return res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

/**
 * @swagger
 * /teachers:
 *   post:
 *     tags:
 *       - Professores
 *     summary: Cria um novo professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do professor
 *               email:
 *                 type: string
 *                 description: Email do professor
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const teacher: Teacher = req.body;
    await teacherService.create(teacher);
    return res.status(201).json({ message: 'Professor criado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
  
/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     tags:
 *       - Professores
 *     summary: Atualiza as informações de um professor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do professor
 *               email:
 *                 type: string
 *                 description: Email do professor
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro no servidor
 */
export const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const teacher: Partial<Teacher> = req.body;
    await teacherService.update(Number(id), teacher);
    return res.status(200).json({ message: 'Professor atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
  
/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     tags:
 *       - Professores
 *     summary: Remove um professor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       500:
 *         description: Erro no servidor
 */
export const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await teacherService.remove(Number(id));
    return res.status(200).json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
