// lib/session.js
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "mi_app_sesion",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// Obtener sesión desde App Router
export async function getSession() {
  const cookieStore = await cookies(); // <-- aquí agregas await
  return await getIronSession(cookieStore, sessionOptions);
}

