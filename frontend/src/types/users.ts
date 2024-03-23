export type UserForm = {
	password: string;
	username: string;
}

export type User = {
	_id: string;
	username: string;
	token: string;
}

export type Credentials = {
	username: string;
	password: string;
}

// Types that front end is sending

export type GameWithoutID = Omit<Game, "_id">;

export type RoundWithoutID = Omit<Round, "_id">;

// DB types
export type Game = {
	_id: string;
	players: string[];
	date: Date;
	winner: string;
}

export type Points = {
	playerID: string;
	points: number;
}

export type Round = {
	_id: string;
	gameID: string;
	winner: string;
	fried: string[];
	playerPoints: Points[];
}