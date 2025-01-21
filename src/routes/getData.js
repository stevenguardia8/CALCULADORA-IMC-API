import express from 'express';
const router = express.Router();

import * as Controladores from '../Controllers/getDataController.js';
import { VerificarTokenMiddleware } from '../Middlewares/VerificarToken.js';


router.get('/history/:id_user', VerificarTokenMiddleware, Controladores.ObtenerHistorialCalculos);


export default router;