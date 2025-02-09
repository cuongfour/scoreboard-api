import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { scoreRoutes } from './routes/scoreRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', scoreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
