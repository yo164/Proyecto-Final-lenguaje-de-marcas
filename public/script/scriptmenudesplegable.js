const links = document.querySelectorAll('.enlaces');
const principal = document.getElementById('principal');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        console.log('focused', link.textContent);
        const submenu = document.createElement('div');
        submenu.classList.add('desplegable');
        submenu.innerHTML = `
        <nav>
        <a>Subcat1</a>
        <a>Subcat2</a>
        </nav>
        `;

        const linkRect = link.getBoundingClientRect();
        submenu.style.top = `${linkRect.top}px`;
        submenu.style.left = `${linkRect.right}px`;


        principal.appendChild(submenu);
    });

    link.addEventListener('mouseleave', () => {
        console.log('desfocused', link.textContent);

        const submenu = link.querySelector('.desplegable');
        if(submenu) {
            submenu.remove();
        }
    });
});


