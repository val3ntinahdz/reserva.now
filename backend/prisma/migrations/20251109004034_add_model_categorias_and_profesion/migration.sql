/*
  Warnings:

  - Added the required column `profesionId` to the `Profesional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profesional" ADD COLUMN     "profesionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estatus" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estatus" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Profesion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profesional" ADD CONSTRAINT "Profesional_profesionId_fkey" FOREIGN KEY ("profesionId") REFERENCES "Profesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profesion" ADD CONSTRAINT "Profesion_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
