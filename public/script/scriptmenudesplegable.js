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
        <a href="pagina con la categoria cargada">Skates Completos</a>
        <a href="">Tablas</a>
        <a href="">Ejes</a>
        <a href="">Ruedas</a>
        </nav>
        `;
                break;
            case 'Surf':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a>Quillas</a>
            <a>Fundas de Surf</a>
            <a>Inventos</a>
            <a>Parafina</a>
            </nav>
            `;

                break;
            case 'Ropa':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a>Ropa de Surf</a>
            
            </nav>
            `;
                break;
            case 'Accesorios':
                submenu.innerHTML = `
            <h4>${link.textContent}</h4>
            <nav>
            <a>Protecciones</a>
            <a>Accesorios de Surf</a>
            <a>Accesorios de Skate</a>
            <a>Bolsas y Mochilas</a>
            
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


