import { PrismaClient } from '../src/generated/prisma/index.js'; // <-- ruta al cliente generado
const prisma = new PrismaClient();

async function main() {

  const usuarios = [
    { nombre: "Daniel Mondragon", email: "daniel@prueba.com", 
      password: "$2b$10$XO123BumQJvpSW00gpdDLuvTVV66ZQBnGBbpMog38ft3y4WCauOhO",
      walletAddress: "https://ilp.interledger-test.dev/proveedor-mariachis" },
    { nombre: "Jorge Juarez", email: "jorge@prueba.com",
      password: "$2b$10$iKWx4UEYD1J7NioKi5RNDOq/dJ4NxtNnx9X2lWAgzp8Em5NW7Xx2O",
      walletAddress: "https://ilp.interledger-test.dev/cliente-jorge"}
  ];

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
  
  const profesiones = [
    { nombre: "Médico General", descripcion: "Atención médica general", categoriaId: 1 },
    { nombre: "Terapeuta Físico", descripcion: "Rehabilitación y masajes terapéuticos", categoriaId: 1 },
    { nombre: "Enfermeria", descripcion: "Atención y Soporte Médico", categoriaId: 1 },
    { nombre: "Artesano Textil", descripcion: "Elaboración de artesanías tejidas", categoriaId: 2 },
    { nombre: "Artesano Ceramico", descripcion: "Elaboración de artesanías con ceramica", categoriaId: 2 },
    { nombre: "Artesano Herrero", descripcion: "Elaboración de artesanías en herreria", categoriaId: 2 },
    { nombre: "Mariachi", descripcion: "Interpretación musical de mariachi", categoriaId: 3 },
    { nombre: "Instrumental", descripcion: "Interpretación musical de instrumentaria", categoriaId: 3 },
    { nombre: "Tecnico de Sonido", descripcion: "Soporte Tecnico para ambiente de sonido", categoriaId: 3 },
    { nombre: "Estilista", descripcion: "Servicios de belleza y peluquería", categoriaId: 4 },
    { nombre: "Maquillista", descripcion: "Servicios de maquillista profesional", categoriaId: 4 },
    { nombre: "MAnicura", descripcion: "Cuidado y embellecimiento de las uñas en manos y pies", categoriaId: 4 },
    { nombre: "Profesor", descripcion: "Clases de regularización", categoriaId: 5 },
    { nombre: "Orientador", descripcion: "Apoyo y guia en las decisiones del estudiante", categoriaId: 5 },
    { nombre: "Capacitador", descripcion: "Encargado de brindar capacitacion en muchos ambitos", categoriaId: 5 },
    { nombre: "Carpintero", descripcion: "Fabricación y reparación de muebles", categoriaId: 6 },
    { nombre: "Albañil", descripcion: "Empleado de construccion", categoriaId: 6 },
    { nombre: "Electricista", descripcion: "Instalación y reparación electrica", categoriaId: 6 },
    { nombre: "Abogado", descripcion: "Asesoría y representación a individuos o empresas", categoriaId: 7 },
    { nombre: "Juez", descripcion: "Impartición de justicia y resolución de litigios", categoriaId: 7 },
    { nombre: "Fiscal", descripcion: "Investigación y persecución de delitos", categoriaId: 7 },
    { nombre: "Veterinario", descripcion: "Diagnostico y tratamiento para mascotas", categoriaId: 8 },
    { nombre: "Zootecnia", descripcion: "Producción animal sin descuidar la atención", categoriaId: 8 },
    { nombre: "Cuidador", descripcion: "Cuidador de mascotas, asegurando bienestar, alimentación y socialización", categoriaId: 8 }
  ];

  const modalidades = [
    { nombre: "Presencial", descripcion: "El servicio se realiza de forma presencial" },
    { nombre: "En línea", descripcion: "El servicio se realiza a través de videollamada" },
    { nombre: "A domicilio", descripcion: "El profesional acude al domicilio del cliente" },
  ];

  const servicios = [
    { nombre: "Consulta médica", descripcion: "Revisión y diagnóstico médico" },
    { nombre: "Serenata", descripcion: "Presentación musical" },
    { nombre: "Corte de cabello", descripcion: "Servicio de estética y peluquería" },
    { nombre: "Clases de regularización", descripcion: "Tutorías para aprendizaje" },
  ];

  const profesionales = [
    {
      nombre: "Daniel Mondragon",
      descripcion: "Mariachi con más de 10 años de experiencia tocando en eventos.",
      experiencia: 10,
      rating: 4.8,
      telefono: "5523546798",
      direccion: "Av. Revolución 123, CDMX",
      ubicacion: "CDMX",
      horario: "Lunes a Domingo 10:00 - 22:00",
      disponible: true,
      precioMin: 1500,
      precioMax: 5000,
      usuarioId: 1, // Daniel usuario
      profesionId: 7, // Mariachi
      serviciosIds: [2],
      modalidadesIds: [1]
    }
  ];

  for (const user of usuarios) {
    await prisma.usuario.create({ data: user});
  }
  for (const cat of categorias) {
    await prisma.categoria.create({ data: cat });
  }
  for (const prof of profesiones) {
    await prisma.profesion.create({ data: prof});
  }
  for (const mod of modalidades) {
    await prisma.modalidad.create({ data: mod});
  }
  for (const serv of servicios) {
    await prisma.servicio.create({ data: serv});
  }
  for (const profesi of profesionales) {
    await prisma.profesional.create({ data: profesi});
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
