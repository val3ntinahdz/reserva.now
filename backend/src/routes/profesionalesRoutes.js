import { Router } from 'express';
// ¡Importamos nuestro vigilante!
import { authRequired } from '../middlewares/auth.middleware.js';
import {
  getProfesionales,
  getProfesionalById,
  createProfesionalProfile,
  getMyProfesionalProfile
} from '../controllers/profesional.controller.js';

const router = Router();

// --- Rutas Públicas ---
// (No usan 'authRequired')

// Obtener la lista de todos los profesionales
router.get('/profesionales', getProfesionales);

// Obtener un profesional específico por su ID
router.get('/profesionales/:id', getProfesionalById);

// --- Rutas Protegidas ---
// (Usan 'authRequired' como vigilante)

// Obtener mi propio perfil (basado en mi token)
router.get('/profesionales/perfil', authRequired, getMyProfesionalProfile);

// Crear mi perfil de profesional
router.post('/profesionales', authRequired, createProfesionalProfile);

export default router;