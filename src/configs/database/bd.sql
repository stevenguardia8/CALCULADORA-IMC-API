CREATE DATABASE IF NOT EXISTS calculadora_imc;

USE calculadora_imc;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `calculadora_imc`.`usuarios` (`email`, `contraseña`, `nombre_usuario`) VALUES ('guest@guest', '  ', 'guest');

CREATE TABLE IF NOT EXISTS tipos_de_calculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

INSERT INTO `calculadora_imc`.`tipos_de_calculo` (`tipo`, `descripcion`) VALUES ('BMI', 'Calculo del índice de masa corporal (IMC) o BMI (por sus siglas en inglés)');
INSERT INTO `calculadora_imc`.`tipos_de_calculo` (`tipo`, `descripcion`) VALUES ('IGC', 'Calculo del índice de grasa corporal (IGC) es la proporción de grasa que tiene una persona en relación con su peso total');

CREATE TABLE IF NOT EXISTS registros_operaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, -- ID del usuario que realizó el cálculo
    tipo_calculo_id INT NOT NULL, -- Referencia al tipo de cálculo (BMI, IGC, etc.)
    peso DECIMAL(5,2), -- Peso en kilogramos
    altura DECIMAL(5,2), -- Altura en metros
    cintura DECIMAL(5,2) DEFAULT NULL, -- Medida de la cintura en centímetros
    cadera DECIMAL(5,2) DEFAULT NULL, -- Medida de la cadera en centímetros
    cuello DECIMAL(5,2) DEFAULT NULL, -- Medida del cuello en centímetros
    genero ENUM('M', 'F') DEFAULT NULL, -- Género: 'M' (masculino) o 'F' (femenino)
    resultado DECIMAL(5,2), -- Resultado del cálculo (BMI o IGC)
    fecha_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora del cálculo
    FOREIGN KEY (tipo_calculo_id) REFERENCES tipos_de_calculo(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
