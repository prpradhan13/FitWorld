import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import fileRoute from './routes/fileRoute.js'
import dietRoute from './routes/dietRoute.js'

// config env
dotenv.config();

// Database configuration
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/file', fileRoute);
app.use('/api/diet', dietRoute);

const PORT = process.env.PORT || 8080

app.listen(PORT, (req, res) => {
    console.log(`Connected to port ${PORT}`);
})