async function cargarCSV() {
    try {

        const respuesta = await fetch("./datos.csv");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo CSV");
        }

        const texto = await respuesta.text();

        const lineas = texto.trim().split(/\r?\n/);

        const encabezados = lineas[0].split(",");

        const cuerpos = lineas.slice(1);

        const tbody = document.querySelector("#tablaUsuarios tbody");

        cuerpos.forEach(linea => {

            const columnas = linea.split(",");

            if (columnas.length === encabezados.length) {

                const fila = document.createElement("tr");

                columnas.forEach(dato => {

                    const celda = document.createElement("td");
                    celda.textContent = dato.trim();

                    fila.appendChild(celda);
                });

                tbody.appendChild(fila);
            }
        });

    } catch (error) {

        console.error("Error al cargar el archivo CSV:", error);

    }
}

cargarCSV();