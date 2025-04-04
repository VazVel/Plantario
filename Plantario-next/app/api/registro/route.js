import { ejecutarConsulta } from "../../../lib/db"; // Asegúrate de que la ruta sea correcta
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { apellido1, apellido2, apodo, correo, nombre, password } = await req.json();

    // Validaciones básicas
    if (!nombre || !apellido1 || !apellido2 || !correo || !password) {
      return new Response(JSON.stringify({ error: "Todos los campos son obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

    // Insertar el usuario en la base de datos
    const query = `SELECT * FROM registrousuario($1, $2, $3, $4, $5, $6);`;
    const values = [nombre, apodo, apellido1, apellido2, correo, hashedPassword];
    const nuevoUsuario = await ejecutarConsulta(query, values);

    return new Response(JSON.stringify(nuevoUsuario[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
