-- CreateTable
CREATE TABLE "record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner" TEXT NOT NULL,
    "overDue" INTEGER NOT NULL DEFAULT 0,
    "completed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "record_owner_fkey" FOREIGN KEY ("owner") REFERENCES "user" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "record_record_date_owner_key" ON "record"("record_date", "owner");
