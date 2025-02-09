/*
  Warnings:

  - You are about to drop the `_LocationsToRoutes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `route_id` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_LocationsToRoutes_B_index";

-- DropIndex
DROP INDEX "_LocationsToRoutes_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LocationsToRoutes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locations" (
    "location_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_name" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "route_id" INTEGER NOT NULL,
    CONSTRAINT "Locations_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Routes" ("route_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Locations" ("created_at", "latitude", "location_id", "location_name", "longitude", "updated_at") SELECT "created_at", "latitude", "location_id", "location_name", "longitude", "updated_at" FROM "Locations";
DROP TABLE "Locations";
ALTER TABLE "new_Locations" RENAME TO "Locations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
