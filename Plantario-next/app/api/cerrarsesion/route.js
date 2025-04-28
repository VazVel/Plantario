// app/api/cerrarSesion/route.js
import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/session';  // Asegúrate de importar correctamente la función getSession

export async function POST(req) {
  const session = await getSession();  // Obtener la sesión actual

  if (session) {
    // Eliminar la sesión
    await session.destroy();
    return NextResponse.json({ mensaje: "Sesión cerrada correctamente" });
  }

  return NextResponse.json({ error: "No se pudo cerrar la sesión" }, { status: 500 });
}
