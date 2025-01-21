import bcrypt from 'bcryptjs';
const { ROUNDS } = process.env;

export const GenerarHash = async (pwd) => {
    return bcrypt.hash(pwd, ROUNDS | 10);
}

export const CompararContrasenias = async (pwd, hash_pwd) =>{
    return bcrypt.compare(pwd, hash_pwd);
}