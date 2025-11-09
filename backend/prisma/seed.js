import { PrismaClient } from '../src/generated/prisma/index.js'; // <-- ruta al cliente generado
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nombre: "Salud", descripcion: "Servicios relacionados con la salud", 
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RatswW7ESQtej99DCRnLup60PHwnxg.png&w=1000&q=75" },
    { nombre: "Artesanías", descripcion: "Arte indígena personalizado",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-DhMULvtuRLGTsiepvyclJRMosD9UxD.png&w=1000&q=75" },
    { nombre: "Música", descripcion: "Servicios de mariachi y banda",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-fzkD2FyDowdiTsSYEIr1KCywzu0Q78.png&w=1000&q=75" },
    { nombre: "Estética", descripcion: "Servicios de estética, sastrería, tejedoras, boleros",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RCs6a5lnmDpabnkGxGlPRFAZV2yCV3.png&w=1000&q=75" },
    { nombre: "Educación", descripcion: "Cursos y tutorías",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-fLBUuECujebAYq2Ctir0tmm4ljvF0b.png&w=1000&q=75" },
    { nombre: "Mano de obra", descripcion: "Servicios de plomería, carpintería, etc.",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-YsAVD6wE8mOeZNdBCJlXyREMXg8yvu.png&w=1000&q=75" },
    { nombre: "Legal", descripcion: "Asesoría legal",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-tJ1togoNqunAE3CBiqtQlFvXCiBxJp.png&w=1000&q=75" },
    { nombre: "Mascotas", descripcion: "Asesoría veterinaria, estética canina, etc.",
      imagen: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-lOgGbuHbg7HhqroCWguLxuxeMazgSQ.png&w=1000&q=75" },
  ];
  
  const usuarios = [
    { nombre: "Daniel Mondragon", email: "daniel@prueba.com", 
      password: "$2b$10$XO123BumQJvpSW00gpdDLuvTVV66ZQBnGBbpMog38ft3y4WCauOhO",
      walletAddress: "https://ilp.interledger-test.dev/proveedor-mariachis" },
    { nombre: "Jorge Juarez", email: "jorge@prueba.com",
      password: "$2b$10$iKWx4UEYD1J7NioKi5RNDOq/dJ4NxtNnx9X2lWAgzp8Em5NW7Xx2O",
      walletAddress: "https://ilp.interledger-test.dev/cliente-jorge"}
  ];

  for (const cat of categorias) {
    await prisma.categoria.create({ data: cat });
  }
  for (const user of usuarios) {
    await prisma.usuario.create({ data: user});
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
