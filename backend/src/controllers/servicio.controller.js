import prisma from '../lib/prisma.js';

/**
 * Obtiene todos los servicios.
 * Ruta: GET /api/servicios
 */
export const getServicios = async (req, res) => {
  try {
    const servicios = await prisma.servicio.findMany();
    res.status(200).json(servicios);

  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene un solo servicio por su ID.
 * Ruta: GET /api/servicios/:id
 */
export const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await prisma.servicio.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        profesionales: {
          select: { id: true, nombre: true, rating: true }
        }
      }
    });

    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.status(200).json(servicio);

  } catch (error) {
    console.error("Error al obtener servicio por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};