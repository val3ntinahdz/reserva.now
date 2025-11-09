import { Router } from 'express';
import { getProfesiones, getProfesionById } from '../controllers/profesion.controller.js';

const router = Router();

// Obtener todas las profesiones
router.get('/profesiones', getProfesiones);

// Obtener una profesión por su ID
router.get('/profesiones/:id', getProfesionById);

export default router;