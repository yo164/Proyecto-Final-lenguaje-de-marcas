const url = 'http://localhost:3000/api/productos';

fetch(url).then(response =>  {
    if(!response.ok) throw new Error('Error al obtener los productos');
})