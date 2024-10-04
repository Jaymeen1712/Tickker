-- CreateTable
CREATE TABLE "adminUsers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "username" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "lowResImage" TEXT,
    "highResImage" TEXT,
    "username" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminUsers_email_key" ON "adminUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "adminUsers_username_key" ON "adminUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "adminUsers_id_email_key" ON "adminUsers"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAccount_providerId_providerAccountId_key" ON "AdminAccount"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_sessionToken_key" ON "AdminSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_accessToken_key" ON "AdminSession"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_userId_key" ON "adminProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_username_key" ON "adminProfiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_email_key" ON "adminProfiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_id_userId_key" ON "adminProfiles"("id", "userId");

-- AddForeignKey
ALTER TABLE "AdminAccount" ADD CONSTRAINT "AdminAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "adminUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "adminUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminProfiles" ADD CONSTRAINT "adminProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "adminUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
