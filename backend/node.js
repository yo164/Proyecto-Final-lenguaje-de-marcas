//server.js
//importa el módulo 'express' que facilita la creación de servidores web en Node.js
const express = require('express');

//importa el módulo 'mysql2' para conectarse a la base de datos MySQL
const mysql = require('mysql2');

//Importa el módulo 'cors' que permite habilitar el interaambio de recursos entreel frontend y el backend.
const cors = require('cors');

//crea una instancia de la aplicación express.
const app = express();

//Define el puerto en el que el servidor escuchará las pticiones. En este caso, se utiliza el puerto 3000
const port = 3000;

//Usa 'cors' para permitir que las solicitudes de otros dominios(como el frontend) puedan hacer peticiones al backend.
app.use(cors());

//Conéctate a la base de datos MySQL con los detalles de la conexión (usuario, contraseña, nombre de la base de datos);
const conexion = mysql.createConnection({
    host:'localhost',
    user :'root',
    password: '',
    database: 'TiendaOnline'
});

//Verifica si la conexión  a la base de datos fue exitosa.
conexion.connect(err => {
    if(err) {
        //si hay un error, muestra el mensaje y termina el proceso.
        console.error('Error al conectar a la base de datos:',err);
        return;
    }
    //si la conexion es exitosa, muestra un mensaje.
    console.log('Conectado a la base de datos');
})

//Define una ruta que será llamada cuado el frontend quiera obtener los productos.
//'/api/productos' es al URL donde el front end puede pedir los productos al backend.
app.get('/api/productos', (req, res) => {
    //Consulta a la base de datos para obtener todos los productos.
    conexion.query('SELECT * FROM producto', (error, resultados) => {
        if(error) {
            //si ocurre un error en la consulta, responde con un error 500 y el mensajede error.
            res.status(500).json({ error: 'Error en la consulta'});
        }else{
            //Si la consulta es exitosa, respodnde con los resultados de la consulta(los productos).
            res.json(resultados);
        }
    });
});

//Configura el srvidor para que escuche las peticiones en el puerto 3000
app.listen(port, () => {
    //Muestra un mensaje en la consola cuando el servidor está escuchando correctamente.
    console.log(`Servidor escuchando en http://localhost:${port}`);
});