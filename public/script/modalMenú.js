const links = document.querySelectorAll('.enlaces');

let menuDesplegable = null;

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if(menuDesplegable) {
            menuDesplegable.close();
            menuDesplegable.remove();
        }
    
        const submenu = document.createElement('dialog');
        submenu.classList.add('menuPrueba');

        switch (link.textContent) {
            case 'Skate':
                submenu.innerHTML = `
        <h4>${link.textContent}</h4>
        <div class="contNav">
        <nav>
        <a href="productos.html?categoria=Skates%20Completos">Skates Completos</a>
        <a href="productos.html?categoria=Tablas">Tablas</a>
        <a href="productos.html?categoria=Ejes">Ejes</a>
        <a href="productos.html?categoria=Ruedas">Ruedas</a>
        </nav>
        </div>
        `;
                break;
            case 'Surf':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <div class="contNav">
            <nav>
            <a href="productos.html?categoria=Quillas">Quillas</a>
            <a href="productos.html?categoria=Fundas%20de%20Surf">Fundas de Surf</a>
            <a href="productos.html?categoria=Inventos">Inventos</a>
            <a href="productos.html?categoria=Parafina">Parafina</a>
            </nav>
            </div>
            `;

                break;
            case 'Ropa':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <div class="contNav">
            <nav>
            <a href="productos.html?categoria=Ropa%20de%20Surf">Ropa de Surf</a>
            
            </nav>
            </div>
            `;
                break;
            case 'Accesorios':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <div class="contNav">
            <nav>
            <a href="productos.html?categoria=Protecciones">Protecciones</a>
            <a href="productos.html?categoria=Accesorios%20de%20Surf">Accesorios de Surf</a>
            <a href="productos.html?categoria=Accesorios%20de%20Surf">Accesorios de Skate</a>
            <a href="productos.html?categoria=Bolsas%20y%20Mochilas">Bolsas y Mochilas</a>
            
            </nav>
            </div>
            `;
                break;

            default:
                break;
        }

        document.body.appendChild(submenu);
        submenu.show();

        // Posicionar el dialogo junto al enlace
       // const rect = link.getBoundingClientRect();
        //submenu.style.position = 'absolute';
        //submenu.style.top = `${rect.bottom + window.scrollY}px`;
        //submenu.style.left = `${rect.left + window.scrollX}px`;

        menuDesplegable = submenu;

        //cerrar al salir del enlace o del menu(el dialog)
        link.addEventListener('mouseleave', comprobarSalida);
        submenu.addEventListener('mouseleave', comprobarSalida);
    });
});


//funcion qu comprueba si existe y a donde va despues de slair del enlace 
function comprobarSalida(event) {
    if(menuDesplegable && !menuDesplegable.contains(event.relatedTarget)){
        menuDesplegable.close();
        menuDesplegable.remove();
        menuDesplegable = null;
    }
}