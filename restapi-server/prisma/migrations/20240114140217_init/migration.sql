/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "release_date" DATETIME,
    "director" TEXT,
    "description" TEXT
);
INSERT INTO "new_Movie" ("description", "director", "id", "title") SELECT "description", "director", "id", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");
CREATE INDEX "Movie_title_idx" ON "Movie"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
