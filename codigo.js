class Producto {
    constructor(id, producto, precio, imagen) {
        this.id = id,
            this.producto = producto,
            this.precio = precio,
            this.imagen = imagen
    }
}

function buscarProducto(array, elemento) {
    let busqueda = ""
    busqueda = array.filter(
        (p) => p.producto == elemento
    )
    if (array.length == 0) {
        alert("este producto no existe")
    } else {
        console.log(busqueda)
        mostrarProducto(busqueda)

    }
}

function mostrarProducto(array) {
    cardsdiv.innerHTML = ""
    for (let p of array) {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${p.id}" class="card" style="width: 18rem;">
                                <img src="${p.imagen}" class="card-img-top" height=300px alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${p.producto}</h5>
                                    <p class="card-text">${p.precio}.</p>
                                    <a href="#" id="agregarcarrito${p.id}" class="btn btn-primary">comprar</a>
                                </div>
                                </div>`
        cardsdiv.appendChild(nuevoProducto)
        let botonAgregarCarrito = document.getElementById(`agregarcarrito${p.id}`)

        botonAgregarCarrito.addEventListener("click", () => {
            console.log(`se ha agregado un producto${p.producto}`)
            agregarCarrito(p)
        }
        )
    }
}

function agregarCarrito(p) {
    let productoAgregado = productosCarrito.find((elem) => elem.id == p.id)
    if (productoAgregado == undefined) {
        productosCarrito.push(p)
        localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        console.log(productosCarrito)
        Swal.fire({
            title: `agregaste un producto al carrito`,
            icon: "info",
            timer: 2000,
            confirmButtonColor: "red",
            confirmButtonText: "OK",
            showConfirmButton: false

        })
    }

}
function cargarCarrito(array) {
    cardsdiv.innerHTML = ``
    array.forEach((pCarrito) => {
        cardsdiv.innerHTML += `
        <div id="${pCarrito.id}" class="card" style="width: 18rem;">
        <img src="${pCarrito.imagen}" class="card-img-top" height=300px alt="">
        <div class="card-body">
            <h5 class="card-title">${pCarrito.producto}</h5>
            <p class="card-text">${pCarrito.precio}.</p>
            <a href="#" id="elimiarcarrito${pCarrito.id}" class="btn btn-primary">eliminar</a>
        </div>
        </div> `
    })
    cardsdiv.innerHTML += `
        <div id="precioTotal" style= "width:100%" >
        
        </div> 
        `
    calcularTotal(array)
    array.forEach((pCarrito) => {
        document.getElementById(`elimiarcarrito${pCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`${pCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find((p) => p.id == pCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))

            calcularTotal(array)

        })
    })

}

function mostrarForm() {
    cardsdiv.innerHTML = ""
    let formProducto = document.createElement("div")
    formProducto.innerHTML = `<form action="">
    <input id="formProducto" type="text" placeholder="nombre del producto" aria-label="producto">
    <input  id="formPrecio" type="number" placeholder="precio del producto" aria-label="$">
    <input id="formimegen" type="file" placeholder="elegi una foto de tu producto" aria-label="foto">
    <input id="submitForm" type="submit"  aria-label="cargar">
</form>`
    cardsdiv.appendChild(formProducto)
    let botonForm = document.getElementById("submitForm")
    botonForm.addEventListener("click", (e) => {
        e.preventDefault()
        agregarProducto(productos)
    })


}

function agregarProducto(array) {
    let productoIngresado = document.getElementById("formProducto")
    let precioIngresado = document.getElementById("formPrecio")
    let imagenIngresado = document.getElementById("formimegen")
    const producto7 = new Producto(array.length + 1, productoIngresado.value, precioIngresado.value, imagenIngresado)
    array.push(producto7)
    console.log(productos)
    localStorage.setItem("productos", JSON.stringify(array))
    mostrarProducto(array)
    productoIngresado.value = ""
    imagenIngresado.value = ""
    precioIngresado.value = ""
    Toastify(
        {
            text: `El producto ${producto7.producto} se ha agregado`,
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                color: "white",
                background: "green"
            }
        }
    ).showToast()

}

function calcularTotal(array) {

    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    console.log(total)
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` : precioTotal.innerHTML = `El total es <strong>${total}</strong> <a href="#" id="finalizar" class="btn btn-primary">Comprar</a>`
    let botonComprar = document.getElementById("finalizar")
    botonComprar.addEventListener("click", () => {
        finalizarCompra(productosCarrito)
    })

}

function finalizarCompra(array) {
    console.log("ando")
    swal.fire({
        title: "¿esta seguro que desea realizar la compra?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "si,seguro",
        cancelButtonText: "no,no quiero",
        confirmButtonColor: "green",
        cancelButtonColor: "red",
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire({
                title: "compra realizada",
                icon: "success",
                text: "la compra se ha sido realizada",
                confirmButtonColor: "green",
                timer: 3500
            })
        productosCarrito = []
        localStorage.removeItem("carrito")
        cargarCarrito(productosCarrito)
        } else {
            swal.fire({
                title: "compra no realizada",
                icon: "info",
                text: "la compra no ha sido realizada",
                confirmButtonColor: "green",
                timer: 3500
            })
        }
    })
}

let cardsdiv = document.getElementById("cards")
let mostrarCatalogo = document.getElementById("catalogo")
let botonProductoRemeras = document.getElementById("btnRemeras")
let botonProductoPosters = document.getElementById("btnposters")
let botonProductoAccesorios = document.getElementById("btnAccesorios")
let btnCarrito = document.getElementById("btncarrito")
let botonVenderProducto = document.getElementById("btnVender")

const productos = []
localStorage.setItem("productos", productos)

let productosCarrito
if (localStorage.getItem("carrito")) {
    productosCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosCarrito = []
    localStorage.setItem("carrito", productosCarrito)
}

const cargarProductos = async () => {
    const res = await fetch("./base.json")
    const datos = await res.json()
    for (let prod of datos) {
        let prodDatos = new Producto(prod.id, prod.producto, prod.precio, prod.imagen)
        productos.push(prodDatos)
        localStorage.setItem("productos", JSON.stringify(productos))
    }
}

if (localStorage.getItem("productos")) {
    for (let prod of JSON.parse(localStorage.getItem("productos"))) {
        let prodStock = new Producto(prod.id, prod.producto, prod.precio, prod.imagen)
        productos.push(prodStock)
    }
} else {
    cargarProductos()
}

mostrarCatalogo.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarProducto(productos)
})

botonProductoRemeras.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto(productos, "Remera estampada")
})
botonProductoAccesorios.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto(productos, "Accesorios")
})
botonProductoPosters.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto(productos, "Poster")
})

botonVenderProducto.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarForm()
})

btnCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    cargarCarrito(productosCarrito)
})

