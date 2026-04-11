import express from 'express';
import { checkAbandonedCarts } from '../controllers/cronController.js';

const cronRouter = express.Router();

// Route for Vercel Cron to Trigger
cronRouter.get('/abandoned-cart', checkAbandonedCarts);

export default cronRouter;
