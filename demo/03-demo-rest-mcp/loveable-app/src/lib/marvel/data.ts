// Marvel character & movie types from the OpenAPI spec.
export type Hero = {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  description: string | null;
  powers: string[];
};

export type Movie = {
  id: number;
  title: string;
  release_year: number;
  director: string;
  description: string | null;
};

export type Appearance = {
  id: number;
  hero_id: number;
  movie_id: number;
  role: "lead" | "supporting" | "cameo";
};

export const HEROES: Hero[] = [
  {
    id: 1,
    name: "Iron Man",
    first_name: "Tony",
    last_name: "Stark",
    description:
      "Genius, billionaire, playboy, philanthropist. Tony Stark built his first armored suit in a cave and never stopped iterating — turning his guilt and brilliance into a one-man defense initiative.",
    powers: ["Powered armor suit", "Genius-level intellect", "Repulsor technology", "Flight"],
  },
  {
    id: 2,
    name: "Spider-Man",
    first_name: "Peter",
    last_name: "Parker",
    description:
      "Friendly neighborhood superhero. A high schooler from Queens whose radioactive spider bite gave him reflexes, strength, and a stubborn refusal to let anyone in his block get hurt.",
    powers: ["Wall-crawling", "Spider-sense", "Web-shooters", "Superhuman agility"],
  },
  {
    id: 3,
    name: "Captain America",
    first_name: "Steve",
    last_name: "Rogers",
    description:
      "The first Avenger. A scrawny kid from Brooklyn turned super-soldier whose moral compass points truer than his vibranium shield ever could.",
    powers: ["Peak human strength", "Vibranium shield", "Tactical leadership", "Enhanced endurance"],
  },
  {
    id: 4,
    name: "Thor",
    first_name: "Thor",
    last_name: "Odinson",
    description:
      "God of Thunder, Prince of Asgard. He wields Mjolnir (and later Stormbreaker) to defend the Nine Realms with thunder, lightning, and a surprisingly soft heart.",
    powers: ["Thunder & lightning control", "Mjolnir", "Asgardian physiology", "Flight"],
  },
  {
    id: 5,
    name: "Hulk",
    first_name: "Bruce",
    last_name: "Banner",
    description:
      "A mild-mannered physicist whose anger summons a green giant strong enough to level a city block. Two minds, one body, infinite gamma radiation.",
    powers: ["Limitless strength", "Regenerative healing", "Gamma resistance", "Genius intellect"],
  },
  {
    id: 6,
    name: "Black Widow",
    first_name: "Natasha",
    last_name: "Romanoff",
    description:
      "Former KGB spy turned Avenger. Trained in the Red Room from childhood, she fights to atone for a ledger that runs longer than most people's lives.",
    powers: ["Master spy", "Hand-to-hand combat", "Marksmanship", "Stealth infiltration"],
  },
  {
    id: 7,
    name: "Black Panther",
    first_name: "T'Challa",
    last_name: "Udaku",
    description:
      "King of Wakanda. Protector of the most technologically advanced nation on Earth, granted the strength of the Heart-Shaped Herb and a vibranium suit that turns kinetic energy into a weapon.",
    powers: ["Heart-Shaped Herb enhancement", "Vibranium suit", "Wakandan tech", "Royal martial arts"],
  },
  {
    id: 8,
    name: "Doctor Strange",
    first_name: "Stephen",
    last_name: "Strange",
    description:
      "Sorcerer Supreme. A neurosurgeon whose shattered hands led him to Kamar-Taj, where he learned that reality is more malleable than any scalpel.",
    powers: ["Mystic arts", "Astral projection", "Cloak of Levitation", "Time manipulation"],
  },
  {
    id: 9,
    name: "Scarlet Witch",
    first_name: "Wanda",
    last_name: "Maximoff",
    description:
      "Reality-warper. Born in Sokovia, awakened by an Infinity Stone, and capable of rewriting the rules of existence with a flick of her wrist.",
    powers: ["Chaos magic", "Reality warping", "Telekinesis", "Hex bolts"],
  },
  {
    id: 10,
    name: "Captain Marvel",
    first_name: "Carol",
    last_name: "Danvers",
    description:
      "A test pilot infused with the power of the Tesseract. She flies faster than light and hits harder than most planets can survive.",
    powers: ["Photon blasts", "Cosmic flight", "Superhuman strength", "Energy absorption"],
  },
  {
    id: 11,
    name: "Star-Lord",
    first_name: "Peter",
    last_name: "Quill",
    description:
      "Outlaw, leader of the Guardians of the Galaxy, and the only man in the cosmos who can dance-fight an interdimensional villain to a 70s soundtrack.",
    powers: ["Element guns", "Jet boots", "Half-Celestial heritage", "Galaxy-class charm"],
  },
  {
    id: 12,
    name: "Rocket Raccoon",
    first_name: "Rocket",
    last_name: "Raccoon",
    description:
      "A genetically modified raccoon with a knack for engineering and firearms. A member of the Guardians of the Galaxy — and don't call him 'rodent.'",
    powers: ["Engineering genius", "Expert marksman", "Strategic thinking", "Heavy weaponry"],
  },
];

export const MOVIES: Movie[] = [
  { id: 1, title: "Iron Man", release_year: 2008, director: "Jon Favreau", description: "Tony Stark builds an armored suit and becomes Iron Man." },
  { id: 2, title: "Iron Man 2", release_year: 2010, director: "Jon Favreau", description: "Tony Stark faces pressure to share his armor technology while confronting new enemies." },
  { id: 3, title: "Iron Man 3", release_year: 2013, director: "Shane Black", description: "Tony Stark confronts the Mandarin and rebuilds after a devastating attack." },
  { id: 4, title: "The Avengers", release_year: 2012, director: "Joss Whedon", description: "Earth's mightiest heroes unite to stop Loki and an alien invasion." },
  { id: 5, title: "Captain America: The First Avenger", release_year: 2011, director: "Joe Johnston", description: "Steve Rogers becomes Captain America during World War II." },
  { id: 6, title: "Captain America: The Winter Soldier", release_year: 2014, director: "Anthony & Joe Russo", description: "Steve Rogers uncovers a conspiracy at the heart of S.H.I.E.L.D." },
  { id: 7, title: "Thor", release_year: 2011, director: "Kenneth Branagh", description: "The arrogant prince of Asgard is cast down to Earth to learn humility." },
  { id: 8, title: "Thor: Ragnarok", release_year: 2017, director: "Taika Waititi", description: "Thor must escape Sakaar and stop the destruction of Asgard." },
  { id: 9, title: "Black Panther", release_year: 2018, director: "Ryan Coogler", description: "T'Challa returns to Wakanda to take his place as king and protector." },
  { id: 10, title: "Doctor Strange", release_year: 2016, director: "Scott Derrickson", description: "A brilliant surgeon discovers the hidden world of magic and alternate dimensions." },
  { id: 11, title: "Guardians of the Galaxy", release_year: 2014, director: "James Gunn", description: "A group of intergalactic outlaws joins forces to protect the galaxy." },
  { id: 12, title: "Captain Marvel", release_year: 2019, director: "Anna Boden & Ryan Fleck", description: "Carol Danvers discovers her past as she becomes one of the universe's most powerful heroes." },
  { id: 13, title: "Spider-Man: Homecoming", release_year: 2017, director: "Jon Watts", description: "Peter Parker balances high school life with becoming a neighborhood hero." },
  { id: 14, title: "Spider-Man: No Way Home", release_year: 2021, director: "Jon Watts", description: "A spell exposes Peter Parker to villains and heroes from across the multiverse." },
  { id: 15, title: "Avengers: Infinity War", release_year: 2018, director: "Anthony & Joe Russo", description: "The Avengers and their allies unite to stop Thanos from collecting the Infinity Stones." },
  { id: 16, title: "Avengers: Endgame", release_year: 2019, director: "Anthony & Joe Russo", description: "The surviving Avengers attempt to reverse the devastation caused by Thanos." },
];

// hero_id → movie_ids with roles
const APP_SEED: Array<[number, number, Appearance["role"]]> = [
  // Iron Man
  [1, 1, "lead"], [1, 2, "lead"], [1, 3, "lead"], [1, 4, "lead"], [1, 13, "supporting"],
  [1, 15, "lead"], [1, 16, "lead"],
  // Spider-Man
  [2, 13, "lead"], [2, 14, "lead"], [2, 15, "supporting"], [2, 16, "supporting"],
  // Captain America
  [3, 5, "lead"], [3, 6, "lead"], [3, 4, "lead"], [3, 15, "lead"], [3, 16, "lead"],
  // Thor
  [4, 7, "lead"], [4, 8, "lead"], [4, 4, "lead"], [4, 15, "lead"], [4, 16, "lead"],
  // Hulk
  [5, 4, "lead"], [5, 8, "supporting"], [5, 15, "supporting"], [5, 16, "lead"],
  // Black Widow
  [6, 2, "supporting"], [6, 4, "lead"], [6, 6, "lead"], [6, 15, "supporting"], [6, 16, "lead"],
  // Black Panther
  [7, 9, "lead"], [7, 15, "supporting"], [7, 16, "supporting"],
  // Doctor Strange
  [8, 10, "lead"], [8, 14, "supporting"], [8, 15, "supporting"], [8, 16, "supporting"],
  // Scarlet Witch
  [9, 6, "cameo"], [9, 15, "supporting"], [9, 16, "supporting"],
  // Captain Marvel
  [10, 12, "lead"], [10, 16, "supporting"],
  // Star-Lord
  [11, 11, "lead"], [11, 15, "supporting"], [11, 16, "supporting"],
  // Rocket
  [12, 11, "supporting"], [12, 15, "supporting"], [12, 16, "supporting"],
];

export const APPEARANCES: Appearance[] = APP_SEED.map(([hero_id, movie_id, role], i) => ({
  id: i + 1,
  hero_id,
  movie_id,
  role,
}));

export function getHeroById(id: number): Hero | undefined {
  return HEROES.find((h) => h.id === id);
}
export function getMovieById(id: number): Movie | undefined {
  return MOVIES.find((m) => m.id === id);
}
export function getAppearancesForHero(heroId: number): Appearance[] {
  return APPEARANCES.filter((a) => a.hero_id === heroId);
}
export function getAppearancesForMovie(movieId: number): Appearance[] {
  return APPEARANCES.filter((a) => a.movie_id === movieId);
}
