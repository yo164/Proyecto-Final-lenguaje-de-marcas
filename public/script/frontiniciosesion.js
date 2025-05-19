//front end de iniciode sesion

fetch('http://localhost:3002/api/login', {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify({nombreUsuario: 'soypaco', contrasena:'1234'})
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));