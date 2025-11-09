import prisma from '../lib/prisma.js';

export const getCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      // Si tiene profesiones las muestra
      include: {
        profesiones: {
          select: { id: true, nombre: true } // Solo id y nombre
        }
      }
    });
    res.status(200).json(categorias);

  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: parseInt(id) // Se valida que el ID sea un número
      },
      include: {
        profesiones: true // Trae sus profesiones
      }
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json(categoria);

  } catch (error) {
    console.error("Error al obtener categoría por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// NOTA: Se evita rutas POST, PUT, DELETE por ser Administrativas
