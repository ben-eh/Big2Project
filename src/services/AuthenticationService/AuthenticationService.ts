import Database from '../../database/Database'
import { Credentials, AuthDBWithID, Token, AuthDBWithIdWithoutPassword } from '../../types/authentication';
import jwt from 'jsonwebtoken';
import IAuthenticationService from './IAuthenticationServce';

export default class AuthenticationService implements IAuthenticationService {
  private COLLECTION: string = 'users';
  private _database: Database;
	private _jwtSecret = 'jk39fk47a510kv71yfht63lcyqf38f4';

  constructor(database: Database) {
    this._database = database;
  }

  public getToken = async ( credentials : Credentials) => {
    try {
      const matchedUsers = (await this._database.getCollection(this.COLLECTION, credentials)) as AuthDBWithID[];
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
