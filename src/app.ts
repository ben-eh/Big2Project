import express, { json } from 'express';
import { createUsersRouter } from './routes/usersRouter';
import cors from 'cors';
import {createAuthenticationRouter} from './routes/authenticationRouter';

const app = express();

app.use(cors());
app.use(json());

// Routes
app.use('/auth', createAuthenticationRouter());
app.use('/users', createUsersRouter());

export default app;