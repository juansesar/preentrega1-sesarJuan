class Producto {
    constructor (id, producto, precio, imagen){
        this.id= id,
        this.producto= producto,
        this.precio= precio,
        this.imagen= imagen 
    }
}

function buscarProducto(array, elemento){
    let busqueda= ""
    busqueda = array.filter(
        (p) => p.producto == elemento 
     )
    if (array.length == 0 ){
        alert("este producto no existe")
    }else{
        console.log(busqueda)
        mostrarProducto(busqueda)
           
    }
}

function mostrarProducto(array){
    cardsdiv.innerHTML = ""
    for( let p of array){
        let nuevoProducto= document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${p.id}" class="card" style="width: 18rem;">
                                <img src="${p.imagen}" class="card-img-top" height=300px alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${p.producto}</h5>
                                    <p class="card-text">${p.precio}.</p>
                                    <a href="#" class="btn btn-primary">comprar</a>
                                </div>
                                </div>`
        cardsdiv.appendChild(nuevoProducto)
   
    }
}

let cardsdiv = document.getElementById("cards")
let mostrarCatalogo = document.getElementById("catalogo")
let botonProductoRemeras = document.getElementById("btnRemeras")
let botonProductoPosters = document.getElementById("btnposters")
let botonProductoAccesorios = document.getElementById("btnAccesorios")
let botonCarrito = document.getElementById("carrito")

let producto1= new Producto("1", "Remera estampada", 3000 , "./imagenes/remera1.png")
let producto2= new Producto("2", "Remera estampada", 4000 , "./imagenes/remera2.jpg")
let producto3= new Producto("3", "Poster", 1000 , "./imagenes/poster1.jpg")
let producto4= new Producto("4", "Poster", 1500 , "./imagenes/poster2.jpg")
let producto5= new Producto("5", "Accesorios", 4000 , "./imagenes/moneda.jpg")
let producto6= new Producto("6", "Accesorios", 3000 , "./imagenes/termo.jpg")

// localStorage.setItem()

const productos=[]

productos.push(producto1, producto2, producto3, producto4, producto5, producto6)

mostrarCatalogo.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarProducto(productos)})

botonProductoRemeras.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto( productos,"Remera estampada")})
botonProductoAccesorios.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto( productos,"Accesorios")
})  
botonProductoPosters.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto( productos, "Poster")
})
