import express, { Router } from 'express';
import AuthenticationController from '../controllers/authentication';

export const createAuthenticationRouter = () => {
	const router = express.Router();
	const controller = new AuthenticationController();
	
	// POST /auth/token
	router.post('/token', controller.getToken);

	return router;
}