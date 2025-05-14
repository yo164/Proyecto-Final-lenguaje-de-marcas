const { parse } = require("path");

//simulacion de base de datos
const productos = [
    { id: 1, nombre: "Articulo 1", precio: 10.00, stockMaximo: 10 },
    { id: 2, nombre: "Articulo 2", precio: 15.00, stockMaximo: 5 },
    { id: 3, nombre: "Articulo 3", precio: 20.00, stockMaximo: 8 }
];


//funcion para agregar productos al carrito
function agregarAlcarrito(id, cantidadSelecionada = 1) {//cantidad selecionada como ejemplo aqui iria la variable que capture el valor del input del botón
    //buscar el producto seleccionado en nuestar "base de datos"
    const productoSeleccionado = productos.find(producto => producto.id === id);

    //si el producto existe, lo agregamos al carrito
    if (productoSeleccionado) {
        //Creamos la estructura HTML para el producto en el carrito
        //nuevo div para el articulo
        const articuloDiv = document.createElement('div');
        //agregar la clase'articulo para los estilos
        articuloDiv.classList.add('articulo');
        //usamos data-id para identificar el producto
        articuloDiv.setAttribute('data-id', productoSeleccionado.id);

        //html del producto con la cantidad selecionada y el precio calculado
        articuloDiv.innerHTML = `
    <div class="nombre">${productoSeleccionado.nombre}</div>
    <div>
        <div class="precio" id="precio">${productoSeleccionado.precio}</div>
        <div class="cantidad" id="cantidad">
            <button class="menos">-</button>
            <input type="number" value="${cantidadSelecionada}" min="1" max="${productoSeleccionado.stockMaximo}" data-id="${productoSeleccionado.id}">
            <button class="mas">+</button>
        </div>
        <div class="total" id="total${productoSeleccionado.id}">${productoSeleccionado.precio}</div>
        <div class="botonEliminar">
            <button class="eliminar" data-id="${productoSeleccionado.id}">
                <img src="/papelera.png" alt="Eliminar" class="imgpapelera">
            </button>
        </div>
    </div>
`;

//añadimos el nuevo producto al carrito (al contenedor de productos(.articulo))
document.querySelector('.carrito').appendChild(articuloDiv);
    }

    //agregar eventos de cantidad y eliminacion
    inicializarEventosCarrito(productoSeleccionado);
}

//funcion para inicializar los eventos del producto (más, menos y eliminar)
function inicializarEventosCarrito(producto) {
    //incrementar cantidad
    //Escucha el cambio de cantidad cuando el usuario modifica el input de cantidad
    document.querySelector(`#cantidad input[data-id="${producto.id}"]`).addEventListener('input', function() {
        const cantidad = parseInt(this.value);// captura la nueva cantidad
        actualizarTotalProducto(producto, cantidad);//Actualiza el total del producto
    });

    //boton menos
    //Decrementa la cantidad cuando el usuario presiona el boton "menós"
    document.querySelector(`.menos[data-id="${producto.id}"]`).addEventListener('click', function() {
        const cantidadInput = document.querySelector(`#cantidad input[data-id="${producto.id}"]`);//captura el input de cantidad
        //asegura que la cantidad no sea menor que 1
        if(parseInt(cantidadInput.value)> 1) {
            //disminuimos la cantidadd
            cantidadInput.value = parseInt(cantidadInput) - 1;
            //actualiza el total del valor de los productos
            actualizarTotalProducto(producto, parseInt(cantidadInput.value));

        }
    });

    //boton más
    //Incrmenta la cantidad cuando el usuario presiona el boton más
    document.querySelector(`.mas[data-id="${producto.id}"]`).addEventListener('click', function () {
        //captura input de cantidad
        const cantidadInput = document.querySelector(`#cantidad input[data-id="${producto.id}"]`);
        if(parseInt(cantidadInput.value) < producto.stockMaximo) {
            //nos aseguramosde que no excedemos el stock maximo
            // y aumentamos en 1 el valor del input
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
            //actualizamos el toatl del valor de la linea
            actualizarTotalProducto(producto, parseInt(cantidadInput.value));
        }
    });
}

//funcion para actualizar el total del producto
