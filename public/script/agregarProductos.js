//simulacion de base de datos
const productos = [
    { id: 1, nombre: "Articulo 1", precio: 10.00, stockMaximo: 10 },
    { id: 2, nombre: "Articulo 2", precio: 15.00, stockMaximo: 5 },
    { id: 3, nombre: "Articulo 3", precio: 20.00, stockMaximo: 8 }
];


function agregarAlcarrito(id, cantidadSelecionada = 1) {//cantidad selecionada como ejemplo aqui iria la variable que capture el valor del input del botón
    //buscar el producto seleccionado en nuestar "base de datos"
    const productoSeleccionado = productos.find(producto => producto.id === id);

    //si el producto existe, lo agregamos al carrito
    if(productoSeleccionado) {
        // Aquí simplemente agregamos el producto al carrito(sin interactuar con las cantidades).
        const productoEnCarrito = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            cantidad: cantidadSelecionada

        };

        //agregamos el producto al localStorage para simular un carrito
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(productoEnCarrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        alert('Producto agregado al carrito');
    }

}

//Escuchar los eventos de click en los botones de "añadir al carrito
document.querySelectorAll('.agregarAlCarrito').forEach(button => {
    button.addEventListener('click', function() {
        //obtiene el id del produto desde el atributo 'data-id'
        const productoId = parseInt(this.getAttribute('data-id'));
        const cantidadSeleccionada = parseInt(document.querySelector(`#cantidad input[data-id="${productoId}"]`)?.value || 1);
        //llama a la función para agregar el producto al carrito
        agregarAlcarrito(productoId, cantidadSeleccionada);
    });
});