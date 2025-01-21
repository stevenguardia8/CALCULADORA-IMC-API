
export const DividirCabecera = (authHeader) => {
    const [scheme, token] = authHeader.split(' ');
    // Verificar que el esquema sea 'Bearer' y que el token exista
    if (scheme !== 'Bearer' || !token) {
        return undefined
    }
    return token;
}