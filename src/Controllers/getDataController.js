import * as Servicios from '../Services/getDataService.js'

export const ObtenerHistorialCalculos = async (req, res) => {
    const { id_user } = req.params;
    const { userID } = req.data_usuario_token

    // Confirmamos que se hayan enviado los datos
    if (!id_user || !userID) {
        res.status(400).json({ status: 400, msg: 'No se enviaron los datos necesarios' });
        return;
    }

    if (id_user != userID) {
        res.status(401).json({ status: 401, msg: 'Operación no válida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion = await Servicios.ObtenerHistorialCalculos(id_user);
        res.status(200).json(resultadoOperacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: `ERROR: ${error.message}` });
    }
}