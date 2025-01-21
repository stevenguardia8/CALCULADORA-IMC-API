import { ObtenerConexion } from '../configs/database/conector.js'
import { GenerarHash, CompararContrasenias } from '../Utils/bcrypt.js'
import { GenerarToken } from '../Utils/jwt.js';

export const Registrarse = async (correo, contrasenia, username) => {
    const conn = await ObtenerConexion();

    try {
        // Hasheo de la contraseña a almacenar
        const hashContrasenia = await GenerarHash(contrasenia);

        // Insersion de datos
        const [result] = await conn.query('INSERT INTO usuarios (email, contraseña, nombre_usuario) VALUES (?, ?, ?)', [correo, hashContrasenia, username]);

        // Verificamos la insersion de los datos
        if (result.affectedRows === 0) {
            throw new Error('No se pudo crear el usuario');
        }

        return { status: 200, msg: 'Usuario creado correctamente' };

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { status: 400, msg: 'El correo electrónico ya está registrado' };
        }
        throw (error);
    } finally {
        conn.release();
    }

}

export const IniciarSesion = async (correo, contrasenia) => {
    const conn = await ObtenerConexion();
    try {
        // Consulta al usuario por correo
        const [rows] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [correo]);

        if (rows.length === 0) {
            return { status: 404, msg: 'Usuario no encontrado' };
        }

        // Datos del usuario
        const user = rows[0];

        // Verificar contraseña
        const passwordMatch = await CompararContrasenias(contrasenia, user.contraseña);
        if (!passwordMatch) {
            return { status: 401, msg: 'Contraseña incorrecta' };
        }

        const token = GenerarToken({ userID: user.id });

        return { status: 200, msg: 'Inicio de sesion exitoso', token: token, username: user.nombre_usuario, id_usuario: user.id };
    } catch (error) {
        throw (error);
    } finally {
        conn.release();
    }
}