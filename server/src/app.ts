import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
