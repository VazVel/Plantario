import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../lib/session";
import { ejecutarConsulta } from "../../../../lib/db";

// POST /api/registrar-planta
export async function POST(req) {
    const session = await getIronSession(req, {}, sessionOptions);
  
    // Verifica que session.user exista, y no session.usuario
    if (!session.user || !session.user.id) {
      return NextResponse.json({ error: "Usuario no autentificado" }, { status: 401 });
    }

  try {
    const { nombre, regadoDias, fertilizadoDias, podadoDias } = await req.json();

    const consultaSQL = `SELECT registrar_planta($1, $2, $3, $4, $5)`;
    const valores = [nombre, regadoDias, fertilizadoDias, podadoDias, session.user.id];

    await ejecutarConsulta(consultaSQL, valores);

    return NextResponse.json({ mensaje: "Planta registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar planta:", error);
    return NextResponse.json({ error: "Error al registrar la planta" }, { status: 500 });
  }
}
