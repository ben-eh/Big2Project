import Database from '../../database/database'
import { Credentials, AuthDBWithID, Token, AuthDBWithIdWithoutPassword } from '../../types/authentication';
import jwt from 'jsonwebtoken';
import IAuthenticationService from './IAuthenticationServce';

export default class AuthenticationService implements IAuthenticationService {
  private COLLECTION: string = 'users';
	private _jwtSecret = 'jk39fk47a510kv71yfht63lcyqf38f4';

  public getToken = async ( credentials : Credentials) => {
    try {
      const matchedUsers = await Database.database().collection('users').find({}).toArray();
			if (matchedUsers.length < 1) {
				throw new Error();
			}
      const { _id, username } = matchedUsers[0];
      const token: Token = { id: _id.toHexString(), username };
      return this.generateToken(token);
    } catch (error) {
      throw new Error('Could not GET token with credentials');
    }
  };

	private generateToken = (data: Token): string => {
    try {
      return jwt.sign(data, this._jwtSecret);
    } catch (error) {
      throw new Error('Could not generate token');
    }
  };
}
