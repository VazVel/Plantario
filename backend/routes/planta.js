//Importación de las librerías utilizadas en el proyecto
const express = require('express'); 
const routerPlanta = express.Router();
const { ejecutarConsulta } = require('./db.js'); // Importa el método ejecutarConsulta del archivo db.js



routerPlanta.get('/', async (req, res) => {
  try {
    // Consulta SQL
    const consultaSQL = 'SELECT * FROM planta;'; // Consulta SQL 
    
    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const clientes = await ejecutarConsulta(consultaSQL); //Método ubicado en db.js

    // Responde con los datos obtenidos modificando el estado a 200
    res.status(200).send(JSON.stringify(clientes));
  } 
  /*
  Bloque para manejar un error al realizar la consulta sql
  */
  catch (error) {
    console.error('Error al manejar la solicitud:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los clientes',
    });
  }
});

module.exports = routerPlanta; //Exporta el módulo para ser utilizado en otros archivos