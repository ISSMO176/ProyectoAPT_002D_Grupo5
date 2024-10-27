-- DropForeignKey
ALTER TABLE "EncuestaAsignada" DROP CONSTRAINT "EncuestaAsignada_usuarioId_fkey";

-- AlterTable
ALTER TABLE "EncuestaAsignada" ADD COLUMN     "areaId" INTEGER,
ALTER COLUMN "usuarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EncuestaAsignada" ADD CONSTRAINT "EncuestaAsignada_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("rut") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncuestaAsignada" ADD CONSTRAINT "EncuestaAsignada_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id_area") ON DELETE SET NULL ON UPDATE CASCADE;
