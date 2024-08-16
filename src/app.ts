import express from 'express';
import indexRouter from './routes/index';
import { config } from "dotenv";

config();
const app = express();

app.use('/', indexRouter);

const PORT = parseInt(process.env.PORT_API || '3000');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
