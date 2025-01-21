/*
 * Calculos para el BMI 
*/

export const Calcular_BMI = (weight, height) => {
    const alturaEnMetros = height / 100; // conversion de cm a m
    const BMI = weight / Math.pow(alturaEnMetros, 2);
    return BMI.toFixed(2); // Redondeo a dos decimales ej. 2.12
}

export const ObtenerCategoria_BMI = (BMI) => {
    if (BMI < 18.5) return 'Bajo peso';
    if (BMI >= 18.5 && BMI < 24.9) return 'Normal';  
    if (BMI >= 25 && BMI < 29.9) return 'Sobrepeso'; 
    if (BMI >= 30 && BMI < 34.9) return 'Obesidad leve';  
    if (BMI >= 35 && BMI < 39.9) return 'Obesidad moderada';
    return 'Obesidad severa';  // Para BMI >= 40
}

export const ObtenerRecomendaciones_BMI = (categoria) => {
    const recomendaciones = {
        'Bajo peso': 'Asegúrate de incluir proteínas magras, grasas saludables y carbohidratos complejos en tus comidas. Consulta a un nutricionista para garantizar un aumento de peso adecuado.',
        'Normal': 'Mantén el equilibrio con una dieta rica en frutas, verduras, proteínas magras y grasas saludables. No olvides realizar chequeos médicos regulares para controlar tu salud.',
        'Sobrepeso': 'Prioriza alimentos integrales y naturales, limita los azúcares añadidos y las grasas saturadas, y practica actividades como caminar, nadar o yoga para mejorar tu resistencia y bienestar.',
        'Obesidad leve': 'Enfócate en crear hábitos sostenibles, como comer despacio, beber suficiente agua y evitar alimentos ultraprocesados. Considera trabajar con un nutricionista para un enfoque personalizado.',
        'Obesidad moderada': 'Adopta un enfoque gradual para mejorar tu bienestar, con una dieta balanceada y ejercicio regular. Consulta con un profesional de la salud para desarrollar un plan adecuado.',
        'Obesidad severa': 'Es fundamental trabajar con un equipo médico para abordar la obesidad severa. Focalízate en cambios de estilo de vida graduales y considera un enfoque integral con apoyo profesional.'
    };
    
    return recomendaciones[categoria] || 'Categoría no reconocida. Por favor, proporciona una categoría válida para recibir una recomendación.';
}

/*
 * Calculos para el IGC 
*/

export const Calcular_IGC = (waist, hip, neck, height, gender) => {
    let igc;
    if (gender === 'male') {
        igc = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else if (gender === 'female') {
        igc = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
    return parseFloat(igc.toFixed(2)); // Devolvemos un numero de dos decimales ej. 20.21
}

export const ObtenerCategoria_IGC = (IGC, gender) => {
    if (gender === 'male') {
        if (IGC < 6) return 'Esencial para la vida';
        if (IGC <= 13) return 'Atletas';
        if (IGC <= 17) return 'Fitness';
        if (IGC <= 24) return 'Aceptable';
        if (IGC <= 30) return 'Sobrepeso'; 
        return 'Obesidad';
    } else {
        if (IGC < 10) return 'Esencial para la vida';
        if (IGC <= 20) return 'Atletas';
        if (IGC <= 24) return 'Fitness';
        if (IGC <= 31) return 'Aceptable';
        if (IGC <= 35) return 'Sobrepeso';
        return 'Obesidad';
    }
}

export const ObtenerRecomendaciones_IGC = (categoria) => {
    const recomendaciones = {
        'Esencial para la vida': 'Prioriza alimentos ricos en nutrientes, consume suficiente agua, y asegúrate de ingerir las calorías necesarias para respaldar las funciones vitales de tu cuerpo. Considera realizar chequeos médicos periódicos.',
        'Atletas': 'Optimiza tu rendimiento con una dieta rica en carbohidratos complejos, proteínas magras y grasas saludables. No olvides incluir tiempo para la recuperación y el sueño adecuado.',
        'Fitness': 'Complementa tus entrenamientos con una dieta balanceada que incluya una variedad de frutas, verduras, proteínas y grasas saludables. Establece metas claras para mantenerte motivado.',
        'Aceptable': 'Evalúa tu rutina diaria y busca oportunidades para integrar más actividad física, como caminatas o ejercicios simples. Mantén una alimentación basada en alimentos naturales.',
        'Sobrepeso': 'Considera ajustar tu dieta y aumentar gradualmente tu actividad física para mejorar tu salud. Prioriza alimentos frescos y naturales, y busca apoyo profesional si es necesario.',
        'Obesidad': 'Trabaja en crear hábitos sostenibles, como controlar las porciones, elegir alimentos integrales y aumentar gradualmente la actividad física. Busca el apoyo de un profesional de la salud para orientación personalizada.'
    };
    return recomendaciones[categoria] || 'Categoría no reconocida. Por favor, proporciona una categoría válida para recibir una recomendación.';
}

/*
 * Decisiones para saber genero
*/

export const ObtenerGeneroLetra = (gender) => {
    return gender === 'Male' ? 'M' : 'F';
}