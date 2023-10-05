import express, { Request, Response } from "express";
import Database from "../database/Database";
import { UserDB } from "../database/types";

export class UserController {
	private database: Database;
	
	constructor(database: Database) {
		this.database = database;
	}
	
	createUser = async (request: Request, response: Response, next: any) => {
		// get relevant details from Request
		const { username, password } = request.body;
		// any validations
		if (!username || !password) {
			response.json('username or password missing');
			return;
		}
		// use details to create User
		const user: UserDB = {username, password};
		// save to some DB
		const oId = await this.database.createDocument('users', user);
		// send response back to client
		response.json({oId});
	}	
}