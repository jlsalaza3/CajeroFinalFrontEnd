// Validación de requisitos de la contraseña (mínimo 6 caracteres, números y letras)
function validarContrasena(contrasena) {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(contrasena);
}

// Validación de que las contraseñas coincidan
function validarCoincidenciaContrasenas(clave, confirmarClave) {
    return clave === confirmarClave;
}

// Validación si el nombre de usuario ya está registrado
function verificarUsuarioExistente(nombreusuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(usuario => usuario.nombreusuario === nombreusuario);
}

// Almacenamiento de los elementos del objeto usuario en el localStorage
function guardarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para manejar el registro
function registrarUsuario(event) {
    event.preventDefault();

    let nombreusuario = document.getElementById('nombreusuario').value.trim();
    let clave = document.getElementById('clave').value.trim();
    let confirmarClave = document.getElementById('confirmarclave').value.trim();
    let fecha = new Date();

    // Validar que las contraseñas coincidan
    if (!validarCoincidenciaContrasenas(clave, confirmarClave)) {
        alert('Las contraseñas no coinciden. Por favor, verifica nuevamente.');
        document.getElementById('clave').value = '';
        document.getElementById('confirmarclave').value = '';
        return;
    }

    // Validar que el nombre de usuario no esté duplicado
    if (verificarUsuarioExistente(nombreusuario)) {
        alert('El nombre de usuario ya está registrado.');
        document.getElementById('formulario').reset();
        return;
    }

    // Validar que la contraseña sea válida
    if (!validarContrasena(clave)) {
        alert('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.');
        document.getElementById('clave').value = '';
        document.getElementById('confirmarclave').value = '';
        return;
    }

    // Crear el objeto de usuario
    let nuevoUsuario = {
        nombreusuario: nombreusuario,
        clave: clave,
        fecha: fecha,
        movimiento: 'adicion',
        saldo: 200000
    };

    // Guardar el usuario en el localStorage
    guardarUsuario(nuevoUsuario);

    // Mostrar un mensaje de éxito
    alert('Usuario registrado con éxito.');

    // Limpiar los campos del formulario
    document.getElementById('formulario').reset();
}

// Agregar el evento al formulario
document.getElementById('formulario').addEventListener('submit', registrarUsuario);

// Redirigir al hacer clic en el botón "Continuar"
document.getElementById("continuar").addEventListener("click", function () {
    window.location.href = "ingreso.html";
});
