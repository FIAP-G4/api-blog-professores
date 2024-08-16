import express, { Request, Response, NextFunction } from 'express';
import teacherRouter from './teacherRouter';

const app = express();

// Usando o novo router
app.use('/teachers', teacherRouter);

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World 123!');
});

export default app;