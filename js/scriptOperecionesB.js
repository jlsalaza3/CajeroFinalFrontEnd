// Traer el ID del usuario Activo en el momento
let usuarioTransaccional=JSON.parse(localStorage.getItem("nombreUsuarioActivo"));



    //creo una función y un  objeto que me guarde cada movimiento que haga el usuario:

    function guardarMovimientos(usuarioActivo, monto, movimiento, fechaOperacion){

            // Obtener los movimientos previas del localStorage, si existen
            let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];


         // Crear un nuevo objeto para cada movimiento
        let nuevoMovimiento = {
            fecha: fechaOperacion,
            usuario: usuarioActivo,
            valorOperacion: monto,
            tipoMovimiento: movimiento,
        }

            // Añadir la nuevo movimiento al array
            movimientos.push(nuevoMovimiento);
            // Guardar el array actualizado de movimientos en el localStorage
            localStorage.setItem('movimientos', JSON.stringify(movimientos));

    }
// ------------------------------------------------------------------------------------
// creo funcion para consultar si usuario a transferir existe 

function verificarUsuarioExistente(nombreusuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(usuario => usuario.nombreusuario === nombreusuario);
}
// ------------------------------------------------------------------------------
let nombreusuario = document.getElementById('receptor').value.trim();










// ----------------------------------------------------------------------------------
    function saldo() {
        // Obtener los movimientos del localStorage
        let MovimientosparaSaldo = JSON.parse(localStorage.getItem('movimientos')) || [];
        console.log(MovimientosparaSaldo)

            // Filtramos los objetos donde el campo "usuario" sea "el usuario Activo que hace la consulta"
            let usuarioaBuscar=usuarioTransaccional.nombreusuario
            console.log(usuarioaBuscar)
        
            let movimientosUsuarioaSumar = MovimientosparaSaldo.filter(item => item.usuario === usuarioaBuscar);
                console.log(movimientosUsuarioaSumar)
    
            // Sumar el monto de todas los movimientos
            let sumatoria=200000

                    
            movimientosUsuarioaSumar.forEach(movimiento => {

                sumatoria=sumatoria+movimiento.valorOperacion;
                localStorage.setItem("saldoActual",sumatoria);
                
                
            });
    
       alert('su saldo actual es: '+ sumatoria.toLocaleString())
       return sumatoria
    }


// -----------------------------------------------------------------------------------------------
function mostrarSaldo()
{
    let vistasaldo = document.getElementById('saldo').innerText=saldo();
    return vistasaldo;

}
document.onload=mostrarSaldo();

// Modulo Transacciones

function operaciones(){


     // variables requeridas para cualquier operacion
     let usuarioActivo = usuarioTransaccional.nombreusuario
     console.log(usuarioTransaccional.nombreusuario);
     let monto= Number(document.querySelector('#monto').value);
     console.log(monto)
     let movimiento=document.querySelector('#tipotransaccion').value;
     console.log(movimiento)
     let fechaOperacion= new Date();
     console.log(fechaOperacion)
     

switch(movimiento){
    case 'adicion':
        //Consignar
        console.log('voy a consignar')
        guardarMovimientos(usuarioActivo, monto, movimiento, fechaOperacion)
        alert('se realizó la consignación con exito')
        // limpia el formulario
        document.getElementById('formulario').reset();

    break;

    case 'retiro':
        //Retirar
        console.log('voy a retirar')
        console.log(monto)
        let toperetiro=saldo()
        let valormaximo=localStorage.getItem("saldoActual")
        console.log(valormaximo)
        if(monto>valormaximo){
            alert("El monto del retiro  "+monto.toLocaleString()+" es mayor al saldo disponible, intentelo nuevamente");
            document.getElementById('formulario').reset();

        }else{
        guardarMovimientos(usuarioActivo, (monto*-1), movimiento, fechaOperacion)
        alert('Se realizo el retiro con exito')
        // limpia el formulario
        document.getElementById('formulario').reset();
    }

    break

    case 'transferencia':
        //transferir
        console.log('voy a tranferir')
        let toperetiro2=saldo()
        let valormaximo2=localStorage.getItem("saldoActual")
        console.log(valormaximo2)
        if(monto>valormaximo2){
            alert("El monto del retiro  "+monto.toLocaleString()+" es mayor al saldo disponible, intentelo nuevamente");
            document.getElementById('formulario').reset();

        }else{
        
        ///validacion usuario receptor transferencia existe
        let nombreusuario = document.getElementById('receptor').value.trim();
            console.log(nombreusuario)
         
        if (verificarUsuarioExistente(nombreusuario)) {
        alert('El nombre de usuario ya está registrado.')
        alert('Transferencia realizada con exito')
        guardarMovimientos(usuarioActivo, (monto*-1), movimiento, fechaOperacion)
        guardarMovimientos(nombreusuario, monto, movimiento, fechaOperacion)
        return;
    }else{
        alert('El nombre de usuario NO está registrado.')
    }

        // limpia el formulario
        document.getElementById('formulario').reset();
    }

    break

default:
    alert('Opción incorrecta. Intente nuevamente.');
    // limpia el formulario
    document.getElementById('formulario').reset();
    break;
}
let vistasaldo = document.getElementById('saldo').innerText=saldo();
}


// _____________________________________________________________________________________
// Función para cargar los movimientos desde el localStorage y mostrar en la tabla
function cargarTablaMovimientos() {
let movimientosTabla = JSON.parse(localStorage.getItem('movimientos'));  // Obtener todos los movimientos del localStorage
console.log(movimientosTabla)

// Filtramos los objetos donde el campo "usuario" sea "el usuario Activo que hace la consulta"
let usuarioTabla=usuarioTransaccional.nombreusuario
console.log(usuarioTabla)

let movimientosUsuarioatabla = movimientosTabla.filter(item => item.usuario === usuarioTabla);
console.log(movimientosUsuarioatabla)




let cuerpoTabla = document.querySelector('#tablamovimientos tbody');
cuerpoTabla.innerHTML = '';  // Limpiar el cuerpo de la tabla

// Iterar los movimientos y agregar una fila por cada uno
movimientosUsuarioatabla.forEach(movimientoT => {
    let fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td>${movimientoT.fecha}</td>
        <td>${movimientoT.usuario}</td>
        <td>${movimientoT.tipoMovimiento}</td>
        <td>${movimientoT.valorOperacion}</td>
        `;
    
    cuerpoTabla.appendChild(fila);
});
}
// ________________________________________________________________________________________-


