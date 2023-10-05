import express, { json } from 'express';
import { createUsersRouter } from './routes/usersRouter';
import cors from 'cors';
import {createAuthenticationRouter} from './routes/authenticationRouter';
import Database from './database/Database';

const app = express();
const db = new Database('mongodb://127.0.0.1:27017');

app.use(cors());
app.use(json());

// Routes
app.use('/auth', createAuthenticationRouter(db));
app.use('/users', createUsersRouter(db));

export default app;