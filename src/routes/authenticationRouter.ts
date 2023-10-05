import express, { Router } from 'express';
import AuthenticationController from '../controllers/authentication';
import Database from '../database/Database';

export const createAuthenticationRouter = (db: Database) => {
	const router = express.Router();
	const controller = new AuthenticationController(db);
	
	// POST /auth/token
	router.post('/token', controller.getToken);

	return router;
}