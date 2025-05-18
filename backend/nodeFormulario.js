// formularioServer.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const util = require('util');

const app = express();
const port = 3001; // Puerto distinto al otro backend

app.use(cors({}));
app.use(express.json()); // Necesario para leer req.body como JSON

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendaonline'
});

//promisify para poder usar await sobre conexionquery
const query = util.promisify(conexion.query).bind(conexion);

conexion.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos desde formularioServer.js');
});

// Ruta para guardar datos del formulario
app.post('/api/registro', async (req, res) => {
    const {
        nombre, apellido1, apellido2,
        telefono, mail, nombreUsuario, contrasena,
        tipoVia, nombreVia, numero,
        escalera, piso, puerta, poblacion,
        provincia, codigoPostal, metodoPago
    } = req.body;

    // Validación rápida
    if (!nombre || !apellido1 || !apellido2 || !telefono || !mail ||
        !tipoVia || !nombreVia || !numero || !escalera || !piso ||
        !puerta || !codigoPostal || !poblacion || !provincia || !metodoPago) {
        return res.status(400).json({ mensaje: 'Faltan campos en el formulario' });
    }




    try {
        //insertar cliente
        const insertCliente = `
    INSERT INTO cliente
      (nombre, apellido1, apellido2, telefono, email, nombreUsuario, contrasena)
      VALUES(?, ?, ?, ?, ?, ?, ?);
  `;
        const resultadoCliente = await query(insertCliente, [
            nombre, apellido1, apellido2, telefono, mail, nombreUsuario, contrasena
        ]);

        const idCliente = resultadoCliente.insertId;

        //insertar metodo de pago
        const insertPago = `
          INSERT INTO cliente_metodopago
            (idCliente, idMetodoPago)
          VALUES (?, ?);
        `;

        await query(insertPago, [
            idCliente, metodoPago
        ]);

        //insertar direccion
        const insertDireccion = `
        INSERT INTO direccion
            (tipoVia, nombreVia, numero, escalera, piso, puerta,
            cp, poblacion, provincia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const resultadoDireccion = await query(insertDireccion, [
            tipoVia, nombreVia, numero, escalera, piso, puerta,
            codigoPostal, poblacion, provincia
        ]);

        const idDireccion = resultadoDireccion.insertId;

        //insertar cliente y direccion
        const insertClienteDireccion = `
        INSERT INTO cliente_direccion
            (idCliente, idDireccion)
        VALUES (?, ?)    
        `;
        await query(insertClienteDireccion, [
            idCliente, idDireccion
        ]);
        


            // Todo OK
            res.status(201).json({ mensaje: 'Registro guardado con éxito', idCliente });
    
    } catch (error) {
        console.error('error en el registro:   **  ', error);
        res.status(500).json({mensaje: 'Error al procesar el registro mierda mierda mierda'});
}

});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`formularioServer.js escuchando en http://localhost:${port}`);
});


