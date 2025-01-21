import express from 'express';
const router = express.Router();
import * as Controladores from '../Controllers/authController.js'

router.post('/register', Controladores.Registrarse);
router.post('/login', Controladores.IniciarSesion);

export default router;