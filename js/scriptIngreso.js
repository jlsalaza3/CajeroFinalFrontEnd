function ingreso(){

// Paso 1: Obtener el valor de 'usuarios' del localStorage
let usuariosCon = localStorage.getItem('usuarios');

// Paso 2: Comprobar si se obtuvieron datos
if (usuariosCon) {
  // Paso 3: Parsear el valor JSON
  const usuarios = JSON.parse(usuariosCon);

  // Paso 4: Buscar un usuario por nombre y clave
  let nombreUsuario = document.getElementById('nombreusuario').value.trim();
  console.log(nombreUsuario)
  
  let clave = document.getElementById('clave').value.trim();
  console.log(clave)
  


  // Buscar en el arreglo de usuarios
  let usuario = usuarios.find(u => u.nombreusuario === nombreUsuario && u.clave === clave);

  // Paso 5: Comprobar si se encontró el usuario
  if (usuario) {

        //para crear en el localStorage el usuario que esta activo
        localStorage.setItem("nombreUsuarioActivo",JSON.stringify(usuario))
        // para abrir la nueva pagina de saldos y operaciones
        window.location.href = '/operaciones.html'

    console.log('Usuario encontrado:', usuario);
    console.log('Saldo:', usuario.saldo);
  } else {
    console.log('Usuario o contraseña incorrectos');
    alert('Usuario o contraseña incorrectos')
  }
} else {
  console.log('No se encontraron usuarios en el localStorage');
}


}

