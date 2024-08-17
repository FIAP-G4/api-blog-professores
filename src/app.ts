import express from 'express';
import { config } from "dotenv";
import indexRouter from './routes/index';
import { setupSwagger } from './config/swagger';

config();
const app = express();

app.use('/', indexRouter);

const PORT = parseInt(process.env.PORT_API || '3000');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Configurar o Swagger
setupSwagger(app);