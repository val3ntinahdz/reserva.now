import { Router } from 'express';
import { getServicios, getServicioById } from '../controllers/servicio.controller.js';
const router = Router();

// Obtener todos los servicios
router.get('/servicios', getServicios);

// Obtener un servicio por su ID
router.get('/servicios/:id', getServicioById);

export default router;