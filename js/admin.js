import {Funko} from './funkoClass.js'

//este arreglo contendra todos los funkopop
let listaFunkopop = [];
// aqui traer la ventana modal
const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'));

let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', function (){
    modalProducto.show();
})



window.agregarFunkopop = function (event){
    event.preventDefault();
    console.log('desde la funcion agregar producto')
    // aqui preguntar si todos los campos estan correctamente validados (validar general)

    // traigo todos los valores del formulario
    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let numSerie = document.getElementById('numSerie').value;
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = document.getElementById('imagen').value;

    // crear el nuevo objeto
    let nuevoFunkopop = new Funko( codigo,nombre, numSerie,categoria, descripcion,imagen);
    // agregar el nuevo funkopop en el arreglo
    listaFunkopop.push(nuevoFunkopop);
    console.log(listaFunkopop)

    // guardar el arreglo de funkopop en localstorage
    localStorage.setItem('listaFunkopopKey', JSON.stringify(listaFunkopop));

    // limpiar el formulario
    limpiarFormulario()
    // mostrar un mensaje que su producto se cargo correctamente
    Swal.fire(
        'Funkopop agregado',
        'El funkopop cargado se agrego correctamente',
        'success'
      )
    // buscar los datos del localstorage y dibujar
        leerDatos();
    // cerrar el modal
    modalProducto.hide();
}

function limpiarFormulario(){
    // resetea los valores del formulario
    document.getElementById('formFunkopop').reset();
}


function leerDatos(){
    // esta funcion se encargara de leer los datos del localstorage
    if(localStorage.length >0){
        // traigo los datos del localstorage, los transformo en codigo de js y los guardo en una variable
        let _listaFunkopop = JSON.parse(localStorage.getItem('listaFunkopopKey'))

        if(listaFunkopop.length === 0){
            listaFunkopop = _listaFunkopop
        }
        dibujarTabla(_listaFunkopop);
    }
}

function dibujarTabla(productosFunkopop){
    console.log(productosFunkopop);
}
