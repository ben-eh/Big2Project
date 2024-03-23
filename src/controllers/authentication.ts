import { Request, Response } from 'express';
import IAuthenticationService from '../services/AuthenticationService/IAuthenticationServce';
import { matchedData, validationResult } from 'express-validator';
import { Credentials } from '../types/authentication';
import AuthenticationService from '../services/AuthenticationService/AuthenticationService';

class AuthenticationController {
  _authenticationService: IAuthenticationService;

  constructor() {
    this._authenticationService = new AuthenticationService();
  }

  public getToken = async (request: Request, response: Response, next: any) => {
    try {
			const credentials: Credentials = request.body as Credentials;
			console.log(credentials);
			if (!credentials.username || !credentials.password) {
				return response.status(400).json({error: 'invalid credentials'});
			}
      const token: string = await this._authenticationService.getToken(credentials);
      response.json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthenticationController;
