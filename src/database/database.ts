import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config({ path: `.env` });

class DatabaseClass {
  private _client: MongoClient;
  private _database: Db;

  constructor(uri: string, name: string) {
    this._client = new MongoClient(uri);
    this._database = this._client.db(name);
  }

  public connect = async (): Promise<void> => {
    try {
      await this._client.connect();

      // do something when app is closing
      process.on('exit', this.disconnect);

      // catches ctrl+c event
      process.on('SIGINT', this.disconnect);
      process.on('SIGTERM', this.disconnect);

      // catches "kill pid" (for example: nodemon restart)
      process.on('SIGUSR1', this.disconnect);
      process.on('SIGUSR2', this.disconnect);

      // catches uncaught exceptions
      process.on('uncaughtException', this.disconnect);
    } catch (error) {
      throw new Error('Could not connect to database');
    }
  };

  public database = () => {
    return this._database;
  };

  public disconnect = async (): Promise<void> => {
    try {
      await this._client.close();
    } catch (error) {
      throw new Error('Could not disconnect from database');
    }
  };
}

const mongoUri = process.env['MONGO_DB_CONNECTION_STRING'];
if (!mongoUri) throw new Error('No mongo connection string');

const databaseName = process.env['DATABASE'];
if (!databaseName) throw new Error('No mongo database name');

const Database = new DatabaseClass(mongoUri, databaseName);
Database.connect();

export default Database;
