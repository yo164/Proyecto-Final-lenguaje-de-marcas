const modal = document.getElementById('modal');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');


abrir.addEventListener('click', () => {
    modal2.show();
});

cerrar.addEventListener('click', () => {
    modal2.close();
});