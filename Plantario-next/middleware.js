// middleware.js
import { NextResponse } from 'next/server';
import { getSession } from './lib/session'; // Asegúrate de que el path sea correcto

export async function middleware(req) {
  const session = await getSession(req);  // Obtener la sesión

  // Si no hay sesión, redirigir a la página de inicio
  if (!session?.user) {
    return NextResponse.redirect(new URL('/inicio', req.url)); // Redirige a /inicio si no hay sesión
  }

  return NextResponse.next();  // Si hay sesión, permitir que la solicitud continúe
}

export const config = {
  matcher: ['/base', '/inventario', '/registro'],  // Rutas que necesitan estar protegidas
};
