import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import profesionalRoutes from './routes/profesionalesRoutes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import profesionesRoutes from './routes/profesiones.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

app.use('/api', authRoutes);
app.use('/api', profesionalRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', profesionalRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
