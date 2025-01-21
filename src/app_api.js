import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/router.js';

// configuracion de cors
const conf_cors = cors();

// configuracion de dotenv
dotenv.config();

// configuracion de express
const app = express();
app.use(conf_cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

// configuracion de donde saldra y demas
const { PORT, URL_API } = process.env;

app.listen(PORT ?? 3002, () => {
    console.log(`Servidor corriendo en el puerto ${PORT ?? 3002}`);
    console.log(`http://${URL_API ?? 'localhost'}:${PORT ?? 3002}`);
});