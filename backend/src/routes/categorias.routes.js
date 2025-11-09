import { Router } from 'express';
import { getCategorias, getCategoriaById } from '../controllers/categoria.controller.js';

const router = Router();

// Rutas Públicas para Catálogos
router.get('/categorias', getCategorias);

// Obtener una categoría por su ID
router.get('/categorias/:id', getCategoriaById);

export default router;