
// Table in Database
export type GameCollection = GameDB[];

// Table in Database
export type PlayerCollection = PlayerDB[];

// Objects that are in the Game table
export type GameDB = {
    id: string;
    date: Date;
    players: string[];
    winner: string;
    round_scores: RoundScores[];
}

// Objects that are in your Player table
export type PlayerDB = {
    id: string;
    username: string;
    wins: number;
    frieds: number;
    games_played: number;
}

type RoundScores = {
    [id: string]: number;
}

export type PlayerHands = {
	'1': string[];
	'2': string[];
	'3': string[];
	'4': string[];
}

export type UserDBWithID = {
	_id: string;
	username: string;
	password: string;
}

export type UserDB = Omit<UserDBWithID, '_id'>

export type UserDBWithoutPassword = Omit<UserDBWithID, 'password'>