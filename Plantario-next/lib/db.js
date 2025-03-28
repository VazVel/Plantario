import { Pool } from 'pg';

// Configuración de la base de datos
const pool = new Pool({
  connectionString: "postgres://neondb_owner:npg_TjlbCXo7Q5FU@ep-morning-feather-a5zoezbz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require", // Usa variables de entorno
});

/**
 * Ejecuta una consulta en la base de datos.
 * @param {string} consultaSQL - La sentencia SQL a ejecutar.
 * @returns {Promise<Array>} - Devuelve las filas obtenidas de la consulta.
 */
export async function ejecutarConsulta(consultaSQL) {
  const client = await pool.connect();
  try {
    const result = await client.query(consultaSQL);
    return result.rows;
  } catch (error) {
    console.error('Error al ejecutar consulta:', error);
    throw error;
  } finally {
    client.release(); // Libera la conexión
  }
}