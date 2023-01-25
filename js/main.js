//Declaración de variables necesarias
let nota = 0;
let sumaDeNotas = 0;
let contador = 0;
let resultado = 0;
let acumulador = 0;
//Funcion que solicita nuevamente el nombre
function reSolicitarNombre(){
    nombreIngresado = prompt("Ingrese el nombre del siguiente alumno. Para finalizar la carga de datos, ingrese SALIR");
}
//Funcion que suma las notas
function sumarNotas(valor){
    sumaDeNotas+=valor;
}
//Funcion que calcula el promedio
function promedio(suma,cantidad){
    resultado = suma / cantidad;
}


let nombreIngresado = prompt("Ingrese el nombre del alumno. Para finalizar la carga de datos, ingrese SALIR");

while(nombreIngresado !== "SALIR"){
    nota = parseInt(prompt("Ingrese la primer nota"));

    while(nota < 1 || nota > 10){
        alert("La nota no puede ser más de 10 o menos de 1, intente nuevamente.");
        nota = parseInt(prompt("Ingrese la primer nota"));
    }
    sumarNotas(nota);
    nota = parseInt(prompt("Ingrese la segunda nota"));

    while(nota < 1 || nota > 10){
        alert("La nota no puede ser más de 10 o menos de 1, intente nuevamente.");
        nota = parseInt(prompt("Ingrese la segunda nota"));
    }
    sumarNotas(nota);
    nota = parseInt(prompt("Ingrese la tercer nota"));

    while(nota < 1 || nota > 10){
        alert("La nota no puede ser más de 10 o menos de 1, intente nuevamente.");
        nota = parseInt(prompt("Ingrese la tercera nota"));
    }
    sumarNotas(nota);

    promedio (sumaDeNotas,3);
    alert("La nota final de "+nombreIngresado+" es "+resultado.toPrecision(3)+".");

    contador=contador+1;
    acumulador+=resultado;
    sumaDeNotas=0;
    reSolicitarNombre();
}

promedio(acumulador,contador);

alert("La cantidad final de alumnos ingresados fue "+contador+". El promedio general de los alumnos fue de "+resultado.toPrecision(3)+".")

alert("Gracias por utilizar nuestros servicios. Vuelva pronto!");