import {Funko} from './funkoClass.js'

//este arreglo contendra todos los funkopop
let listaFunkopop = [];
// aqui traer la ventana modal
const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'));

let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', function (){
    modalProducto.show();
})

// traer los datos del localstorage.
leerDatos();


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
    // traer el tbody padre
    let tCuerpo = document.getElementById('tablaFunkopop');
    let filaFunko ='';
    // limpiar el tbody
    tCuerpo.innerHTML='';

    // for(let i=0; i < productosFunkopop.length; i++){}
    for(let i in productosFunkopop){
        //dibujar cada fila
        filaFunko = `<tr>
        <th scope="row">${productosFunkopop[i].codigo}</th>
        <td>${productosFunkopop[i].nombre}</td>
        <td>${productosFunkopop[i].numSerie}</td>
        <td>${productosFunkopop[i].categoria}</td>
        <td>${productosFunkopop[i].descripcion}</td>
        <td>${productosFunkopop[i].imagen}</td>
        <td>
          <button class="btn btn-warning">Editar</button>
          <button class="btn btn-danger" onclick="eliminarFunkopop(this)" 
          id="${productosFunkopop[i].codigo}">Borrar</button>
        </td>
      </tr>`;
        // agregar fila en el elemento padre
        tCuerpo.innerHTML += filaFunko;
    }
}

window.eliminarFunkopop = function (boton){
    console.log(boton.id)
    // mostrar un mensaje para estar seguro de eliminar
    Swal.fire({
        title: 'Esta seguro de eliminar el funkopop',
        text: "No puedes volver atras luego de este paso",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        //   if(true)
        if (result.isConfirmed) {
            //borrar el funkopop 
            // buscar el objeto que quiero borrar usando su codigo
            // quitar el objeto encontrado del arreglo
            let productosFiltrados = listaFunkopop.filter( function (producto){
                return producto.codigo != boton.id;
            })
            console.log(productosFiltrados);
            // guardar el arreglo en localstorage

            // invocar a la funcion leerdatos

          Swal.fire(
            'Funkopop eliminado',
            'El funkopop seleccionado fue eliminado',
            'success'
          )
        }
      })
}


