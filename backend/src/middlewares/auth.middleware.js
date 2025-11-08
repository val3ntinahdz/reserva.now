import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No autorizado: No hay token" });
    }


    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const userFound = await prisma.usuario.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true,
        // Añadiremos la relación 'profesional' aquí más tarde si es necesario
      }
    });

    // 5. Si el usuario no existe (ej. fue borrado), no está autorizado
    if (!userFound) {
      return res.status(401).json({ message: "No autorizado: Usuario no encontrado" });
    }

    // 6. ¡Éxito! Adjuntamos el usuario al objeto 'req'
    req.user = userFound;

    // Continuar al siguiente middleware o controlador
    next();

  } catch (error) {
    // Si el token no es válido (firmas, etc.) o ha expirado
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "No autorizado: Token inválido o expirado" });
    }
    // Otros errores
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};