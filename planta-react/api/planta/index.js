import { ejecutarConsulta } from '../lib/db'; // Importamos la función de conexión

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const consultaSQL = 'SELECT * FROM obtener_plantas_activas();';
      const plantas = await ejecutarConsulta(consultaSQL);
      res.status(200).json(plantas);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al obtener las plantas' });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { nombrePlanta, regadoDias, fertilizadoDias, podadoDias, regadoComposta, descripcionPlanta, status } = req.body;
      const consultaSQL = `SELECT insertar_planta(
        '${nombrePlanta}', ${regadoDias}, ${fertilizadoDias}, ${podadoDias}, ${regadoComposta}, '${descripcionPlanta}', ${status}
      );`;
      const nuevaPlanta = await ejecutarConsulta(consultaSQL);
      res.status(201).json({ data: nuevaPlanta[0] });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al crear la planta' });
    }
  } 
  else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
