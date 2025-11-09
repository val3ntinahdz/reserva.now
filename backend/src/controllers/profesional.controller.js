import prisma from '../lib/prisma.js';

export const getProfesionales = async (req, res) => {
  try {
    const profesionales = await prisma.profesional.findMany({
      //Se muestra profesión y la categoría en las tarjetas
      include: {
        profesion: {
          include: {
            categoria: {
              select: { id: true, nombre: true }
            }
          }
        },
        // Opcional: Incluir el usuario para mostrar el nombre
        usuario: {
          select: { nombre: true }
        }
      }
    });
    res.status(200).json(profesionales);
  } catch (error) {
    console.error("Error al obtener profesionales:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfesionalById = async (req, res) => {
  try {
    const { id } = req.params;
    const profesional = await prisma.profesional.findUnique({
      where: { id: parseInt(id) },
      include: {
        //Se incluyen los datos relacionados
        profesion: { include: { categoria: true } },
        servicios: true,
        modalidades: true,
        reseñas: {
          include: {
            usuario: { select: { nombre: true } } //Usuario que escribió la reseña
          }
        },
        usuario: { select: { nombre: true, email: true } }
      }
    });

    if (!profesional) {
      return res.status(404).json({ message: "Perfil de profesional no encontrado" });
    }
    res.status(200).json(profesional);
  } catch (error) {
    console.error("Error al obtener profesional por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProfesionalProfile = async (req, res) => {
  try {
    // req.user viene del middleware 'authRequired'
    const userId = req.user.id;

    //Verificar si este usuario YA tiene un perfil
    const existingProfile = await prisma.profesional.findUnique({
      where: { usuarioId: userId }
    });

    if (existingProfile) {
      return res.status(400).json({ message: "Este usuario ya tiene un perfil profesional" });
    }

    const {
      nombre,
      descripcion,
      experiencia,
      telefono,
      direccion,
      ubicacion,
      horario,
      disponible,
      precioMin,
      precioMax,
      profesionId, 
      serviciosIds,
      modalidadesIds
    } = req.body;
    
    if (!nombre || !profesionId) {
        return res.status(400).json({ message: "Nombre y profesionId son obligatorios" });
    }

    const newProfile = await prisma.profesional.create({
      data: {
        nombre: nombre,
        descripcion: descripcion,
        experiencia: parseInt(experiencia) || 0,
        telefono: telefono,
        direccion: direccion,
        ubicacion: ubicacion,
        horario: horario,
        disponible: disponible || true,
        precioMin: parseInt(precioMin) || 0,
        precioMax: parseInt(precioMax) || 0,
        // --- Conexiones ---
        // Conexión 1-a-1 con Usuario
        usuario: { connect: { id: userId } },
        // Conexión 1-a-Muchos con Profesion
        profesion: { connect: { id: parseInt(profesionId) } },
        // Conexión Muchos-a-Muchos con Servicios
        servicios: {
          connect: serviciosIds?.map(id => ({ id: parseInt(id) })) || []
        },
        // Conexión Muchos-a-Muchos con Modalidades
        modalidades: {
          connect: modalidadesIds?.map(id => ({ id: parseInt(id) })) || []
        }
      }
    });

    res.status(201).json(newProfile);

  } catch (error) {
    console.error("Error al crear perfil profesional:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getMyProfesionalProfile = async (req, res) => {
    try {
        // req.user viene del middleware
        const userId = req.user.id;
        
        const profile = await prisma.profesional.findUnique({
            where: { usuarioId: userId },
            include: {
                profesion: true,
                servicios: true,
                modalidades: true
            }
        });

        if (!profile) {
            return res.status(404).json({ message: "No se encontró un perfil profesional para este usuario." });
        }
        
        res.status(200).json(profile);

    } catch (error) {
        console.error("Error al obtener mi perfil:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
