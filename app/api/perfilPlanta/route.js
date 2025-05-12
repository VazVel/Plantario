import { ejecutarConsulta } from '@/lib/db'; // Asegúrate de importar correctamente la función

export async function POST(req) {
  try {
    // Obtener el id_planta del cuerpo de la solicitud
    const { id_planta } = await req.json();

    console.log("ID de planta recibido:", id_planta); // Log para verificar el id recibido

    if (!id_planta) {
      return new Response(
        JSON.stringify({ error: "ID de planta no proporcionado" }),
        { status: 400 }
      );
    }

    // Sentencia SQL para obtener los datos de la planta
    const query = `
      SELECT "nombrePlanta", "regadoDias", "podadoDias", "fertilizadoDias"
      FROM planta
      WHERE "idPlanta" = $1
    `;
    const result = await ejecutarConsulta(query, [id_planta]);

    console.log("Resultado de la consulta:", result); // Log para verificar el resultado de la consulta

    // Verificar si se encontró la planta
    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: "Planta no encontrada" }),
        { status: 404 }
      );
    }

    // Si la planta fue encontrada, retornar los datos
    const planta = result[0];
    return new Response(JSON.stringify(planta), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos de la planta:", error);
    return new Response(
      JSON.stringify({ error: "Hubo un error al obtener los datos de la planta" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
    try {
      const { id_planta, nombre, regadoDias, podadoDias, fertilizadoDias } = await req.json();
  
      if (!id_planta || !nombre || !regadoDias || !podadoDias || !fertilizadoDias) {
        return new Response(
          JSON.stringify({ error: "Faltan datos requeridos para la actualización" }),
          { status: 400 }
        );
      }
  
      // Sentencia SQL para actualizar los datos de la planta
      const query = `
        UPDATE planta
        SET "nombrePlanta" = $1, "regadoDias" = $2, "podadoDias" = $3, "fertilizadoDias" = $4
        WHERE "idPlanta" = $5
        RETURNING "nombrePlanta", "regadoDias", "podadoDias", "fertilizadoDias";
      `;
  
      const result = await ejecutarConsulta(query, [
        nombre,
        regadoDias,
        podadoDias,
        fertilizadoDias,
        id_planta,
      ]);
  
      if (result.length === 0) {
        return new Response(
          JSON.stringify({ error: "Planta no encontrada" }),
          { status: 404 }
        );
      }
  
      // Devuelve los datos actualizados
      return new Response(JSON.stringify(result[0]), { status: 200 });
    } catch (error) {
      console.error("Error al actualizar la planta:", error);
      return new Response(
        JSON.stringify({ error: "Error al actualizar los datos de la planta" }),
        { status: 500 }
      );
    }
  }

  