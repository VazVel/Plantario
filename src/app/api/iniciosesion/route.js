import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../lib/session"; // Usa alias @ si lo configuraste
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { ejecutarConsulta } from "../../../../lib/db";

export async function POST(req) {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  try {
    const { correo, password } = await req.json();

    const query = `SELECT * FROM obtener_usuario_por_correo($1);`; // Usa tu propia función
    const values = [correo];
    const resultado = await ejecutarConsulta(query, values);

    if (resultado.length === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const usuario = resultado[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Guardar datos en sesión
    session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };
    await session.save();

    return Response.json({ mensaje: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en login:", error);
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
