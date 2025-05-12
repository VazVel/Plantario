import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../lib/session";
import { ejecutarConsulta } from "../../../../lib/db";

export async function GET(req) {
  const session = await getIronSession(req, {}, sessionOptions);

  if (!session.user?.id) {
    return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
  }

  try {
    const consultaSQL = `SELECT * FROM obtener_plantas_por_usuario($1)`;
    const valores = [session.user.id];

    const resultado = await ejecutarConsulta(consultaSQL, valores);
    return NextResponse.json({ plantas: resultado });
  } catch (error) {
    console.error("Error al obtener plantas:", error);
    return NextResponse.json({ error: "Error al obtener las plantas" }, { status: 500 });
  }
}
