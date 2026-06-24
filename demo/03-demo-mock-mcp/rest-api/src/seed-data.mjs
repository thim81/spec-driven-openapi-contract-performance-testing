const BASE_HEROES = [
  {
    id: 1,
    name: 'Iron Man',
    first_name: 'Tony',
    last_name: 'Stark',
    description: 'Genius, billionaire, playboy, philanthropist.',
    powers: ['Superhuman strength', 'Powered armor suit', 'Genius-level intellect']
  },
  {
    id: 2,
    name: 'Spider-Man',
    first_name: 'Peter',
    last_name: 'Parker',
    description: 'Friendly neighborhood superhero.',
    powers: ['Wall-crawling', 'Spider-sense', 'Web-shooters']
  }
];

const WEBAPP_HEROES = [
  {
    id: 3,
    name: 'Captain America',
    first_name: 'Steve',
    last_name: 'Rogers',
    description: 'The first Avenger. A scrawny kid from Brooklyn turned super-soldier whose moral compass points truer than his vibranium shield ever could.',
    powers: ['Peak human strength', 'Vibranium shield', 'Tactical leadership', 'Enhanced endurance']
  },
  {
    id: 4,
    name: 'Thor',
    first_name: 'Thor',
    last_name: 'Odinson',
    description: 'God of Thunder, Prince of Asgard. He wields Mjolnir (and later Stormbreaker) to defend the Nine Realms with thunder, lightning, and a surprisingly soft heart.',
    powers: ['Thunder & lightning control', 'Mjolnir', 'Asgardian physiology', 'Flight']
  },
  {
    id: 5,
    name: 'Hulk',
    first_name: 'Bruce',
    last_name: 'Banner',
    description: 'A mild-mannered physicist whose anger summons a green giant strong enough to level a city block. Two minds, one body, infinite gamma radiation.',
    powers: ['Limitless strength', 'Regenerative healing', 'Gamma resistance', 'Genius intellect']
  },
  {
    id: 6,
    name: 'Black Widow',
    first_name: 'Natasha',
    last_name: 'Romanoff',
    description: 'Former KGB spy turned Avenger. Trained in the Red Room from childhood, she fights to atone for a ledger that runs longer than most people\'s lives.',
    powers: ['Master spy', 'Hand-to-hand combat', 'Marksmanship', 'Stealth infiltration']
  },
  {
    id: 7,
    name: 'Black Panther',
    first_name: "T'Challa",
    last_name: 'Udaku',
    description: 'King of Wakanda. Protector of the most technologically advanced nation on Earth, granted the strength of the Heart-Shaped Herb and a vibranium suit that turns kinetic energy into a weapon.',
    powers: ['Heart-Shaped Herb enhancement', 'Vibranium suit', 'Wakandan tech', 'Royal martial arts']
  },
  {
    id: 8,
    name: 'Doctor Strange',
    first_name: 'Stephen',
    last_name: 'Strange',
    description: 'Sorcerer Supreme. A neurosurgeon whose shattered hands led him to Kamar-Taj, where he learned that reality is more malleable than any scalpel.',
    powers: ['Mystic arts', 'Astral projection', 'Cloak of Levitation', 'Time manipulation']
  },
  {
    id: 9,
    name: 'Scarlet Witch',
    first_name: 'Wanda',
    last_name: 'Maximoff',
    description: 'Reality-warper. Born in Sokovia, awakened by an Infinity Stone, and capable of rewriting the rules of existence with a flick of her wrist.',
    powers: ['Chaos magic', 'Reality warping', 'Telekinesis', 'Hex bolts']
  },
  {
    id: 10,
    name: 'Captain Marvel',
    first_name: 'Carol',
    last_name: 'Danvers',
    description: 'A test pilot infused with the power of the Tesseract. She flies faster than light and hits harder than most planets can survive.',
    powers: ['Photon blasts', 'Cosmic flight', 'Superhuman strength', 'Energy absorption']
  },
  {
    id: 11,
    name: 'Star-Lord',
    first_name: 'Peter',
    last_name: 'Quill',
    description: 'Outlaw, leader of the Guardians of the Galaxy, and the only man in the cosmos who can dance-fight an interdimensional villain to a 70s soundtrack.',
    powers: ['Element guns', 'Jet boots', 'Half-Celestial heritage', 'Galaxy-class charm']
  },
  {
    id: 12,
    name: 'Rocket Raccoon',
    first_name: 'Rocket',
    last_name: 'Raccoon',
    description: 'A genetically modified raccoon with a knack for engineering and firearms. A member of the Guardians of the Galaxy — and don\'t call him \'rodent.\'',
    powers: ['Engineering genius', 'Expert marksman', 'Strategic thinking', 'Heavy weaponry']
  },
  {
    id: 13,
    name: 'Gamora',
    first_name: 'Gamora',
    last_name: '',
    description: 'The deadliest woman in the galaxy. A former assassin raised by Thanos who fights to outrun the damage he left behind.',
    powers: ['Master assassin', 'Expert combatant', 'Enhanced agility', 'Weapon mastery']
  },
  {
    id: 14,
    name: 'Drax',
    first_name: 'Drax',
    last_name: '',
    description: 'A warrior driven by vengeance, literal-minded to a fault, and devastatingly effective in close combat.',
    powers: ['Superhuman strength', 'Combat expertise', 'Pain resistance', 'Hand-to-hand combat']
  },
  {
    id: 15,
    name: 'Groot',
    first_name: 'Groot',
    last_name: '',
    description: 'A sentient tree with a big heart and a very limited vocabulary, but enormous protective instincts.',
    powers: ['Regeneration', 'Plant manipulation', 'Durability', 'Protective growth']
  },
  {
    id: 16,
    name: 'Mantis',
    first_name: 'Mantis',
    last_name: '',
    description: 'An empathic alien with a gentle demeanor and the ability to sense and influence emotion.',
    powers: ['Empathy', 'Emotion sensing', 'Nerve strike combat', 'Agility']
  },
  {
    id: 17,
    name: 'Nebula',
    first_name: 'Nebula',
    last_name: '',
    description: 'A cybernetically enhanced warrior who turned survival into a hard-earned identity beyond Thanos\'s control.',
    powers: ['Cybernetic augmentation', 'Tactical combat', 'Weapon proficiency', 'Pain tolerance']
  }
];

export const heroes = [...BASE_HEROES, ...WEBAPP_HEROES];

const BASE_MOVIES = [
  [1, 'Iron Man', 2008, 'Jon Favreau', 'Tony Stark builds an armored suit and becomes Iron Man.'],
  [2, 'Spider-Man', 2002, 'Sam Raimi', 'Peter Parker becomes Spider-Man after being bitten by a genetically modified spider.'],
  [3, 'The Avengers', 2012, 'Joss Whedon', "Earth's mightiest heroes unite to stop Loki and an alien invasion."],
  [4, 'Guardians of the Galaxy', 2014, 'James Gunn', 'A group of intergalactic outlaws joins forces to protect the galaxy.'],
  [5, 'Black Panther', 2018, 'Ryan Coogler', "T'Challa returns to Wakanda to take his place as king and protector."],
  [6, 'Captain America - The First Avenger', 2011, 'Joe Johnston', 'Steve Rogers becomes Captain America during World War II.'],
  [7, 'Iron Man 2', 2010, 'Jon Favreau', 'Tony Stark faces pressure to share his armor technology while confronting new enemies.'],
  [8, 'Iron Man 3', 2013, 'Shane Black', 'Tony Stark confronts the Mandarin and rebuilds after a devastating attack.'],
  [9, 'Spider-Man 2', 2004, 'Sam Raimi', 'Peter Parker struggles with his responsibilities while facing Doctor Octopus.'],
  [10, 'Spider-Man 3', 2007, 'Sam Raimi', 'Spider-Man battles Sandman, Venom, and the darker side of his own powers.'],
  [11, 'Spider-Man: Homecoming', 2017, 'Jon Watts', 'Peter Parker balances high school life with becoming a neighborhood hero.'],
  [12, 'Spider-Man: Far From Home', 2019, 'Jon Watts', 'Peter Parker encounters Mysterio during a school trip across Europe.'],
  [13, 'Spider-Man: No Way Home', 2021, 'Jon Watts', 'A spell exposes Peter Parker to villains and heroes from across the multiverse.'],
  [14, 'Avengers: Infinity War', 2018, 'Anthony Russo and Joe Russo', 'The Avengers and their allies unite to stop Thanos from collecting the Infinity Stones.'],
  [15, 'Avengers: Endgame', 2019, 'Anthony Russo and Joe Russo', 'The surviving Avengers attempt to reverse the devastation caused by Thanos.']
].map(([id, title, release_year, director, description]) => ({
  id,
  title,
  release_year,
  director,
  description
}));

const EXTRA_MOVIES = [
  [16, 'Thor', 2011, 'Kenneth Branagh', 'The arrogant prince of Asgard is cast down to Earth to learn humility.'],
  [17, 'Captain America: The Winter Soldier', 2014, 'Anthony & Joe Russo', 'Steve Rogers uncovers a conspiracy at the heart of S.H.I.E.L.D.'],
  [18, 'Thor: Ragnarok', 2017, 'Taika Waititi', 'Thor must escape Sakaar and stop the destruction of Asgard.'],
  [19, 'Doctor Strange', 2016, 'Scott Derrickson', 'A brilliant surgeon discovers the hidden world of magic and alternate dimensions.'],
  [20, 'Captain Marvel', 2019, 'Anna Boden & Ryan Fleck', "Carol Danvers discovers her past as she becomes one of the universe's most powerful heroes."],
  [21, 'Avengers: Doomsday', 2026, 'Joe Russo and Anthony Russo', null],
  [22, 'Spider-Man: Brand New Day', 2026, 'Destin Daniel Cretton', null],
  [23, 'Guardians of the Galaxy Vol. 2', 2017, 'James Gunn', 'The Guardians travel across the cosmos while Peter Quill learns more about his origins.'],
  [24, 'Guardians of the Galaxy Vol. 3', 2023, 'James Gunn', 'The Guardians face a new threat while trying to protect one of their own.']
].map(([id, title, release_year, director, description]) => ({
  id,
  title,
  release_year,
  director,
  description
}));

export const movies = [...BASE_MOVIES, ...EXTRA_MOVIES];

const MOVIE_ID_BY_TITLE = new Map([
  ...movies.map((movie) => [movie.title, movie.id]),
  ['Captain America: The First Avenger', 6],
]);

const WEBAPP_APPEARANCES = [
  [1, 'Iron Man', 'lead'],
  [1, 'Iron Man 2', 'lead'],
  [1, 'Iron Man 3', 'lead'],
  [1, 'The Avengers', 'lead'],
  [1, 'Spider-Man: Homecoming', 'supporting'],
  [1, 'Avengers: Infinity War', 'lead'],
  [1, 'Avengers: Endgame', 'lead'],
  [2, 'Spider-Man: Homecoming', 'lead'],
  [2, 'Spider-Man: No Way Home', 'lead'],
  [2, 'Avengers: Infinity War', 'supporting'],
  [2, 'Avengers: Endgame', 'supporting'],
  [3, 'Captain America: The First Avenger', 'lead'],
  [3, 'Captain America: The Winter Soldier', 'lead'],
  [3, 'The Avengers', 'lead'],
  [3, 'Avengers: Infinity War', 'lead'],
  [3, 'Avengers: Endgame', 'lead'],
  [4, 'Thor', 'lead'],
  [4, 'Thor: Ragnarok', 'lead'],
  [4, 'The Avengers', 'lead'],
  [4, 'Avengers: Infinity War', 'lead'],
  [4, 'Avengers: Endgame', 'lead'],
  [5, 'The Avengers', 'lead'],
  [5, 'Thor: Ragnarok', 'supporting'],
  [5, 'Avengers: Infinity War', 'supporting'],
  [5, 'Avengers: Endgame', 'lead'],
  [6, 'Iron Man 2', 'supporting'],
  [6, 'The Avengers', 'lead'],
  [6, 'Captain America: The Winter Soldier', 'lead'],
  [6, 'Avengers: Infinity War', 'supporting'],
  [6, 'Avengers: Endgame', 'lead'],
  [7, 'Black Panther', 'lead'],
  [7, 'Avengers: Infinity War', 'supporting'],
  [7, 'Avengers: Endgame', 'supporting'],
  [8, 'Doctor Strange', 'lead'],
  [8, 'Spider-Man: No Way Home', 'supporting'],
  [8, 'Avengers: Infinity War', 'supporting'],
  [8, 'Avengers: Endgame', 'supporting'],
  [9, 'Captain America: The Winter Soldier', 'cameo'],
  [9, 'Avengers: Infinity War', 'supporting'],
  [9, 'Avengers: Endgame', 'supporting'],
  [10, 'Captain Marvel', 'lead'],
  [10, 'Avengers: Endgame', 'supporting'],
  [11, 'Guardians of the Galaxy', 'lead'],
  [11, 'Guardians of the Galaxy Vol. 2', 'lead'],
  [11, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [11, 'Avengers: Infinity War', 'supporting'],
  [11, 'Avengers: Endgame', 'supporting'],
  [12, 'Guardians of the Galaxy', 'supporting'],
  [12, 'Guardians of the Galaxy Vol. 2', 'supporting'],
  [12, 'Guardians of the Galaxy Vol. 3', 'supporting'],
  [12, 'Avengers: Infinity War', 'supporting'],
  [12, 'Avengers: Endgame', 'supporting'],
  [13, 'Guardians of the Galaxy', 'supporting'],
  [13, 'Guardians of the Galaxy Vol. 2', 'lead'],
  [13, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [13, 'Avengers: Infinity War', 'supporting'],
  [13, 'Avengers: Endgame', 'supporting'],
  [14, 'Guardians of the Galaxy', 'supporting'],
  [14, 'Guardians of the Galaxy Vol. 2', 'lead'],
  [14, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [14, 'Avengers: Infinity War', 'supporting'],
  [14, 'Avengers: Endgame', 'supporting'],
  [15, 'Guardians of the Galaxy', 'supporting'],
  [15, 'Guardians of the Galaxy Vol. 2', 'lead'],
  [15, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [15, 'Avengers: Infinity War', 'supporting'],
  [15, 'Avengers: Endgame', 'supporting'],
  [16, 'Guardians of the Galaxy Vol. 2', 'supporting'],
  [16, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [16, 'Avengers: Infinity War', 'supporting'],
  [16, 'Avengers: Endgame', 'supporting'],
  [17, 'Guardians of the Galaxy Vol. 2', 'supporting'],
  [17, 'Guardians of the Galaxy Vol. 3', 'lead'],
  [17, 'Avengers: Infinity War', 'supporting'],
  [17, 'Avengers: Endgame', 'supporting']
];

export const appearances = [
  ...WEBAPP_APPEARANCES.map(([hero_id, movieTitle, role], i) => ({
    id: i + 1,
    hero_id,
    movie_id: MOVIE_ID_BY_TITLE.get(movieTitle),
    role
  }))
];
