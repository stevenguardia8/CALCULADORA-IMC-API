import { ObtenerConexion } from '../configs/database/conector.js'
import {
    Calcular_BMI,
    ObtenerCategoria_BMI,
    ObtenerRecomendaciones_BMI,
    Calcular_IGC,
    ObtenerCategoria_IGC,
    ObtenerRecomendaciones_IGC,
    ObtenerGeneroLetra
} from '../Utils/calcs.js';

export const CalcularBMI = async (usuarioId, weight, height) => {
    const conn = await ObtenerConexion();
    try {
        // Cálculo del BMI
        const BMI = Calcular_BMI(weight, height);
        const categoria_BMI = ObtenerCategoria_BMI(BMI);
        const recomendaciones_BMI = ObtenerRecomendaciones_BMI(categoria_BMI);

        // Log de operaciones realizadas
        console.log({ usuarioId, BMI, categoria_BMI, recomendaciones_BMI });

        // Inserción de datos
        const [result] = await conn.query(`
            INSERT INTO registros_operaciones(
                usuario_id,
                tipo_calculo_id,
                peso,
                altura,
                resultado
            ) VALUES (
                ?, ?, ?, ?, ?
            )
        `, [
            usuarioId ?? 1, // ID del usuario
            1,              // ID del tipo de cálculo (1 para BMI)
            weight,         // Peso en kilogramos
            height,         // Altura en metros
            BMI             // Resultado del cálculo
        ]);

        // Verificamos la inserción de los datos
        if (result.affectedRows === 0) {
            throw new Error('No se pudo guardar los resultados del cálculo en la base de datos.');
        }

        // Retornamos los resultados junto con las recomendaciones
        return {
            status: 200,
            msg: `Cálculo realizado y guardado exitosamente ${usuarioId ? `en el usuario`: ''}`,
            data: {
                tipo_calc: "BMI",
                BMI,
                categoria: categoria_BMI,
                recomendaciones: recomendaciones_BMI
            }
        };

    } catch (error) {
        console.error('Error en CalcularBMI:', error.message);
        throw new Error('Ocurrió un error al realizar el cálculo de BMI.');
    } finally {
        conn.release();
    }
};


export const CalcularIGC = async (usuarioId, weight, waist, hip, neck, height, gender) => {
    const conn = await ObtenerConexion();

    try {
        // Cálculo del IGC
        const IGC = Calcular_IGC(waist, hip, neck, height, gender);
        const categoria_IGC = ObtenerCategoria_IGC(IGC, gender);
        const recomendaciones_IGC = ObtenerRecomendaciones_IGC(categoria_IGC);

        // Log de operaciones realizadas
        console.log({ usuarioId, IGC, categoria_IGC, recomendaciones_IGC })

        // Inserción de datos
        const [result] = await conn.query(`
            INSERT INTO registros_operaciones(
                usuario_id,
                tipo_calculo_id,
                peso,
                altura,
                cintura,
                cadera,
                cuello,
                genero,
                resultado
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `, [
            usuarioId ?? 1,                     // ID del usuario
            2,                                  // ID del tipo de cálculo (2 para IGC)
            weight,                             // Peso en kilogramos
            height,                             // Altura en metros
            waist,                              // Cintura en cm
            hip === '' ? null : hip,                                // Cadera en cm
            neck,                               // Cuello en cm
            ObtenerGeneroLetra(gender),         // Género ('M' o 'F')
            IGC                                 // Resultado del cálculo
        ]);

        // Verificamos la inserción de los datos
        if (result.affectedRows === 0) {
            throw new Error('No se pudo guardar los resultados del cálculo en la base de datos.');
        }

        // Retornamos los resultados junto con las recomendaciones
        return {
            status: 200,
            msg: `Cálculo realizado y guardado exitosamente ${usuarioId ? `en el usuario`: ''}`,
            data: {
                tipo_calc: "IGC",
                IGC,
                categoria: categoria_IGC,
                recomendaciones: recomendaciones_IGC
            }
        };

    } catch (error) {
        console.error('Error en CalcularIGC:', error.message);
        throw new Error('Ocurrió un error al realizar el cálculo de IGC.');
    } finally {
        conn.release();
    }
};