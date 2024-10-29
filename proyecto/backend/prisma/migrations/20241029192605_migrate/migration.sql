/*
  Warnings:

  - The primary key for the `Respuesta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[usuarioId,preguntaId_pregunta]` on the table `Respuesta` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Respuesta" DROP CONSTRAINT "Respuesta_opcionId_fkey";

-- AlterTable
ALTER TABLE "Respuesta" DROP CONSTRAINT "Respuesta_pkey",
ADD COLUMN     "id_respuesta" SERIAL NOT NULL,
ALTER COLUMN "opcionId" DROP NOT NULL,
ADD CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id_respuesta");

-- CreateIndex
CREATE UNIQUE INDEX "Respuesta_usuarioId_preguntaId_pregunta_key" ON "Respuesta"("usuarioId", "preguntaId_pregunta");

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_opcionId_fkey" FOREIGN KEY ("opcionId") REFERENCES "OpcionRespuesta"("id_opcion") ON DELETE SET NULL ON UPDATE CASCADE;
