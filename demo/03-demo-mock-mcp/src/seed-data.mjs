export const heroes = [
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

export const movies = [
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

export const appearances = [
  { id: 1, hero_id: 1, movie_id: 1, role: 'lead' },
  { id: 2, hero_id: 2, movie_id: 2, role: 'lead' },
  { id: 3, hero_id: 1, movie_id: 7, role: 'lead' },
  { id: 4, hero_id: 1, movie_id: 8, role: 'lead' },
  { id: 5, hero_id: 1, movie_id: 14, role: 'lead' },
  { id: 6, hero_id: 2, movie_id: 14, role: 'supporting' },
  { id: 7, hero_id: 1, movie_id: 15, role: 'lead' },
  { id: 8, hero_id: 2, movie_id: 15, role: 'cameo' }
];
