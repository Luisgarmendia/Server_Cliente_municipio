///importar archivo loadenv.js
import './loadenv.js';
///importamos aerchivo de coneccion a la base de datos
import cnn from  './database/connection.js';
///crear un sewrvidor express simple con ruta inicial
//crear una ruta para el home
import express from 'express';
//importacion para sesiones de usuario
import sessions from 'express-session';

///importamos el rutas de la carpetas routes
import routes from './routes/routes.js';
///importamos el rutas de la carpetas routes clinetes
import routesClientes from './routes/cliente.routes.js';
import routesMunicipio from './routes/municipio.routes.js';

///importamos cookie parser
import cookieParser from 'cookie-parser';

import {logger,isAuthenticated} from './controller/authController.js';
///creamos una variable para el servidor
const app = express();
///set vistas de la carpeta views
app.set('view engine', 'pug');
/* ------------------------ Asignar archivos publicos ----------------------- */
app.use(express.static('public'));

const oneDay = 24 * 60 * 60 * 1000;
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: oneDay, secure: false} 
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
///configurando express para usar el cookie parser
app.use(cookieParser());

///importamos el puerto
const PORT = 3000;

app.use(logger);
/* ----------------------------- Rutas nombradas ---------------------------- */
///usamos las rutas
app.use('/',routes);
app.use('/clientes',isAuthenticated,routesClientes);
app.use('/municipios',isAuthenticated,routesMunicipio);

/* ------------------- escuchar servidor en el puerto 3000 ------------------ */
app.listen(PORT,()=>{
    console.log(`listening on port http://localhost:${PORT}`);
});