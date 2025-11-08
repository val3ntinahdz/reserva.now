import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
