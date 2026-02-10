-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "loyaltyDiscount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "completedVisits" INTEGER NOT NULL DEFAULT 0;
