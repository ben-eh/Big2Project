import { ObjectId } from 'mongodb';

export type Credentials = {
  username: string;
  password: string;
};

export type PartialCredentials = Partial<Credentials>;

export type Token = {
  id: string;
	username: string;
};

export type AuthDBWithID = {
  _id: ObjectId;
  username: string;
  password: string; // This must be hashed
}

export type AuthDB = Omit<AuthDBWithID, '_id'>;
export type AuthDBWithIdWithoutPassword = Omit<AuthDBWithID, 'password'>;
export type PartialAuthDB = Partial<AuthDB>;
