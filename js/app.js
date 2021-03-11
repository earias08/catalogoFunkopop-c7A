// crear un arreglo que almacene los datos del localstorage
let listaFunkopop = [];
leerInventario();

function leerInventario(){
    if(localStorage.length > 0){
        // traer datos del localstorage
        listaFunkopop = JSON.parse(localStorage.getItem('listaFunkopopKey'));
        // traer el padre
        let articlePadre = document.getElementById('listaProductos');
        // borrar el contenido del padre
        articlePadre.innerHTML='';
        // crear mis columnas
        console.log(listaFunkopop);
        // crear las columnas
        for(let i in listaFunkopop){
            let imagen='';
            if(listaFunkopop[i].imagen === ""){
                // agregar una imagen por defecto
                imagen = 'thanos.png';
            }else{
                // mostrar la imagen que cargue en el objeto
                imagen = listaFunkopop[i].imagen
            }
            // variable que almacene el html de la columna
            let columna = `<div class="col-md-3">
            <div class="card mb-4">
              <img
                src="img/productos/${imagen}"
                class="card-img-top"
                alt="${listaFunkopop[i].nombre} Funkopop"
              />
              <div class="card-body">
                <h5 class="card-title">${listaFunkopop[i].nombre}</h5>
                <p class="card-text">
                ${listaFunkopop[i].descripcion}
                </p>
                <a href="error404.html" class="btn btn-info disabled">Mas detalles</a>
              </div>
            </div>
          </div>`;
        //   agregar la columna a su elemento padre
        articlePadre.innerHTML += columna;
        }
    }

}
