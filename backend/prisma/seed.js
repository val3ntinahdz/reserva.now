import { PrismaClient } from '../src/generated/prisma/index.js'; // <-- ruta al cliente generado
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nombre: "Salud", descripcion: "Servicios relacionados con la salud" },
    { nombre: "Hogar", descripcion: "Servicios del hogar" },
    { nombre: "Mascotas", descripcion: "Cuidado de mascotas" },
    { nombre: "Automotriz", descripcion: "Servicios para autos" },
    { nombre: "Eventos", descripcion: "Organización de eventos" },
    { nombre: "Transporte", descripcion: "Servicios de transporte" },
    { nombre: "Belleza", descripcion: "Servicios de belleza" },
    { nombre: "Fitness", descripcion: "Entrenamiento y gimnasio" },
    { nombre: "Educación", descripcion: "Cursos y tutorías" },
    { nombre: "Tecnología", descripcion: "Servicios de tecnología" },
    { nombre: "Legal", descripcion: "Asesoría legal" },
    { nombre: "Gastronomía", descripcion: "Alimentos y catering" }
  ];

  for (const cat of categorias) {
    await prisma.categoria.create({ data: cat });
  }

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
