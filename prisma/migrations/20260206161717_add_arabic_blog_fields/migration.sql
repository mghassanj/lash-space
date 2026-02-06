-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL,
    "excerptAr" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "tags" TEXT NOT NULL,
    "tagsAr" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("content", "createdAt", "excerpt", "id", "image", "published", "publishedAt", "slug", "tags", "title", "updatedAt") SELECT "content", "createdAt", "excerpt", "id", "image", "published", "publishedAt", "slug", "tags", "title", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
