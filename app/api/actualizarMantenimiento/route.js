import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../lib/session";
import { ejecutarConsulta } from "@/lib/db";

export async function POST(req) {
  const session = await getIronSession(req, {}, sessionOptions);

  if (!session.user?.id) {
    return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
  }

  try {
    const { idPlanta, tipo } = await req.json();

    if (!["riego", "fertilizacion", "podado"].includes(tipo)) {
      return NextResponse.json({ error: "Tipo de mantenimiento inválido" }, { status: 400 });
    }

    const query = `SELECT mantenimiento_planta($1, $2) AS mensaje;`;
    const values = [idPlanta, tipo];

    const resultado = await ejecutarConsulta(query, values);
    const mensaje = resultado[0]?.mensaje || "Mantenimiento actualizado correctamente";

    return NextResponse.json({ mensaje });
  } catch (error) {
    console.error("Error al actualizar mantenimiento:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
