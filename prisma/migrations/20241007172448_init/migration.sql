-- CreateTable
CREATE TABLE "Locations" (
    "location_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location_name" TEXT NOT NULL,
    "location_longitude" REAL NOT NULL,
    "location_latitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Routes" (
    "route_name_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationsToRoutes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LocationsToRoutes_A_fkey" FOREIGN KEY ("A") REFERENCES "Locations" ("location_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LocationsToRoutes_B_fkey" FOREIGN KEY ("B") REFERENCES "Routes" ("route_name_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationsToRoutes_AB_unique" ON "_LocationsToRoutes"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationsToRoutes_B_index" ON "_LocationsToRoutes"("B");
