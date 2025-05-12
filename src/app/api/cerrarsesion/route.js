import { NextResponse } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../../lib/session";

export async function POST(req) {
  const response = new Response(); // ✅ Web Response estándar
  const session = await getIronSession(req, response, sessionOptions);

  await session.destroy(); // ✅ Elimina la cookie de sesión

  const nextResponse = NextResponse.json({ mensaje: "Sesión cerrada correctamente" });

  // Copia los headers generados por iron-session (para eliminar la cookie)
  response.headers.forEach((value, key) => {
    nextResponse.headers.set(key, value);
  });

  return nextResponse;
}
