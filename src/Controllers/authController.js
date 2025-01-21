import * as Servicios from '../Services/authService.js';
import { DesencriptarDatos } from '../Utils/security.js';

export const Registrarse = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
        return;
    }

    try {
        const { email, password, conPassword, username } = DesencriptarDatos(data);

        // Confirmamos que se hayan enviado los datos
        if (!password || !conPassword || !email || !username) {
            return res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
        }

        // Confirmacion de contraseñas
        if (password !== conPassword) {
            return res.status(200).json({ status: 400, msg: 'Contraseñas no coinciden' });
        }

        const resultadoOperacion = await Servicios.Registrarse(email, password, username);
        res.status(200).json(resultadoOperacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: `ERROR: ${error.message}` });
    }
}

export const IniciarSesion = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
        return;
    }

    try {
        const { email, password } = DesencriptarDatos(data);
        // Confirmamos que se hayan enviado los datos
        if (!email || !password) {
            res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
            return;
        }

        const resultadoOperacion = await Servicios.IniciarSesion(email, password);
        res.status(200).json(resultadoOperacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: `ERROR: ${error.message}` });
    }
}