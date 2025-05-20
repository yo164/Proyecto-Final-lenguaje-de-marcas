document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('http://localhost:3000/api/productos?categoria=Rebajas');
        const productos = await res.json();

        const contenedorBanda = document.querySelector('.bandaofertas');

        productos.slice(0, 10).forEach((producto, index) => {
            
            const div = document.createElement('div');
            div.classList.add('producto');
            div.style.animationDelay = `${index * 8}s`; // index empieza en 0 multiplica *8 cada vuelta
            div.style.zIndex = `${index + 1000}`;//suma con un zindex inicial alto para asegurar supersposicion
            //y además al ir aumentando sobre pone uno al otro
            div.innerHTML = `
            
                <div class="contenedorImg">
                    <img src="${producto.urlImagen}" alt="Foto de ${producto.nombreProducto}" class="imgProducto">
                </div>
                <div class="contenedorContenido">
                    <h3>${producto.nombreProducto}</h3>
                    <p>Precio Rebajado: <strong>${producto.precio} €</strong></p>
                    <p>Precio:<strong> ${(parseFloat(producto.precio)+10).toFixed(2)} €</strong></p>
                    <p>Descripción: ${producto.descripcion}</p>
                </div>
                <div class="contenedorBotones">
                   
                    <button type="submit" class="botonsubmitOferta">
                        Añadir al Carrito
                    </button>
                </div>
        
            `;

            contenedorBanda.appendChild(div);
        });

    } catch (error) {
        console.error('Error al cargar productos de rebajas:', error);
    }
});
