import express from 'express';
const router = express.Router();

import * as Controladores from '../Controllers/calcController.js';

router.post('/bmi', Controladores.CalcularBMI);
router.post('/igc', Controladores.CalcularIGC);

export default router;