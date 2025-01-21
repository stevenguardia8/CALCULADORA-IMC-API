import * as Modelos from '../Models/authModel.js';

export const Registrarse = async (correo, contrasenia, username) => {

    try {
        return await Modelos.Registrarse(correo, contrasenia, username);
    } catch (error) {
        throw error;
    }
}

export const IniciarSesion = async (correo, contrasenia) => {

    try {
        return await Modelos.IniciarSesion(correo, contrasenia);
    } catch (error) {
        throw error;
    }
}