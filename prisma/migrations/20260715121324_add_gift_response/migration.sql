-- CreateTable
CREATE TABLE "gift_responses" (
    "id" TEXT NOT NULL,
    "giftOption" TEXT NOT NULL,
    "deliveryMethod" TEXT,
    "pickupCity" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "contactInfo" JSONB,
    "postOfficeAddress" TEXT,
    "giftCardLocation" TEXT,
    "giftCardService" TEXT,
    "donationCharityLink" TEXT,
    "rawAnswers" JSONB NOT NULL,
    "sheetsSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_responses_pkey" PRIMARY KEY ("id")
);
