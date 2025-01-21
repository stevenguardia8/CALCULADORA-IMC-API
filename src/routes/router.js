import express from 'express';
const router = express.Router();

import authRoute from './authRoute.js';
import calcRoute from './calcRoute.js';
import getData from './getData.js';

// Rutas
router.use('/auth', authRoute);
router.use('/calc', calcRoute);
router.use('/get', getData);

export default router;