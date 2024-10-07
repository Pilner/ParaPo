/*
  Warnings:

  - You are about to drop the column `location_latitude` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `location_longitude` on the `Locations` table. All the data in the column will be lost.
  - The primary key for the `Routes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `route_name_id` on the `Routes` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minFare` to the `Routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route_id` to the `Routes` table without a default value. This is not possible if the table is not empty.

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
    "route_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "minFare" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Routes" ("created_at", "route_name", "updated_at") SELECT "created_at", "route_name", "updated_at" FROM "Routes";
DROP TABLE "Routes";
ALTER TABLE "new_Routes" RENAME TO "Routes";
CREATE TABLE "new__LocationsToRoutes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LocationsToRoutes_A_fkey" FOREIGN KEY ("A") REFERENCES "Locations" ("location_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LocationsToRoutes_B_fkey" FOREIGN KEY ("B") REFERENCES "Routes" ("route_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__LocationsToRoutes" ("A", "B") SELECT "A", "B" FROM "_LocationsToRoutes";
DROP TABLE "_LocationsToRoutes";
ALTER TABLE "new__LocationsToRoutes" RENAME TO "_LocationsToRoutes";
CREATE UNIQUE INDEX "_LocationsToRoutes_AB_unique" ON "_LocationsToRoutes"("A", "B");
CREATE INDEX "_LocationsToRoutes_B_index" ON "_LocationsToRoutes"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
