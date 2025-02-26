//Se importa de la libreria pg, pool el cual es utilizado para realizar la conexión a la base de datos
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos en la nube
const pool = new Pool({
  connectionString: "postgres://neondb_owner:npg_TjlbCXo7Q5FU@ep-morning-feather-a5zoezbz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

/* 
Metodo ejecutarConsulta
Proposito: Método para realizar las consultas a la base de datos
Parametro de entrada: Sentencia en sql
Parametro de salida: Respuesta de la ejecución en la base de datos
Ejecución: Para ejecutarse se tiene que importar en el archivo const { ejecutarConsulta } = require('./db');
En código se llama ejecutarConsulta("Ingresar sentencia sql")
*/
const ejecutarConsulta = async (consultaSQL) => {
  try {
    const result = await pool.query(consultaSQL);
    return result.rows; // Devuelve las filas obtenidas
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message || error);
    throw error; // Propaga el error para manejarlo en otros lugares
  }
};

//Exporta el método ejecutarConsulta para que sea utilizado en otros archivos

module.exports = {
  ejecutarConsulta,
};