const links = document.querySelectorAll('.enlaces');
const principal = document.getElementById('principal');

let menuDesplegable = null;

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        console.log('focused', link.textContent);

        if(menuDesplegable){
            menuDesplegable.remove();
        }
        const submenu = document.createElement('div');
        submenu.classList.add('desplegable');
        submenu.innerHTML = `
        <h4>${link.textContent}</h4>
        <nav>
        <a>Subcat1</a>
        <a>Subcat2</a>
        </nav>
        `;




        principal.appendChild(submenu);

        menuDesplegable = submenu;
    });

    link.addEventListener('mouseleave', () => {
        console.log('desfocused', link.textContent);

        const submenu = principal.querySelector('.desplegable');
        if(submenu && !submenu.contains(event.relatedTarget)) {
            submenu.remove();
            menuDesplegable = null;
        }
    });

    principal.addEventListener('mouseleave', (event) => {
        if (menuDesplegable && !menuDesplegable.contains(event.relatedTarget)) {
            menuDesplegable.remove();
            menuDesplegable = null;
        }
    });
});


