const players: any = {
  0: {
    username: "benno",
    id: 1
  },
  1: {
    username: "tenzin",
    id: 2
  },
  2: {
    username: "adam",
    id: 3
  },
  3: {
    username: "nithin",
    id: 4
  }
}

const start2 = (players: any) => {
	for(let [key, value] of Object.entries(players)) {
		console.log(key, value);
	}
}

start2(players);

[
	{
			"id": "S74E9vFOK2qahqNvAAAD",
			"username": "a",
			"playerNumber": 1
	},
	{
			"id": "o2yCQavS-MuVFVnHAAAP",
			"username": "b",
			"playerNumber": 2
	},
	{
			"id": "hH5_86pks-chWKC0AAAH",
			"username": "c",
			"playerNumber": 3
	},
	{
			"id": "amvula9cXFRV6VPdAAAL",
			"username": "d",
			"playerNumber": 4
	}
]