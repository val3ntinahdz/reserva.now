import prisma from '../lib/prisma.js';

export const getProfesiones = async (req, res) => {
  try {
    const profesiones = await prisma.profesion.findMany({
      // Mostramos la categoria a la que pertenece
      include: {
        categoria: {
          select: { id: true, nombre: true }
        }
      }
    });
    res.status(200).json(profesiones);

  } catch (error) {
    console.error("Error al obtener profesiones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const getProfesionById = async (req, res) => {
  try {
    const { id } = req.params;
    const profesion = await prisma.profesion.findUnique({
      where: {
        id: parseInt(id)
      },
      // Mostramos los profesionales de esa profesión
      include: {
        categoria: true,
        profesionales: {
          select: { id: true, nombre: true, rating: true }
        }
      }
    });

    if (!profesion) {
      return res.status(404).json({ message: "Profesión no encontrada" });
    }

    res.status(200).json(profesion);

  } catch (error) {
    console.error("Error al obtener profesión por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};