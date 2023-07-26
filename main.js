//CLASE N°14 -- LIBRERIAS
// Swal.fire('Any fool can use a computer')

// Swal.fire({
//    title: 'Bienvenidos',
//    text: 'Clase 14 de librerias',
//    icon: 'info',
//    confirmButtonText: 'Entendido'
//  })

//Toastify

// Toastify({
//    text: `Esto es una notificación`,
//    //en milisegundos
//    duration: 2500
// }).showToast()

// Toastify({
//    text: "This is a toast",
//    duration: 3000,
//    destination: "https://github.com/apvarun/toastify-js",
//    newWindow: true,
//    close: true,
//    gravity: "bottom", // `top` or `bottom`
//    position: "center", // `left`, `center` or `right`
//    stopOnFocus: true, // Prevents dismissing of toast on hover
//    style: {
//      background: "linear-gradient(to right, #00b09b, #96c93d)",
//    },
//    onClick: function(){} // Callback after click
//  }).showToast();

//luxon ppara fechas y horas
const DateTime = luxon.DateTime
console.log(DateTime)

//iso crear una fecha (YYYY-MM-DD) (AAAA-MM-DD)
const cumple = DateTime.fromISO("1993-07-19")
console.log(cumple)

console.log(cumple.year)
console.log(cumple.day)
console.log(cumple.weekdayLong)
console.log(cumple.daysInYear)
let fecha = document.getElementById("fecha")
const ahora = DateTime.now()
console.log(ahora)
console.log(ahora.day)
console.log(ahora.weekdayLong)
console.log(ahora.year)
let fechaMostrar =  ahora.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`
//Formatos:

console.log(cumple.toLocaleString(DateTime.DATE_SHORT))
console.log(cumple.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY))
console.log(ahora.toLocaleString(DateTime.DATE_SHORT))
console.log(ahora.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY))

let dtHebrew = DateTime.now().reconfigure({ outputCalendar: "hebrew" });
console.log(dtHebrew.outputCalendar) //=> 'hebrew'
console.log(dtHebrew.toLocaleString()) //=> '4 Tishri 5778'


//PROYECTO MIS LIBROS CON DOM
//capturar DOM
let librosDiv = document.getElementById("libros")
let verCatalogo = document.getElementById("verCatalogo")
let ocultarCatalogo = document.getElementById("ocultarCatalogo")
let selectOrden = document.getElementById("selectOrden")
let agregarLibroBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")

//array con productos en carrito
let productosEnCarrito 
if(localStorage.getItem("carrito")){
   //cuando ya existe algo en el storage con la clave carrito
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
   //no existe nada en el storage
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}

//FUNCTIONS PROYECTO: 
function mostrarCatalogo(array){
   //resetear el DOM
   librosDiv.innerHTML = ``
   //Recorrer array para imprimir en el DOM
   for(let libro of array ){
      let nuevoLibroDiv = document.createElement("div")
      nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevoLibroDiv.innerHTML = `<div id="${libro.id}" class="card" style="width: 18rem;">
                                 <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                                 <div class="card-body">
                                    <h4 class="card-title">${libro.titulo}</h4>
                                    <p>Autor: ${libro.autor}</p>
                                    <p class="${libro.precio <= 2000 && "ofertaLibro"}">Precio: ${libro.precio}</p>
                                 <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                 </div>
                              </div>`
      librosDiv.appendChild(nuevoLibroDiv)

      let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)

      agregarBtn.addEventListener("click", () => {
         agregarAlCarrito(libro)
      })
   }

}

function agregarAlCarrito(libro){
   //preguntar si existe ese libro en el array
   let libroAgregado = productosEnCarrito.find((elem)=>elem.id == libro.id) 
   //me devuelve sino encuentra undefined, si encuenta el elemento
   if(libroAgregado == undefined){
      //código para sumar al array carrito
      productosEnCarrito.push(libro)
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
      console.log(productosEnCarrito)

      //alert para agregar libro
      Swal.fire({
         title: `Ha agregado un producto al carrito`,
         text:`El libro ${libro.titulo} de ${libro.autor} ha sido agregado`,
         confirmButtonColor: "green",
         confirmButtonText : "Gracias :D",
         imageUrl: `assets/${libro.imagen}`,
         imageHeight: 200

      })
   }else{
      //sumar uno a cantidad
      // console.log(`El libro ${libro.titulo} ya existe en el carrito `)

      //Sweetalert 
      Swal.fire({
         title: `El libro ya existe en el carrito`,
         icon: "info",
         //tiempo de aparición: en milisegundos
         timer: 2000,
         showConfirmButton: false

      })
   }
}

function cargarProductosCarrito(array){
   modalBodyCarrito.innerHTML = ``
   //primer for each imprime las card
   array.forEach((productoCarrito)=>{
      modalBodyCarrito.innerHTML += `
   
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.titulo}</h4>
                        <p class="card-text">${productoCarrito.autor}</p>
                         <p class="card-text">$${productoCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
      
   `
   })
   //segundo for each adjunta evento eliminar
   array.forEach((productoCarrito) => {
      //manipular el DOM sin guardar en variable
      document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
         console.log(`Eliminar producto`)
         //borrar del DOM
         let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
         cardProducto.remove()
         //borrar del array
         //encontramos objeto a eliminar
         let productoEliminar = array.find((libro) => libro.id == productoCarrito.id)
         console.log(productoEliminar)
         //buscar indice
         let posicion = array.indexOf(productoEliminar)
         console.log(posicion)
         array.splice(posicion,1)
         console.log(array)
         //setear storage
         localStorage.setItem("carrito", JSON.stringify(array))

         //debemos calcularTotal??
         calcularTotal(array)
      })
   })
   calcularTotal(array)
   
}

function calcularTotal(array){
   //método reduce 
   //DOS PARAMETROS: primero la function y segundo valor en el que quiero inicializar el acumulador
   let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
   
   total == 0 ? precioTotal.innerHTML= `No hay productos en el carrito` : precioTotal.innerHTML = `El total es <strong>${total}</strong>`

}

function ordenarMenorMayor(array){
   //copia del array original, para aplicar sort y no modificar estanteria
   const menorMayor = [].concat(array)
   console.log(menorMayor)
   //de forma ascendente por el atributo precio
   menorMayor.sort((a,b) => a.precio - b.precio)
   mostrarCatalogo(menorMayor)
 }
 
 function ordenarMayorMenor(array){
   const mayorMenor = [].concat(array)
   //ordenar forma descendente 
   mayorMenor.sort((elem1 ,elem2) => elem2.precio - elem1.precio)
   mostrarCatalogo(mayorMenor)
 }
 
 function ordenarAlfabeticamenteTitulo(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.titulo > b.titulo) {
         return 1
       }
       if (a.titulo < b.titulo) {
         //return explicito
         return -1
       }
       // a must be equal to b
       return 0
   })
 
   mostrarCatalogo(arrayAlfabetico)
 }

function agregarLibro(array){
   let autorIngresado = document.getElementById("autorInput")
   let tituloIngresado = document.getElementById("tituloInput")
   let precioIngresado = document.getElementById("precioInput")
   
   //arriba capturamos toda la etqieta input, necesitamos el valor
   const libroNuevo = new Libro(array.length+1,autorIngresado.value, tituloIngresado.value, precioIngresado.value, "libroNuevo.jpg")
   //pusheamos al array:
   array.push(libroNuevo)
   //setear en el storage el array con el libro
   localStorage.setItem("estanteria", JSON.stringify(array))
   mostrarCatalogo(array)
   
   //resetear el form
   autorIngresado.value = ""
   tituloIngresado.value = ""
   precioIngresado.value = ""

   //Toastify
   Toastify(
      {
         text: `El libro ${libroNuevo.titulo} se ha agregado`,
         duration: 3000,
         gravity: "bottom",//top o buttom,
         position: "center",//left, right o center
         style: {
            color: "white",
            background: "green"
         }
      }
   ).showToast()
}

function buscarInfo(buscado, array){

   //filter que nos devuelva LOS libros por autor o titulo que queremos
   //creamos una condición compuesta para buscar
   let busqueda = array.filter(
      (dato) => dato.autor.toLowerCase().includes(buscado.toLowerCase())  || dato.titulo.toLowerCase().includes(buscado.toLowerCase()) 
   )
   // if(busqueda.length == 0){
   //    coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`
   //    mostrarCatalogo(busqueda)
   // }else{
   //    //mostrarCatalogo
   //    coincidencia.innerHTML = ""
   //    mostrarCatalogo(busqueda)
   // }

   //ternario reemplaza un if else, dos o más líneas 
   busqueda.length == 0 ? 
   (coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`,
   mostrarCatalogo(busqueda)) :
   (coincidencia.innerHTML = "", mostrarCatalogo(busqueda)) 
 }

//EVENTOS: 
agregarLibroBtn.addEventListener("click", function(event){
   //nos permite que no se actualice al ejecutar el evento
   event.preventDefault()
   agregarLibro(estanteria)
})

verCatalogo.addEventListener("click", ()=>{
   mostrarCatalogo(estanteria)
})

ocultarCatalogo.ondblclick = () => {
   //reiniciando el div
   librosDiv.innerHTML = ``
}

selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(estanteria)
      break
      case "2":
         ordenarMenorMayor(estanteria)
      break
      case "3":
         ordenarAlfabeticamenteTitulo(estanteria)
      break
      default:
         mostrarCatalogo(estanteria)
      break
   }
}
)
buscador.addEventListener("input", () => {
   buscarInfo(buscador.value, estanteria)
})

c
