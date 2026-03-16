import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import productRoutes from './routes/product.route.js';
import reviewRoutes from './routes/review.route.js';
import settingRoutes from './routes/apk.route.js';
import userCardRoutes from './routes/user.route.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use('/api/products', productRoutes);
app.use('/api/products/:productId/reviews', reviewRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/user-cards', userCardRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});