import { Request, Response } from 'express';

const getTeacher = async (_req: Request, res: Response): Promise<Response> => {
    try {
        // const route = new Route();
        // const routeResult = await route.getRoute();
        const routeResult =  { message: 'Hello World!' };
        return res.status(200).json(routeResult);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export {
    getTeacher
};