/*
  Warnings:

  - You are about to drop the column `minFare` on the `Routes` table. All the data in the column will be lost.
  - Added the required column `min_fare` to the `Routes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routes" (
    "route_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "min_fare" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Routes" ("category", "created_at", "route_id", "route_name", "updated_at") SELECT "category", "created_at", "route_id", "route_name", "updated_at" FROM "Routes";
DROP TABLE "Routes";
ALTER TABLE "new_Routes" RENAME TO "Routes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
