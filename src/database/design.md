

games: [
    {
        id: '1111-1111',
        date: 'asdf',
        players: [
            '0000-0000',
            ...
        ],
        winner: '0000-0000',
        round_scores: [
            {
                '0000-0000': 100,
                '1111-1111': 140,
                ...
            },
            ...
        ],
    },
    ...
]
players: [
    {
        id: '0000-0000',
        username: 'asdf',
        wins: 0,
        frieds: 0,
        games_played: 0,
    },
    ...
]





const players = {
    "345k-23kj-lkj4-24jl": {
      id: "345k-23kj-lkj4-24jl",
    name: "Benno",
    wins: 11,
    games_played: 29
  }
}

const games = {
    "34k5-jjk2-23jl-44j3": {
      id: "34k5-jjk2-23jl-44j3",
    date: "29/08/23",
    players: ["345k-23kj-lkj4-24jl", "345k-23kj-lkj4-24jl", "345k-23kj-lkj4-24jl", "345k-23kj-lkj4-24jl"],
    winner: "345k-23kj-lkj4-24jl"
  }
}

const scores = {
    game: "34k5-jjk2-23jl-44j3",
  playerScores: [
    {
      name: "Benno",
      scorePerRound: {
          1: 0,
        2: 3,
        3: 5,
      }
    },
    {
      name: "Brando",
      scorePerRound: {
          1: 9,
        2: 33,
        3: 0,
      }
    },
  ]
}