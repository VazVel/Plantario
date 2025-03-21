import { ejecutarConsulta } from '../lib/db'; // Importamos la función de conexión

export default async function handler(req, res) {
  const { id } = req.query; // Obtiene el ID de la URL

  if (req.method === 'GET') {
    try {
      const consultaSQL = `SELECT * FROM obtener_planta_por_id(${id});`;
      const planta = await ejecutarConsulta(consultaSQL);
      if (planta.length === 0) {
        return res.status(404).json({ message: `Planta con id ${id} no encontrada` });
      }
      res.status(200).json({ data: planta[0] });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la planta' });
    }
  } 
  else if (req.method === 'PUT') {
    try {
      const { nombrePlanta, regadoDias, fertilizadoDias, podadoDias, regadoComposta, descripcionPlanta, status } = req.body;
      const consultaSQL = `SELECT update_planta(${id}, '${nombrePlanta}', ${regadoDias}, ${fertilizadoDias}, ${podadoDias}, ${regadoComposta}, '${descripcionPlanta}', ${status});`;
      const resultado = await ejecutarConsulta(consultaSQL);
      if (resultado.length === 0) {
        return res.status(404).json({ message: `Planta con id ${id} no encontrada` });
      }
      res.json({ message: 'Planta actualizada', data: resultado[0] });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la planta' });
    }
  } 
  else if (req.method === 'DELETE') {
    try {
      const consultaSQL = `SELECT delete_planta(${id});`;
      const resultado = await ejecutarConsulta(consultaSQL);
      if (resultado.length === 0) {
        return res.status(404).json({ message: `Planta con id ${id} no encontrada` });
      }
      res.json({ message: `Planta con id ${id} eliminada`, data: resultado[0] });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la planta' });
    }
  } 
  else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
