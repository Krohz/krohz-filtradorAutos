//Buscador de autos
document.getElementById("buscador").reset();
//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultado = document.querySelector("#resultado");


const anoMax = new Date().getFullYear();
const anoMin = anoMax - 12;


//Generar objeto con los parametros de busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: "",
    maximo: "",
    puertas: "",
    color: '',
    transmision: ''
}

//Eventos
document.addEventListener("DOMContentLoaded",()=>{
    mostrarAutos(autos); // Muestra los datos al cargar la pagina

    //Llena las opciones de años
    llenarSelect();
})
//Eventos para los selects
marca.addEventListener("change", (e)=>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

//desde que se recogen los datos cambiarlos a numeros
year.addEventListener("change", (e)=>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});
minimo.addEventListener("change", (e)=>{
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
});
maximo.addEventListener("change", (e)=>{
    datosBusqueda.maximo = parseInt(e.target.value);

    filtrarAuto();
});
puertas.addEventListener("change", (e)=>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});
transmision.addEventListener("change", (e)=>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});
color.addEventListener("change", (e)=>{
    datosBusqueda.color = e.target.value;

    console.log(datosBusqueda);

    filtrarAuto();

});

//Funciones
function mostrarAutos(autos){

    limpiarHTML();


    autos.forEach((auto)=>{
        //descructuring
        const {marca, modelo ,precio, year, puertas, color, transmision } = auto;

        const autoHTML = document.createElement("p");
        autoHTML.textContent = `Marca:${marca}-Modelo:${modelo}-Año:${year}-Precio:${precio}-Puertas:${puertas}-Color:${color}-Transmision:${transmision}`

        //Insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpia el HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


//Genera los años del select
function llenarSelect(){
    for(let i=anoMax; i>anoMin ; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//funcion para filtrar auto
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    }else{
        noResultados();
    }
}

function noResultados(){

    limpiarHTML();

    const noHayResultados = document.createElement("div");
    noHayResultados.classList.add("alerta", "error");
    noHayResultados.textContent = "No hay resultados, prueba con otros terminos de busqueda! ";
    resultado.appendChild(noHayResultados);
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }else{
        return auto;
    }
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }else{
        return auto;
    }
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }else{
        return auto;
    }
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }else{
        return auto;
    }
}

function filtrarPuerta(auto){
    if (datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    }else{
        return auto;
    }
}

function filtrarTransmision(auto){
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }else{
        return auto;
    }
}

function filtrarColor(auto){
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }else{
        return auto;
    }
}

