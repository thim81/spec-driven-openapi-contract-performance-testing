/*
  Warnings:

  - Made the column `description` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "director" TEXT,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Team" ("description", "id", "name") SELECT "description", "id", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
CREATE INDEX "Team_name_idx" ON "Team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "Movie"("title");

-- CreateIndex
CREATE INDEX "Character_name_idx" ON "Character"("name");
