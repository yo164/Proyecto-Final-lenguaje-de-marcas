const carrusel = document.getElementById('carrusel');
const items = carrusel.children;
for(let i = 0; i < 5; i++){
    carrusel.appendChild(items[i].cloneNode(true));
}