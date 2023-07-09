class Producto {
    constructor (id, producto, precio, imagen){
        this.id= id,
        this.producto= producto,
        this.precio= precio,
        this.imagen= imagen 
    }
}

// 

// function validarDatos(num){
//     while(isNaN(num)){
//         num= parseInt(prompt('el valor ingresado no es numerico, vuelva a intentarlo'));
//     }
//     return num
// }
// function minimoDias(x){
//     while(x<30){
//         x= parseInt(prompt(`la cantidad de dias minima es de 30, vuelva a ingresar la cantidad de dias`));
//         break
//     }
//     return x 
// }

// function calculo (inversion, dias, intereses){
//     let tasa= (intereses/365)*dias;
//     return  inversion+((inversion*tasa)/100);
// }

let producto1= new Producto("1", "Remera estampada", 3000 , "./imagenes/remera1.png")
let producto2= new Producto("2", "Remera estampada", 4000 , "./imagenes/remera2.jpg")
let producto3= new Producto("3", "poster", 1000 , "./imagenes/poster1.jpg")
let producto4= new Producto("4", "poster", 1500 , "./imagenes/poster2.jpg")
let producto5= new Producto("5", "moneda", 4000 , "./imagenes/moneda.jpg")
let producto6= new Producto("6", "termo", 3000 , "./imagenes/termo.jpg")

const productos=[]

productos.push(producto1, producto2, producto3, producto4, producto5, producto6)

let cardsdiv = document.getElementById("cards")


for( let p of productos){
    let nuevoProducto= document.createElement("div")
    nuevoProducto.innerHTML = `<div id="${p.id}" class="card" style="width: 18rem;">
                            <img src="${p.imagen}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${p.producto}</h5>
                                <p class="card-text">${p.precio}.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>`
    cardsdiv.appendChild(nuevoProducto)

}


console.log (productos)

let botonProductoRemeras = document.getElementById("btnRemeras")
let botonProductoPosters = document.getElementById("btnPosters")
let botonProductoAccesorios = document.getElementById("btnAccesorios")


function buscarProducto(array, elemento){
         
        let busqueda = array.filter(
            (dato) => dato.producto == elemento 
         )
        if (busqueda == undefined ){
            alert("este producto no existe")
        }else{
            console.log(busqueda)
            
         }
    }

let buscaRemeras = buscarProducto(productos,"Remera estampada") 
let buscarPosters =  buscarProducto(productos, "Posters")
let buscarAccesoriso = buscarProducto(productos,"Accesorios") 
botonProductoRemeras.onclick = buscaRemeras
botonProductoPosters.onclick =   buscarPosters
botonProductoAccesorios.onclick = buscarAccesoriso


// let inversion= parseInt( prompt('ingrese el monto que desea invertir'))
// let inversionV= validarDatos(inversion)
// if(inversionV != 0 || inversion <= 0 ){
//     if (inversion <= 0){
//         while(true){
//             inversion= parseInt( prompt('El Monto ingresado tiene que ser mayor a 0, por favor ingrese el monto que desea invertir'))
//             break
//         }
//     }
//     else if (inversionV != 0){
//         inversion= inversionV
//     }

// }

// let dias= parseInt(prompt('ingrese la cantidad de dias del plazo fijo'))
// let diasV= validarDatos(dias)
// if (diasV != 0){
//     dias=diasV
// }
// let diasM=minimoDias(dias)
// if (diasM != 0){
//     dias=diasM
// }
// let intereses= parseInt(75)
// let respuesta= calculo(inversion, dias, intereses)
// let parcialx=0

// for ( let i= 1; i <= 12; i++ ){  
    
//     let tasa = intereses/12
//     let respuesta2= (inversion*tasa)/100
//     parcialx= parcialx + respuesta2
    
//  }
//  total = inversion + parcialx

// alert(`el rendimiento de su inversion de ${inversion} pesos, en un plazo de ${dias} dias, es de ${respuesta}, el interes compuesto en un plazo de 12 meses es de ${total}`)
