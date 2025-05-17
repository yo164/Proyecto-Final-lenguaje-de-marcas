const links = document.querySelectorAll('.enlaces');
const principal = document.getElementById('principal');
const titulovideo = document.getElementById('tituloPresentacion');

let menuDesplegable = null;

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        console.log('focused', link.textContent);

        if (menuDesplegable) {
            menuDesplegable.remove();
        }
        const submenu = document.createElement('div');
        submenu.classList.add('desplegable');


        switch (link.textContent) {
            case 'Skate':
                submenu.innerHTML = `
        <h4>${link.textContent}</h4>
        <nav>
        <a href="productos.html?categoria=Skates%20Completos">Skates Completos</a>
        <a href="productos.html?categoria=Tablas">Tablas</a>
        <a href="productos.html?categoria=Ejes">Ejes</a>
        <a href="productos.html?categoria=Ruedas">Ruedas</a>
        </nav>
        `;
                break;
            case 'Surf':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a href="productos.html?categoria=Quillas">Quillas</a>
            <a href="productos.html?categoria=Fundas%20de%20Surf">Fundas de Surf</a>
            <a href="productos.html?categoria=Inventos">Inventos</a>
            <a href="productos.html?categoria=Parafina">Parafina</a>
            </nav>
            `;

                break;
            case 'Ropa':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a href="productos.html?categoria=Ropa%20de%20Surf">Ropa de Surf</a>
            
            </nav>
            `;
                break;
            case 'Accesorios':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a href="productos.html?categoria=Protecciones">Protecciones</a>
            <a href="productos.html?categoria=Accesorios%20de%20Surf">Accesorios de Surf</a>
            <a href="productos.html?categoria=Accesorios%20de%20Surf">Accesorios de Skate</a>
            <a href="productos.html?categoria=Bolsas%20y%20Mochilas">Bolsas y Mochilas</a>
            
            </nav>
            `;
                break;

            default:
                break;
        }




        principal.appendChild(submenu);

        menuDesplegable = submenu;
        titulovideo.style.display = 'none';

    });

    link.addEventListener('mouseleave', (event) => {
        console.log('desfocused', link.textContent);


        const submenu = principal.querySelector('.desplegable');
        if (submenu && !submenu.contains(event.relatedTarget)) {
            submenu.remove();
            menuDesplegable = null;
            titulovideo.style.display = '';
        }
    });

    principal.addEventListener('mouseleave', (event) => {

        if (menuDesplegable && !menuDesplegable.contains(event.relatedTarget)) {
            menuDesplegable.remove();
            menuDesplegable = null;
            titulovideo.style.display = '';
        }
    });


});


