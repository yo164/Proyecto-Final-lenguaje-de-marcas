
//modal y boton
const modal2 = document.getElementById('modal');
const btnIniciarSesion = document.getElementById('iniciarSesion');

//inputs
const inputNombreUsuario = document.getElementById('nombreUsuario');
const inputContrasena = document.getElementById('contrasena');


//abrir mensaje de inicio de sesion
let mensajeEl = document.getElementById('mensaje Login');
if (!mensajeEl) {
    mensajeEl = document.createElement('p');
    mensajeEl.id = 'mensajeLogin';
    mensajeEl.style.marginTop = '10px';
    modal2.appendChild(mensajeEl);
}

//validaciond e campos vacios (yalo hace el required pero mas mejor)

function validarCampos(usuario, contrasena) {
  if (!usuario || !contrasena) {
    mensajeEl.textContent = 'Por favor completa todos los campos.';
    mensajeEl.style.color = 'red';
    return false;
  }
  return true;
}

//funcion asincrona para la llamada
async function enviarLogin(usuario, contrasena) {
    try {
        const respuesta = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreUsuario: usuario, contrasena})
        });

        const data = await respuesta.json();

        if(!respuesta.ok) {

            mensajeEl.textContent = data.mensaje || 'Error al iniciar sesión.';
            mensajeEl.style.color = 'red';
            return null;
        }

        //login correcto
        mensajeEl.textContent = data.mensaje;
        mensajeEl.style.color = 'green';
        return data.usuario;//id cliente nombre, nobre usuario(lo del back end del res status200)
    } catch (error) {
        mensajeEl.textContent = 'No se pudo conectar con el servidor.';
        mensajeEl.style.color = 'red';
        return null;
    }
}

// manejar evento de iniciar sesion
btnIniciarSesion.addEventListener('click', async () => {
    const usuario = inputNombreUsuario.value.trim();
    const contrasena = inputContrasena.value;

    if(!validarCampos(usuario, contrasena)){
        return;
    }

    const usuarioData = await enviarLogin(usuario, contrasena);
    if (!usuarioData) {
        return;
        
    }

    setTimeout(() => {
        modal2.close();
    }, 1000);
});

//front end de iniciode sesion

