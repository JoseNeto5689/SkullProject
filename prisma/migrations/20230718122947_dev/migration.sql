-- DropIndex
DROP INDEX "UsersOnEnterprise_userId_enterpriseId_idx";

-- CreateIndex
CREATE INDEX "UsersOnEnterprise_userId_idx" ON "UsersOnEnterprise"("userId");

-- CreateIndex
CREATE INDEX "UsersOnEnterprise_enterpriseId_idx" ON "UsersOnEnterprise"("enterpriseId");
