class Cliente {
    constructor (nombre, apellido, edad, dni){
        this.nombre= nombre,
        this.apellido= apellido,
        this.edad= edad,
        this.dni= dni
        
    }
    saludo(){
        alert(`bienvenido ${this.nombre} al banco A ver si ahorra`)
    } 
}

function buscarUsuario(array){
    let dniBuscado= prompt ("ingrese su numero de DNI para ver su perfil")
    let busqueda = array.filter(
        (dato) => dato.dni == dniBuscado 
    )
    if (busqueda == undefined ){
        alert("su perfil no se encuentra registrado")
    }else{
        alert("su nombre es " + nombre + " su apellido es " + apellido + " y su DNI es " + dni )
    }
}

function validarDatos(num){
    while(isNaN(num)){
        num= parseInt(prompt('el valor ingresado no es numerico, vuelva a intentarlo'));
    }
    return num
}
function minimoDias(x){
    while(x<30){
        x= parseInt(prompt(`la cantidad de dias minima es de 30, vuelva a ingresar la cantidad de dias`));
        break
    }
    return x 
}

function calculo (inversion, dias, intereses){
    let tasa= (intereses/365)*dias;
    return  inversion+((inversion*tasa)/100);
}

alert('Bienvenido al simulador de plazo fijo del banco AverSiAhorra')
let nombreIngresado= prompt("ingrese su nombre")
let apellidoIngresado= prompt("ingrse su apellido")
let edadIngresada= prompt("ingrese su edad")
let dniIngresado= prompt("ingrese su numero de dni")

let cliente1= new Cliente( nombreIngresado, apellidoIngresado, edadIngresada, dniIngresado)

const clientes=[]

clientes.push(cliente1)

buscarUsuario(clientes)

console.log (clientes)

let inversion= parseInt( prompt('ingrese el monto que desea invertir'))
let inversionV= validarDatos(inversion)
if(inversionV != 0 || inversion <= 0 ){
    if (inversion <= 0){
        while(true){
            inversion= parseInt( prompt('El Monto ingresado tiene que ser mayor a 0, por favor ingrese el monto que desea invertir'))
            break
        }
    }
    else if (inversionV != 0){
        inversion= inversionV
    }

}

let dias= parseInt(prompt('ingrese la cantidad de dias del plazo fijo'))
let diasV= validarDatos(dias)
if (diasV != 0){
    dias=diasV
}
let diasM=minimoDias(dias)
if (diasM != 0){
    dias=diasM
}
let intereses= parseInt(75)
let respuesta= calculo(inversion, dias, intereses)
let parcialx=0

for ( let i= 1; i <= 12; i++ ){  
    
    let tasa = intereses/12
    let respuesta2= (inversion*tasa)/100
    parcialx= parcialx + respuesta2
    
 }
 total = inversion + parcialx

alert(`el rendimiento de su inversion de ${inversion} pesos, en un plazo de ${dias} dias, es de ${respuesta}, el interes compuesto en un plazo de 12 meses es de ${total}`)
