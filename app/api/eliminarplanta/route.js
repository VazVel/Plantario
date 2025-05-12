// app/api/eliminarPlanta/route.js
import { ejecutarConsulta } from '@/lib/db'; // Asegúrate de importar correctamente la función

export async function POST(req) {
  try {
    const { id_planta } = await req.json(); // Obtener el id de la planta desde la solicitud

    if (!id_planta) {
      return new Response(
        JSON.stringify({ error: "ID de planta no proporcionado" }),
        { status: 400 }
      );
    }

    // Sentencia SQL para actualizar el estado de la planta a 0 (eliminado)
    const query = `
      UPDATE planta
      SET "status" = 0
      WHERE "idPlanta" = $1
      RETURNING "idPlanta";
    `;

    const result = await ejecutarConsulta(query, [id_planta]);

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: "Planta no encontrada" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Planta eliminada correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la planta:", error);
    return new Response(
      JSON.stringify({ error: "Error al eliminar la planta" }),
      { status: 500 }
    );
  }
}
