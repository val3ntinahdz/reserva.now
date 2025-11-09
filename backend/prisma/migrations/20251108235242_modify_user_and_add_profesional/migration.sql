-- CreateTable
CREATE TABLE "Profesional" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "experiencia" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "precioMin" INTEGER NOT NULL,
    "precioMax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Profesional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profesional_usuarioId_key" ON "Profesional"("usuarioId");

-- AddForeignKey
ALTER TABLE "Profesional" ADD CONSTRAINT "Profesional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
