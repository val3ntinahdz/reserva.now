import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import { register, login, logout, verifyToken } from '../controllers/auth.controller.js';

const router = Router();

// Rutas Públicas (No requieren autenticación)
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Rutas Protegidas (Requieren un token válido) 
router.get('/verify', authRequired, verifyToken); 

export default router;