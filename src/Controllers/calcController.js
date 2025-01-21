import * as Servicios from '../Services/calcServices.js';
import { DividirCabecera } from '../Utils/actionsToken.js';
import { VerificarToken } from '../Utils/jwt.js';

export const CalcularBMI = async (req, res) => {
    const { weight, height } = req.body;
    const authHeader = req.headers['authorization']; // cabecera de autenticacion
    let tokenData; // Almacena el id del usuario proveniente del token

    // Confirmamos que se hayan enviado los datos
    if (!weight || !height) {
        res.status(400).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
        return;
    }

    try {
        // Checamos la autenticidad del token
        if (authHeader) {
            const token = DividirCabecera(authHeader);
            if (!token) {
                return res.status(200).json({ status: 401, msg: 'Formato de token inválido' });
            }
            // Verificar el token utilizando la función VerificarToken
            tokenData = VerificarToken(token);
        }
        const resultadoOperacion = await Servicios.CalcularBMI(tokenData?.userID, weight, height);
        res.status(200).json(resultadoOperacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: `ERROR: ${error.message}` });
    }
}

export const CalcularIGC = async (req, res) => {
    const { weight, waist, hip, neck, height, gender } = req.body;
    const authHeader = req.headers['authorization']; // cabecera de autenticacion
    let tokenData;

    // Confirmamos que se hayan enviado los datos
    if(gender === 'male'){
        if (!weight || !waist || !neck || !height || !gender) {
            res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
            return;
        }
    }

    if(gender === 'female'){
        if (!weight || !waist || !hip || !neck || !height || !gender) {
            res.status(200).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
            return;
        }
    }

    console.log({weight, waist, hip, neck, height, gender})

    try {
        // Checamos la autenticidad del token
        if (authHeader) {
            const token = DividirCabecera(authHeader);
            if (!token) {
                return res.status(200).json({ status: 401, msg: 'Formato de token inválido' });
            }
            // Verificar el token utilizando la función VerificarToken
            tokenData = VerificarToken(token);
        }
        const resultadoOperacion = await Servicios.CalcularIGC(tokenData?.userID, weight, waist, hip, neck, height, gender);
        res.status(200).json(resultadoOperacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: `ERROR: ${error.message}` });
    }
}