import prisma from '../lib/prisma.js';

/**
 * Crea una nueva cita (Protegido).
 * El 'usuarioId' se toma del token, no del body.
 * Ruta: POST /api/citas
 */
export const createCita = async (req, res) => {
  try {
    const clienteUserId = req.user.id;

    const {
      profesionalId, 
      servicioId,    
      fecha,         // ej: "2025-12-01T00:00:00.000Z" (debe ser un string ISO)
      horario        // ej: "14:30"
    } = req.body;

    if (!profesionalId || !servicioId || !fecha || !horario) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newCita = await prisma.cita.create({
      data: {
        fecha: new Date(fecha), // Convertir el string ISO a un objeto Date
        horario: horario,
        usuario: { connect: { id: clienteUserId } },
        profesional: { connect: { id: parseInt(profesionalId) } },
        servicio: { connect: { id: parseInt(servicioId) } }
      }
    });

    res.status(201).json(newCita);

  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene "Mis Citas"
 * Ruta: GET /api/citas/me
 */
export const getMyCitas = async (req, res) => {
  try {
    const clienteUserId = req.user.id;

    const misCitas = await prisma.cita.findMany({
      where: {
        usuarioId: clienteUserId
      },
      include: {
        profesional: { select: { id: true, nombre: true } },
        servicio: { select: { id: true, nombre: true } }
      },
      orderBy: {
        fecha: 'desc' 
      }
    });

    res.status(200).json(misCitas);

  } catch (error) {
    console.error("Error al obtener mis citas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene las citas de "Mi Perfil Profesional"
 * Ruta: GET /api/citas/profesional
 */
export const getMyProfesionalCitas = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const profesional = await prisma.profesional.findUnique({
            where: { usuarioId: userId },
            select: { id: true } // Solo necesitamos el ID del perfil
        });

        if (!profesional) {
            return res.status(404).json({ message: "Perfil profesional no encontrado." });
        }

        const citasDeMiPerfil = await prisma.cita.findMany({
            where: {
                profesionalId: profesional.id
            },
            include: {
                // Incluimos quién reservó y qué servicio
                usuario: { select: { id: true, nombre: true, email: true } },
                servicio: { select: { id: true, nombre: true } }
            },
            orderBy: {
                fecha: 'desc'
            }
        });

        res.status(200).json(citasDeMiPerfil);

    } catch (error) {
        console.error("Error al obtener citas del profesional:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};