import express, { Request, Response } from "express";
import Database from "../database/Database";

const router = express.Router();
const db = new Database('/home/ben/code/personal/javascript/Big2Project/src/mocks/authentication.json');

const createUser = async (request: Request, response: Response, next: any) => {
	// get relevant details from Request
	const username = request.body.username;
	const password = request.body.password;
	// any validations
	if (!username || !password) {
		response.json('username or password missing');
		return;
	}
	// use details to create User
	const user = {username, password};
	// save to some DB
	const createdUser = await db.create(user);
	// send response back to client
	response.json(createdUser);
}

router.post('/', createUser)

export default router;