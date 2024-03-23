import express, { Request, Response } from "express";
import { UserController } from "../controllers/users";

export const createUsersRouter = () => {
	const router = express.Router();
	const userController = new UserController();
	
	router.post('/', userController.createUser)

	return router;
}