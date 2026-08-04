-- CreateTable
CREATE TABLE "Producer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "consumerId" INTEGER NOT NULL,
    "producerId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "pathParams" JSONB,
    "requestBody" JSONB,
    "statusCode" INTEGER NOT NULL,
    "responseBody" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "errorDetails" JSONB,
    "baseUrlUsed" TEXT NOT NULL,
    "ranAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_key" ON "Producer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_name_key" ON "Consumer"("name");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
