// app/api/cerrarSesion/route.js
import { NextResponse } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../lib/session"; // Importa solo las opciones, no getSession()

export async function POST(req) {
  const res = new NextResponse(); // Creamos una respuesta

  const session = await getIronSession(req, res, sessionOptions);

  if (session) {
    await session.destroy();
    return NextResponse.json({ mensaje: "Sesión cerrada correctamente" });
  }

  return NextResponse.json({ error: "No se pudo cerrar la sesión" }, { status: 500 });
}
