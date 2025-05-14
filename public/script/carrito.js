const { parse } = require("path");



//funcion para cargar los productos del carrito y mostrarlos en la pagina del carrito
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('.carrito');





    carrito.forEach(producto => {
        const articuloDiv = document.createElement('div');
        articuloDiv.classList.add('articulo');
        articuloDiv.setAttribute('data-id', producto.id);

        //html del producto con la cantidad selecionada y el precio calculado
        articuloDiv.innerHTML = `
    <div class="nombre">${producto.nombre}</div>
    <div>
        <div class="precio" id="precio">${producto.precio.toFixed(2)}</div>
        <div class="cantidad" id="cantidad">
            <button class="menos">-</button>
            <input type="number" value="${producto.cantidad}" min="1" max="${producto.stockMaximo}" data-id="${productoSeleccionado.id}">
            <button class="mas">+</button>
        </div>
        <div class="total" id="total${producto.id}">${(producto.precio * producto.cantidad).toFixed(2)}</div>
        <div class="botonEliminar">
            <button class="eliminar" data-id="${producto.id}">
                <img src="/papelera.png" alt="Eliminar" class="imgpapelera">
            </button>
        </div>
    </div>
`;

        //agregamos el articulo al contenedor del carrito
        carritoContainer.appendChild(articuloDiv);

        //inicializar los eventos ventos de cantidad y eliminacion
        inicializarEventosCarrito(producto);
    });

}

//funcion para inicializar los eventos del producto (más, menos y eliminar)
function inicializarEventosCarrito(producto) {
    //Escucha el cambio de cantidad cuando el usuario modifica el input de cantidad
    document.querySelector(`#cantidad input[data-id="${producto.id}"]`).addEventListener('input', function () {
        const cantidad = parseInt(this.value);// captura la nueva cantidad
        actualizarTotalProducto(producto, cantidad);//Actualiza el total del producto
        actualizarCarrito(producto.id, cantidad);//actualizar el carrito en el LocalStorage
    });

    //boton menos
    //Decrementa la cantidad cuando el usuario presiona el boton "menos"
    document.querySelector(`.menos[data-id="${producto.id}"]`).addEventListener('click', function () {
        const cantidadInput = document.querySelector(`#cantidad input[data-id="${producto.id}"]`);//captura el input de cantidad
        //asegura que la cantidad no sea menor que 1
        if (parseInt(cantidadInput.value) > 1) {
            //disminuimos la cantidadd
            cantidadInput.value = parseInt(cantidadInput) - 1;
            //actualiza el total del valor de los productos
            actualizarTotalProducto(producto, parseInt(cantidadInput.value));
            actualizarCarrito(producto.id, parseInt(cantidadInput.value));//actualizar el carrito en el localStorage
        }
    });

    //boton más
    //Incrmenta la cantidad cuando el usuario presiona el boton más
    document.querySelector(`.mas[data-id="${producto.id}"]`).addEventListener('click', function () {
        //captura input de cantidad
        const cantidadInput = document.querySelector(`#cantidad input[data-id="${producto.id}"]`);
        if (parseInt(cantidadInput.value) < producto.stockMaximo) {
            //nos aseguramosde que no excedemos el stock maximo
            // y aumentamos en 1 el valor del input
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
            //actualizamos el toatl del valor de la linea
            actualizarTotalProducto(producto, parseInt(cantidadInput.value));
            //actualizamos el carrito en el localStorage
            actualizarCarrito(producto.id, parseInt(cantidadInput.value));
        }
    });

    //eliminar producto
    //Elimina el producto del carrito cuando el usuario hace click en el boton eliminar
    document.querySelector(`.eliminar[data-id="${producto.id}"]`).addEventListener('click', function () {
        //llamada a la función de eliminar producto
        eliminarProductoDelCarrito(producto.id);
    });
}

//funcion para actualizar el total del producto
function actualizarTotalProducto(producto, cantidad) {
    const total = producto.precio * cantidad;
    //actualiza el texto del total
    document.querySelector(`#total${producto.id}`).textContent = total.toFixed(2);
}

//funcion para actualizar el carrito en localStorage después de cambiar la cantidad
function actualizarCarrito(id, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoIndex = carrito.findIndex(producto => producto.id === id);

    if (productoIndex > -1) {
        carrito[productoIndex].cantidad = cantidad//actualizamos la cantidad
        localStorage.setItem('carrito', JSON.stringify(carrito));//guardamos el carrito actualizado
    }
}

//función para eliminar un producto del carrito
function eliminarProductoDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    //filtramos el carrito para eliminar el producto
    carrito = carrito.filter(producto => producto.id !== id);

    //guardamos el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

//llamamos a cargarCarrito para mostrar los productos al cargar la página del carrito
cargarCarrito();