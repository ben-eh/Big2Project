import express, { Request, Response } from "express";
import Database from "../database/Database";
import { UserController } from "../controllers/users";

export const createUsersRouter = (db: Database) => {
	const router = express.Router();
	const userController = new UserController(db);
	
	router.post('/', userController.createUser)

	return router;
}