import { jsonFileToObject, objectToJsonFile } from "../utils/file-helper"
import { v4 as uuidv4 } from 'uuid';

type File = {
	[id: string]: object;
}

export default class Database {
	private path: string;

	constructor(filepath: string) {
		this.path = filepath;
		console.log(filepath);
	}
	
	public create = async <T>(newEntry: T): Promise<object> => {
		const id = uuidv4();
		const dbObject = await jsonFileToObject<File>(this.path);
		dbObject[id] = {id, ...newEntry};
		await objectToJsonFile(this.path, dbObject);
		return dbObject[id];
	}

	public getAll = async <T>(): Promise<T[]> => {
		const dbObject = await jsonFileToObject<File>(this.path);
		return Object.values(dbObject) as T[];
	}

	public getByField = async <T>(key: string, value: string): Promise<T | undefined> => {
		const dbObject = await jsonFileToObject<File>(this.path);
		const dbArray = Object.values(dbObject) as T[];
		const filteredList = dbArray.filter((item:any) => {
			return item[key] === value;
		})
		return filteredList[0];
	}
}