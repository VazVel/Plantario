// app/api/obtenerPlantasNecesitanMantenimiento/route.js
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../lib/session";
import { ejecutarConsulta } from "../../../../lib/db";

export async function POST(req) {
  const session = await getIronSession(req, {}, sessionOptions);

  if (!session.user?.id) {
    return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
  }

  try {

    const query = `SELECT * FROM obtener_plantas_para_mantenimiento($1);`;
    const values = [session.user.id];

    const resultado = await ejecutarConsulta(query, values);
    return NextResponse.json({ plantas: resultado });
  } catch (error) {
    console.error("Error al obtener plantas:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
