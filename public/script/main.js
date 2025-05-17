const categoria = 'Quillas';
const url = `http://localhost:3000/api/productos?categoria=${encodeURIComponent(categoria)}`;

fetch(url).then(response =>  {
    if(!response.ok) {
        throw new Error('Error al obtener los productos');
    } 
    return response.json(); 
}).then(data => {
    const contenedor = document.getElementById('contenedor');//aqui se selecciona el id del contenedor donde se mostrarán
    data.forEach(producto => {
        const item = document.createElement('div');//creamos el div que contendra los datos del producto
        item.classList.add('contenedorProducto');//le damos nombre a la clase del div(revisa el html para ver bien los nombres)
        //aqui relleno el interior del div
        //como falta la foto pondre lo basico en varios p y a volar
        item.innerHTML = `
        <h3>${producto.nombreProducto}</h3>
        <div class="contenedorImg">
            <img src="${producto.urlImagen}" alt="Foto de ${producto.nombreProducto}" class="imgProducto">
        </div>
        <p>Precio: ${producto.precio}</p>
        <p>Descripción: ${producto.descripcion}</p>
        
        `;
        contenedor.appendChild(item);
    });
}).catch(error => {
    console.error('Huboun error:', error);
});