//bacend inicio de sesión

const express = require('express');

const mysql = require('mysql2');

const cors = require('cors');

const app = express();

const port = 3002;

const util = require('util');

app.use(cors({}));
app.use(express.json());

//conexion a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendaonline'
});

const query = util.promisify(conexion.query).bind(conexion);

conexion.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
        return;
    }

    console.log('Conectado a la base de datos!!');
});

app.post('/api/login', async (req, res) => {
    const{ nombreUsuario, contrasena} = req.body;

    if(!nombreUsuario || !contrasena){
        return res.status(400).json({mensaje: 'Faltan campos: usuario o contraseña'});
    }

    try {
        
        const consulta = `
        SELECT * FROM cliente
        WHERE nombreUsuario = ?;
        `
        const resultado = await query (consulta, [nombreUsuario]);

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: 'El usuario no existe'});
        }

        const usuario = resultado[0];

        if(usuario.contrasena !== contrasena){
            return res.status(401).json({mensaje: 'Contraseña incorrecta se ruega no piratear'});
        }

        //si todo va bien
        res.status(200).json({
            mensaje: 'Inicio de sesión correcto',
            usuario: {
                idCliente: usuario.idCliente,
                nombre: usuario.nombre,
                nombreUsuario: usuario.nombreUsuario
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({mensaje:'Error interno del servido'});
    }
});


app.listen(port, () => {
    console.log(`im lisenin beibi an nobadi lon taninooooo en http://localhost:${port}`);
});