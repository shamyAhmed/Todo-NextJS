-- CreateTable
CREATE TABLE "todoList" (
    "owner_id" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "todoList_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "list_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" DATETIME,
    CONSTRAINT "todo_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "todoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "todoList_owner_id_key" ON "todoList"("owner_id");
