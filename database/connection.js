///crear coneccion de dabase de datos con mysql tomar variables de entorno

import { createConnection } from 'mysql2';
const connection = createConnection({   //coneccion de dabase de datos con mysql tomar variables de entorno
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
connection.connect(err => {
    if (err) {
        console.log(`${err}`);
        return;
    }
    console.log(`Connected to database ${process.env.DB_DATABASE}`);
});

    

export default connection;