-- CreateTable
CREATE TABLE "Contas" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Contas_pkey" PRIMARY KEY ("id")
);
