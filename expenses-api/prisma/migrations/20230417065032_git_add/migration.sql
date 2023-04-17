-- CreateTable
CREATE TABLE "trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME
);
