import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from "dotenv";

config();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: process.env.HOST_API,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // Caminho para os arquivos que contém as rotas da sua aplicação
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
