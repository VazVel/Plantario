import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Asegúrate de usar variables de entorno
});

/**
 * Ejecuta una consulta en la base de datos.
 * @param {string} consultaSQL - La sentencia SQL a ejecutar.
 * @param {Array} valores - Los valores a insertar en la consulta.
 * @returns {Promise<Array>} - Devuelve las filas obtenidas de la consulta.
 */
export async function ejecutarConsulta(consultaSQL, valores = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(consultaSQL, valores);
    return result.rows;
  } catch (error) {
    console.error('Error al ejecutar consulta:', error);
    throw error;
  } finally {
    client.release(); // Libera la conexión
  }
}
