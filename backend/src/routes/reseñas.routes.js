import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import {
  createReseña,
  getReseñasByProfesional
} from '../controllers/reseña.controller.js';

const router = Router();

// Ruta Pública
// Ver las reseñas de un profesional
router.get('/reseñas/profesional/:id', getReseñasByProfesional);

// Ruta Protegida
// Crear una nueva reseña
router.post('/reseñas', authRequired, createReseña);

export default router;