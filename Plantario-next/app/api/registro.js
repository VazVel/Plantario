import { ejecutarConsulta } from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nombre, nickname, apellidoP, apellidoM, correo, password } = req.body;

      if (!nombre || !nickname || !apellidoP || !apellidoM || !correo || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const consultaSQL = `
        SELECT registrousuario(
          '${nombre}'::VARCHAR,
          '${nickname}'::VARCHAR,
          '${apellidoP}'::VARCHAR,
          '${apellidoM}'::VARCHAR,
          '${correo}'::VARCHAR,
          '${hashedPassword}'::VARCHAR
        );
      `;

      const resultado = await ejecutarConsulta(consultaSQL);

      res.status(201).json({ message: 'Usuario registrado exitosamente', data: resultado[0] });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}