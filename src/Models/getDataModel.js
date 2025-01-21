import { ObtenerConexion } from '../configs/database/conector.js'
import {
    ObtenerCategoria_BMI,
    ObtenerRecomendaciones_BMI,
    ObtenerCategoria_IGC,
    ObtenerRecomendaciones_IGC,
} from '../Utils/calcs.js';


export const ObtenerHistorialCalculos = async (userID) => {
    const conn = await ObtenerConexion();
    try {
        // Consulta para obtener el historial de cálculos del usuario
        const [result] = await conn.query(`
            SELECT * 
            FROM registros_operaciones
            WHERE usuario_id = ?;
        `, [userID]);

        if (!result.length) {
            return { status: 404, msg: 'No se encontraron registros para este usuario.' };
        }

        // Procesar cada cálculo dependiendo de su tipo de consulta que se realizo
        const historial = result.map((registro) => {
            const {
                id,
                tipo_calculo_id,
                peso,
                altura,
                cintura,
                cadera,
                cuello,
                genero,
                resultado,
                fecha_consulta,
            } = registro;

            // Para BMI
            if (tipo_calculo_id === 1) { 
                const categoria_BMI = ObtenerCategoria_BMI(resultado);
                const recomendaciones_BMI = ObtenerRecomendaciones_BMI(categoria_BMI);

                return {
                    id: id,
                    tipo_calculo: "BMI",
                    peso,
                    altura,
                    resultado_calculado: resultado,
                    categoria: categoria_BMI,
                    recomendaciones: recomendaciones_BMI,
                    fecha_consulta: fecha_consulta
                };
            } else if (tipo_calculo_id === 2) { // Para IGC
                const categoria_IGC = ObtenerCategoria_IGC(resultado, genero);
                const recomendaciones_IGC = ObtenerRecomendaciones_IGC(categoria_IGC);

                return {
                    id: id,
                    tipo_calculo: "IGC",
                    cintura,
                    cadera,
                    cuello,
                    genero,
                    peso,
                    altura,
                    resultado_calculado: resultado,
                    categoria: categoria_IGC,
                    recomendaciones: recomendaciones_IGC,
                    fecha_consulta: fecha_consulta
                };
            }

            // Si el tipo de cálculo no es reconocido, devolver el registro sin modificar
            return { status: 200, msg: 'Datos encontrados y procesados', data: registro };
        });

        return { status: 200, msg: 'Datos encontrados y procesados', data: historial };

    } catch (error) {
        console.error('Error en ObtenerHistorialCalculos:', error.message);
        throw error;
    } finally {
        conn.release();
    }
};
