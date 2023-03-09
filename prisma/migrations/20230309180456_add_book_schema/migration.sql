-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "isLike" BOOLEAN,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
