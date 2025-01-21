import jwt from 'jsonwebtoken';

const { CLAVE_FOR_TOKENS, CLAVE_PUBLICA_FOR_TOKENS } = process.env;

const optionsToken = {
    algorithm: 'RS256',
    expiresIn: '1h'
}

export const GenerarToken = (dataForToken) => {
    if (!CLAVE_FOR_TOKENS) {
        throw new Error('La clave RSA para generar tokens no esta definida');
    }

    try {
        const token = jwt.sign(dataForToken, CLAVE_FOR_TOKENS, optionsToken);
        return token;
    } catch (error) {
        throw error;
    }
}


export const VerificarToken = (token) => {
    if (!CLAVE_PUBLICA_FOR_TOKENS) {
        throw new Error('La clave pública RSA para verificar tokens no está definida');
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, CLAVE_PUBLICA_FOR_TOKENS, {
            algorithms: ['RS256'],
        });
        return decoded; // Información contenida en el token
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
};