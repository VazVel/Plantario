//Importación de las librerías utilizadas en el proyecto
const express = require('express'); 
const routerPlanta = express.Router();
const { ejecutarConsulta } = require('./db.js'); // Importa el método ejecutarConsulta del archivo db.js



routerPlanta.get('/', async (req, res) => {
  try {
    // Consulta SQL
    const consultaSQL = 'SELECT * FROM obtener_plantas_activas();'; // Consulta SQL 
    
    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const planta = await ejecutarConsulta(consultaSQL); //Método ubicado en db.js

    // Responde con los datos obtenidos modificando el estado a 200
    res.status(200).send(JSON.stringify(planta));
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

routerPlanta.get('/:id', async (req, res) => {
  const { id } = req.params; // Obtén el parámetro dinámico de la URL

  try {
    const consultaSQL = `SELECT * FROM obtener_planta_por_id(${id});`; // Consulta SQL 

    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const planta = await ejecutarConsulta(consultaSQL);

    if (planta.length === 0) {
      // Si no se encuentra la planta, responde con un 404
      return res.status(404).json({
        message: `Cliente con id ${id} no encontrado`,
      });
    }
    // Responde con los datos obtenidos modificando el estado a 200
    res.status(200).json({
      data: planta[0], // Devuelve el primer (y único) registro
    });
  } 
  /*
    Bloque para manejar un error al realizar la consulta sql
  */
  catch (error) {
    console.error('Error al manejar la solicitud:', error.message || error);
    res.status(500).json({
      message: 'Error al obtener el cliente',
    });
  }
});

routerPlanta.post('/', async (req, res) => {
  // Se define una constante donde se extrae los datos del cuerpo de la solicitud
  const {
    nombrePlanta,
    regadoDias,
    fertilizadoDias,
    podadoDias,
    regadoComposta,
    descripcionPlanta,
    status
  } = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud

  try {
    // Consulta SQL para insertar un nuevo cliente, se utiliza los atributos definidos anteriormente
    const consultaSQL = `SELECT insertar_planta(
      '${nombrePlanta}'::VARCHAR,
      ${regadoDias}::INT4,
      ${fertilizadoDias}::INT4,
      ${podadoDias}::INT4,
      ${regadoComposta}::INT4,
      '${descripcionPlanta}'::VARCHAR,
      ${status}::INT2);`;

    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const nuevoCliente = await ejecutarConsulta(consultaSQL,);
    
    // Responde con los datos obtenidos modificando el estado a 201
    res.status(201).json({
      data: nuevoCliente[0], // Retornamos el cliente recién creado
    });
  } 
  /*
    Bloque para manejar un error al realizar la consulta sql
  */
  catch (error) {
    console.error('Error al crear cliente:', error.message || error);
    res.status(500).json({
      message: 'Error al crear la planta',
    });
  }
});

//Se define el router para que el cliente pueda ingresar el id_cliente en la URL
routerPlanta.put('/:id', async (req, res) => {
    
  const { id } = req.params; // Obtiene el id_cliente de los parámetros de la URL

  // Se define una constante donde se extrae los datos del cuerpo de la solicitud
  const {
    nombrePlanta,
    regadoDias,
    fertilizadoDias,
    podadoDias,
    regadoComposta,
    descripcionPlanta,
    status
  } = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud

  try {
    // Consulta SQL para insertar un nuevo cliente, se utiliza los atributos definidos anteriormente
    const consultaSQL = `SELECT update_planta(${id}::INT4,
     '${nombrePlanta}'::VARCHAR,
      ${regadoDias}::INT4,
       ${fertilizadoDias}::INT4,
        ${podadoDias}::INT4,
         ${regadoComposta}::INT4,
          '${descripcionPlanta}'::VARCHAR,
           ${status}::INT2);`;
    
    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const resultado = await ejecutarConsulta(consultaSQL);
    /*
    En caso de que la respuesta tenga un longitud de 0, 
    significa que no funciono de manera correcta la ejecución en la base de datos
    */
    if (resultado.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Planta con id ${id} no encontrado`,
      });
    }
    // Responde con los datos obtenidos en la consulta y un mensaje de exito
    res.json({
      message: 'Planta actualizado exitosamente',
      data: resultado[0],
    });
  } 
  /*
    Bloque para manejar un error al realizar la consulta sql
  */
  catch (error) {
    console.error('Error al actualizar Planta:', error.message || error);
    res.status(500).json({
      message: 'Error al actualizar Planta',
    });
  }
});

routerPlanta.delete('/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el id_cliente de los parámetros de la URL

  try {
    //Se define la consulta en una constante
    const consultaSQL = `SELECT delete_planta(${id});`;
    
    /* 
      Función ejecutarConsulta()
      Función para realizar la consulta a la base de datos
      Recibe sentencias en SQL
    */
    const resultado = await ejecutarConsulta(consultaSQL);
    
    /*
    En caso de que la respuesta tenga un longitud de 0, 
    significa que no funciono de manera correcta la ejecución en la base de datos
    */
    if (resultado.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Planta con id ${id} no encontrado`,
      });
    }
    
    // Responde con los datos obtenidos en la consulta y un mensaje de exito
    res.json({
      success: true,
      message: `Planta con id ${id} eliminado exitosamente`,
      data: resultado[0],
    });
  } 
  /*
    Bloque para manejar un error al realizar la consulta sql
  */
    catch (error) {
    console.error('Error al eliminar la planta:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la planta',
    });
  }
});



module.exports = routerPlanta; //Exporta el módulo para ser utilizado en otros archivos