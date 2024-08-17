import express, { Request, Response, NextFunction } from 'express';
import teacherRouter from './teacherRouter';

const app = express();


app.use('/teachers', teacherRouter);

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!');
});

export default app;