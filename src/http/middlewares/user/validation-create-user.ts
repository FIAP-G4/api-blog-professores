import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
    const registerBodySchema = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required")
    });

    try {
        req.body = registerBodySchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.format()
            });
        }

        next(error);
    }
}