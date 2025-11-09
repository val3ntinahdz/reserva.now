import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../lib/jwt.js';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const userFound = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (userFound) {
      return res.status(400).json({ message: "Ya existe un usuario con ese correo" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.usuario.create({
      data: {
        nombre: nombre,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true
      }
    });

    res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor al registrar" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const userFound = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // Es igual a 1 día
    });

    res.status(200).json({
      id: userFound.id,
      nombre: userFound.nombre,
      email: userFound.email,
      token: token,
      createdAt: userFound.createdAt
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor al Iniciar Sesión" });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0), // Se reinicia la cookie 'token'
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  // Devolvemos el usuario que el middleware encontró.
  
  const user = req.user; 

  return res.status(200).json({
    id: user.id,
    nombre: user.nombre,
    email: user.email,
  });
};