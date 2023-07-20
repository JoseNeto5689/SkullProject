-- CreateTable
CREATE TABLE "Enterprise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnEnterprise" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enterpriseId" TEXT NOT NULL,

    CONSTRAINT "UsersOnEnterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Enterprise_userId_idx" ON "Enterprise"("userId");

-- CreateIndex
CREATE INDEX "UsersOnEnterprise_userId_idx" ON "UsersOnEnterprise"("userId");

-- CreateIndex
CREATE INDEX "UsersOnEnterprise_enterpriseId_idx" ON "UsersOnEnterprise"("enterpriseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
