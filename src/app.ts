import express, { json } from 'express';
import authenticationRouter from './routes/authenticationRouter';

const app = express();

app.use(json());

app.use('/users', authenticationRouter);

export default app;