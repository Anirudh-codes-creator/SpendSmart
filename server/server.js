import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { asyncHandler } from './middleware/asyncHandler.js';
import authRoutes from './routes/authRoutes.js';
import financeRoutes from './routes/financeRoutes.js';

const app = express();
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['https://client-gold-three-27.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', asyncHandler(async (_request, response) => {
  await connectDB();
  response.json({ status: 'ok', database: 'connected' });
}));

app.use(asyncHandler(async (_request, _response, next) => {
  await connectDB();
  next();
}));
app.use('/api/auth', authRoutes);
app.use('/api', financeRoutes);

app.use((error, _request, response, next) => {
  if (response.headersSent) return next(error);
  const status = error.status || (!process.env.MONGODB_URI || error.name?.includes('Mongo') ? 503 : 500);
  const message = status === 503
    ? 'Database unavailable. Check the MONGODB_URI and MongoDB network access settings.'
    : 'Request failed.';
  response.status(status).json({ message });
});

if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`SpendSmart API listening on ${port}`));
}

export default app;
