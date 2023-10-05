import { Db, MongoClient, ObjectId } from 'mongodb';

export default class Database {
  private _client: MongoClient;
  private _database: Db;

  constructor(uri: string) {
    this._client = new MongoClient(uri);
    this._database = this._client.db('Big2');
  }

  public connect = async (): Promise<void> => {
    try {
      await this._client.connect();
      process.on('SIGINT', this.disconnect);
      process.on('SIGTERM', this.disconnect);
    } catch (error) {
      throw new Error('Could not connect to database');
    }
  };

  public getCollection = async (collection: string, filter?: object) => {
    return await this._database
      .collection(collection)
      .find({ ...filter })
      .toArray();
  };

  public getDocumentById = async (collection: string, id: ObjectId) => {
    return await this._database.collection(collection).findOne({ _id: id });
  };

  public createDocument = async (collection: string, data: Object) => {
    return await this._database.collection(collection).insertOne(data);
  };

  public updateDocument = async (collection: string, id: ObjectId, data: Object) => {
    return await this._database.collection(collection).updateOne({ _id: id }, { $set: data });
  };

  public deleteDocument = async (collection: string, id: ObjectId) => {
    return await this._database.collection(collection).deleteOne({ _id: id });
  };

  public disconnect = async (): Promise<void> => {
    try {
      await this._client.close();
    } catch (error) {
      throw new Error('Could not disconnect from database');
    }
  };
}
