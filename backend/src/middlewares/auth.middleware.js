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
        // Añadiremos 'profesional' si es necesario
      }
    });

    if (!userFound) {
      return res.status(401).json({ message: "No autorizado: Usuario no encontrado" });
    }

    req.user = userFound;

    // Continuar al siguiente middleware o controlador
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "No autorizado: Token inválido o expirado" });
    }
    
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};