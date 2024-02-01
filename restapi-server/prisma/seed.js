// seed.js
import {PrismaClient} from '@prisma/client'
import {serializeFields} from "../src/utils/serializer.js";


const prisma = new PrismaClient()

async function seedCharacters() {
  try {
    // Seed Characters
    const characters = [
      {
        first_name: "Tony",
        last_name: "Stark",
        name: "Iron Man",
        description: "Genius, billionaire, playboy, philanthropist.",
        powers: ["Superhuman strength", "Powered armor suit", "Genius"],
        id: 1,
      },
      {
        first_name: "Peter",
        last_name: "Parker",
        name: "Spider-Man",
        description: "Friendly neighborhood superhero.",
        powers: ["Wall-crawling", "Spider-sense", "Web-shooters"],
        id: 2,
      },
      {
        first_name: "Steve",
        last_name: "Rogers",
        name: "Captain America",
        description: "Super soldier and leader of the Avengers.",
        powers: ["Superhuman strength", "Shield mastery", "Enhanced agility"],
        id: 3,
      },
      {
        first_name: "Groot",
        last_name: "",
        name: "Groot",
        description:
          "Flora Colossus from Planet X. Known for his unique language, 'I am Groot.' A member of the Guardians of the Galaxy.",
        powers: ["Regeneration", "Superhuman strength", "Floral manipulation"],
        id: 4,
      },
    ];

    // Serialize
    // serializeFields(characters, 'powers')

    for (const character of characters) {
      // Serialize
      serializeFields(character, 'powers', 'array')

      await prisma.character.create({
        data: character,
      });
    }

    console.log("Seeding characters completed successfully.");
  } catch (error) {
    console.error("Error seeding characters data:", error);
  } finally {
    // Close Prisma client connection
    await prisma.$disconnect();
  }
}
async function seedTeams() {
  try {
     // Seed Teams
    const teams = [
      {id: 1, name: "The Avengers", description: "Earth's Mightiest Heroes"},
      {id: 2, name: "X-Men", description: "Mutants united for a better future"},
      {id: 3, name: "Guardians of the Galaxy", description: "Interstellar heroes protecting the galaxy"},
      {id: 4, name: "The Avengers Villains", description: "The villains that are here to destroy the Avengers"},
    ];

    for (const team of teams) {
      await prisma.team.create({
        data: team,
      });
    }

    console.log("Seeding teams completed successfully.");
  } catch (error) {
    console.error("Error seeding teams data:", error);
  } finally {
    // Close Prisma client connection
    await prisma.$disconnect();
  }
}
async function seedMovies() {
  try {
    // Seed movies
    const movies = [
      {
        id: 1,
        title: "Iron Man",
        release_date: "2008-05-02",
        director: "Jon Favreau",
        description: "A wealthy industrialist builds a powered exoskeleton and becomes the technologically advanced superhero Iron Man."
      },
      {
        id: 2,
        title: "The Avengers",
        release_date: "2012-05-04",
        director: "Joss Whedon",
        description: "Nick Fury of S.H.I.E.L.D. brings together a team of superheroes to save the world from imminent destruction."
      },
      {
        id: 3,
        title: "Black Panther",
        release_date: "2018-02-16",
        director: "Ryan Coogler",
        description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger from his country's past."
      },
      {
        id: 4,
        title: "Avengers: Endgame",
        release_date: "2019-04-26",
        director: "Anthony and Joe Russo",
        description: "The Avengers must assemble once again to undo the actions of the villain Thanos and restore balance to the universe."
      },
      {
        id: 5,
        title: "Spider-Man: No Way Home",
        release_date: "2021-12-17",
        director: "Jon Watts",
        description: "Peter Parker's identity is revealed, and he seeks the help of Doctor Strange to undo the chaos caused by a spell gone wrong."
      },
      {
        id: 6,
        title: "Guardians of the Galaxy",
        release_date: "2014-08-01",
        director: "James Gunn",
        description: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior with plans to purge the universe."
      },
      {
        id: 7,
        title: "Guardians of the Galaxy Vol. 2",
        release_date: "2017-05-05",
        director: "James Gunn",
        description: "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
      },
    ]

    for (const movie of movies) {
      // Serialize
      serializeFields(movie, 'release_date', 'dateTime')

      await prisma.movie.create({
        data: movie,
      });
    }

    console.log("Seeding movies completed successfully.");
  } catch (error) {
    console.error("Error seeding movies data:", error);
  } finally {
    // Close Prisma client connection
    await prisma.$disconnect();
  }
}

await seedCharacters();
await seedTeams();
await seedMovies();
