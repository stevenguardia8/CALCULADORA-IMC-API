import * as Modelos from '../Models/calcModel.js';

export const CalcularBMI = async (userID, weight, height) => {

    try {
        return await Modelos.CalcularBMI(userID, weight, height);
    } catch (error) {
        throw error;
    }
}

export const CalcularIGC = async (userID, weight, waist, hip, neck, height, gender) => {

    try {
        return await Modelos.CalcularIGC(userID, weight, waist, hip, neck, height, gender);
    } catch (error) {
        throw error;
    }
}