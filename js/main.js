//Estado inicial del array de objetos
const baseDeDatos = [];

//Declaracion de variables necesarias
let count = 0;
let categoria = "";
let valor = "";
const listaDeCategorias = [];
const listaDeValores = [];
let confirmacion=true;
let nombreDelProducto="";

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


alert('Bienvenido al sistema de bases de datos Culture, donde armamos su base de datos a su gusto.')
categoria = prompt('Por favor, ingrese una categoria para su producto:').toLowerCase();

cargarPropiedades();

while(confirmacion){
    cargarValores();
    const producto = new Producto(listaDeCategorias,listaDeValores);
    baseDeDatos.push(producto);
    console.log(baseDeDatos);
    
    listaDeValores.length = 0;

    if(prompt("Quiere seguir agregando productos a la base de datos? (SI/NO)").toUpperCase()=="SI"){
        confirmacion=true; 
        count++;
    }else{
        while(confirmacion){
            switch(prompt('Que desea hacer a continuación? (CARGAR mas productos, QUITAR productos, SALIR)').toLowerCase()){
                case "cargar":
                    cargarValores();
                    const producto = new Producto(listaDeCategorias,listaDeValores);
                    baseDeDatos.push(producto);
                    console.log(baseDeDatos);
                    break;
                case "quitar":
                    quitarProducto(nombreDelProducto = prompt("Escriba el nombre del producto a eliminar:").toLowerCase());
                    break;
                case "salir":
                    confirmacion=false; 
                    alert('Muchas gracias por utilizar nuestros servicios.')
                    break;
            }
        }
    }
}
