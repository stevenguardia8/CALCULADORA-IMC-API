import * as Modelos from '../Models/getDataModel.js';

export const ObtenerHistorialCalculos = async (userID) => {

    try {
        return await Modelos.ObtenerHistorialCalculos(userID);
    } catch (error) {
        throw error;
    }
}
