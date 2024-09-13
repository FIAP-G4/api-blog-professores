import { expressjwt } from 'express-jwt';
import { env } from '@/env';
import { Request, Response, NextFunction } from 'express';

const jwtSecret = env.JWT_SECRET;


// Middleware de validação JWT
export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  // Verificar se a rota está na lista de rotas livres
  const validateRoute = `${req.method}-${req.path}`;

  // Middleware express-jwt para validar o token nas outras rotas
  expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  })(req, res, next); // Passa a requisição para o middleware express-jwt
};

// Função de geração de token JWT
import jwt from 'jsonwebtoken';

export const generateJwt = (payload: object) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};