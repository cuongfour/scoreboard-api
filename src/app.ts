import express from 'express';
import dotenv from 'dotenv';
import { scoreRoutes } from './routes/scoreRoutes';

// Nạp biến môi trường từ file .env
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

app.use('/api', scoreRoutes); // Sử dụng các route đã định nghĩa

export default app;
