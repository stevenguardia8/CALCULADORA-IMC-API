import { VerificarToken } from '../Utils/jwt.js';
import { DividirCabecera } from '../Utils/actionsToken.js';

export const VerificarTokenMiddleware = (req, res, next) => {

    // Obtener el token del encabezado 'Authorization'
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        // Si no se proporciona el encabezado
        return res.status(200).json({ status: 401, msg: 'Token no proporcionado' });
    }

    const token = DividirCabecera(authHeader); // Divide la cabecera y devuelve undefined si no es el formato correcto

    if(!token){
        return res.status(200).json({ status: 401, msg: 'Formato de token inválido' });
    }

    try {
        // Verificar el token utilizando la función VerificarToken
        const decoded = VerificarToken(token);

        // Agregar información del usuario al objeto `req` para usar en rutas posteriores
        req.data_usuario_token = decoded;

        // Continuar con el siguiente middleware
        next();
    } catch (error) {
        // Si el token es inválido o expirado
        return res.status(200).json({ status: 401, msg: 'Token inválido o expirado' });
    }
};
