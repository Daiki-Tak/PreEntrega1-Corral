//Estado inicial del array de objetos
const baseDeDatos = [];

//Declaracion de variables necesarias
let categoria = "";
let valor = "";
let count = 0;
let confirmacion=true;
let nombreDelProducto="";
const listaDeCategorias = [];
const listaDeValores = [];


//Funcion de carga de propiedades
function cargarPropiedades() {
    while(categoria != null) {
        listaDeCategorias.push(categoria);
        console.log(listaDeCategorias);
        categoria = prompt('Ingrese otra categoria (Para continuar, pulse Cancelar):');
        if(categoria!==null){
            categoria.toLowerCase();
        }
    }
}
//Funcion de carga de valores
function cargarValores() {
    for (let i=0;i<listaDeCategorias.length;i++) {
        valor = prompt('Ingrese un valor para la categoria '+listaDeCategorias[i]+':').toLowerCase();
        if(!isNaN(valor)) {
            parseInt(valor);
        }
        listaDeValores.push(valor);
        console.log(listaDeValores);
    }
}

//Armado de la funcion constructora
class Producto {
    constructor(lista1, lista2) {
        this.id = count;
        for (let i = 0; i < lista1.length; i++) {
            this[lista1[i]] = lista2[i];
        }
    }
}

//Función para quitar objetos del Array de Objetos
function quitarProducto(nombreDelProducto) {
    let index=baseDeDatos.indexOf(baseDeDatos.find((el)=>el[listaDeCategorias[0]]===nombreDelProducto));
    if (index!=-1) {
        baseDeDatos.splice(index,1);
    }
    console.log(baseDeDatos);
}

//Inicio del programa
alert('Bienvenido al sistema de bases de datos Culture, donde armamos su base de datos a su gusto.')
categoria = prompt('Por favor, ingrese una categoria para su producto:').toLowerCase();

//Carga de propiedades para los objetos (no se pueden editar)
cargarPropiedades();

//Carga inicial de valores para cada una de las propiedades elegidas
cargarValores();
const producto = new Producto(listaDeCategorias,listaDeValores);
baseDeDatos.push(producto);
console.log(baseDeDatos);

//Reset de valores una vez generado el objeto
listaDeValores.length = 0;
//Actualización del contador
count++;

//Interacción
while(confirmacion){
    switch(prompt('Que desea hacer a continuación? (CARGAR mas productos, QUITAR productos, SALIR)').toLowerCase()){
        case "cargar":
            //Nueva carga de valores con reset y actualización del contador
            cargarValores();
            const producto = new Producto(listaDeCategorias,listaDeValores);
            baseDeDatos.push(producto);
            console.log(baseDeDatos);
            listaDeValores.length = 0;
            count++;
            break;
        case "quitar":
            //Eliminación de un objeto en la base de datos
            quitarProducto(nombreDelProducto = prompt("Escriba el nombre del producto a eliminar:").toLowerCase());
            break;
        case "salir":
            //Salida del programa
            confirmacion=false; 
            alert('Muchas gracias por utilizar nuestros servicios.')
            break;
    }
}