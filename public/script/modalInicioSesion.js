const modal = document.getElementById('modal');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');


abrir.addEventListener('click', () => {
    modal.show();
});

cerrar.addEventListener('click', () => {
    modal.close();
});