-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
