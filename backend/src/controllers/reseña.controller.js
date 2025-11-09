import prisma from '../lib/prisma.js';

/**
 * El 'usuarioId' se toma del token.
 * Ruta: POST /api/reseñas
 */
export const createReseña = async (req, res) => {
  try {
    const clienteUserId = req.user.id;

    const {
      profesionalId, 
      calificacion,  
      comentario    
    } = req.body;

    if (!profesionalId || !calificacion) {
      return res.status(400).json({ message: "El ID del profesional y la calificación son obligatorios" });
    }

    const newReseña = await prisma.reseña.create({
      data: {
        calificacion: parseInt(calificacion),
        comentario: comentario,
        usuario: { connect: { id: clienteUserId } },
        profesional: { connect: { id: parseInt(profesionalId) } }
      }
    });

    res.status(201).json(newReseña);

  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene todas las reseñas de un profesional específico
 * Ruta: GET /api/reseñas/profesional/:id
 */
export const getReseñasByProfesional = async (req, res) => {
  try {
    const { id } = req.params;

    const reseñas = await prisma.reseña.findMany({
      where: {
        profesionalId: parseInt(id)
      },
      include: {
        usuario: {
          select: { id: true, nombre: true }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });

    res.status(200).json(reseñas);

  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};