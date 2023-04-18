/*
  Warnings:

  - The primary key for the `trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `trip` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME
);
INSERT INTO "new_trip" ("end_date", "id", "name", "start_date", "user") SELECT "end_date", "id", "name", "start_date", "user" FROM "trip";
DROP TABLE "trip";
ALTER TABLE "new_trip" RENAME TO "trip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
