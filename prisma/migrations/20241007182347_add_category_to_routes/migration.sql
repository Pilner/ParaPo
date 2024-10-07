/*
  Warnings:

  - You are about to drop the column `location_latitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `location_longitude` on the `Locations` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minFare` to the `Routes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locations" (
    "location_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_name" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Locations" ("created_at", "location_id", "location_name", "updated_at") SELECT "created_at", "location_id", "location_name", "updated_at" FROM "Locations";
DROP TABLE "Locations";
ALTER TABLE "new_Locations" RENAME TO "Locations";
CREATE TABLE "new_Routes" (
    "route_name_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "minFare" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Routes" ("created_at", "route_name", "route_name_id", "updated_at") SELECT "created_at", "route_name", "route_name_id", "updated_at" FROM "Routes";
DROP TABLE "Routes";
ALTER TABLE "new_Routes" RENAME TO "Routes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
