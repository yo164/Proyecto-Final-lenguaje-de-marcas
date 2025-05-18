document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioRegistro');

    formulario.addEventListener('submit', async (e) => {
        //previene de recargar pagina
        e.preventDefault();


        //se recogen los datos del formulario
        const datosFormulario = new FormData(formulario);
        const datos = Object.fromEntries(datosFormulario.entries());


        //comprobación técnica
        console.log('Datos enviados correctamente', datos);

        try {
            const respuesta = await fetch('http://localhost:3001/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert('Formulario enviado correctamente');
                //limpiamos el formulario
                formulario.reset();
            } else {
                alert('Error al enviar el formulario: ' + resultado.mensaje);
            }

        } catch (error) {
            console.error('Error en la petición:' , error);
            alert('Error en el servidor o en la conexión');
        }
    });
})