import express, { Request, Response, NextFunction } from 'express';
import teacherRouter from './teacherRouter';

const app = express();

app.use(express.json()); 

app.use('/teachers', teacherRouter);

export default app;