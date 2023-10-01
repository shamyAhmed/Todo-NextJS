-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner" TEXT NOT NULL,
    "overDue" INTEGER DEFAULT 0,
    "completed" INTEGER DEFAULT 0,
    CONSTRAINT "record_owner_fkey" FOREIGN KEY ("owner") REFERENCES "user" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_record" ("completed", "id", "overDue", "owner", "record_date") SELECT "completed", "id", "overDue", "owner", "record_date" FROM "record";
DROP TABLE "record";
ALTER TABLE "new_record" RENAME TO "record";
CREATE UNIQUE INDEX "record_record_date_owner_key" ON "record"("record_date", "owner");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
