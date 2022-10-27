const userID = 25801;
const urlProdN = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`;

let cartContent = document.getElementById('tableCart');
let totalProductos = document.getElementById("precioTotalProductos");
let costoEnvio = document.getElementById("precioEnvio");
let precioTotal = document.getElementById("precioTotal");

let premium = document.getElementById("premium")
let express = document.getElementById("express")
let standard = document.getElementById("standard")
let radios = [premium,express,standard]

let tarjeta = document.getElementById("opCredito");
let transferencia = document.getElementById("opTransferencia");
let iptBanco = document.getElementsByClassName('iptPagoBanco');
let iptCredito = document.getElementsByClassName('iptPagoTarjeta');

let textoSeleccionPago = document.getElementById("textoSeleccionPago");

let formEnvio = document.getElementById("formularioEnvio");
let iptValidar = document.getElementsByClassName("iptValidar");

let total = 0;
let porc = 0.15;
let totalEnvio = 0;
let totalProds = 0;

carrito = JSON.parse(localStorage.getItem('carrito'));
if (!carrito){
    carrito = {};
    carrito[mail] = {
        cantidad : 0
    };
}

/**
 * Cambia en la pagina del carrito el subtotal y pone costo*cant
 * @param {int} id 
 * @param {int} costo 
 * @param {int} cant 
 */
function actualizarSubtotal(id,costo,cant){
    document.getElementById(`subt_${id}`).innerHTML = costo*cant;
}



/**
 * Cambia en el carrito (LS) la cantidad del producto id segun cant
 * @param {int} id 
 * @param {int} cant 
 */
function actualizarCantCarrito(id,cant){
    
    //console.log(carrito)
    if(estaEnCarrito(id)){
        carrito[mail][id].cant = cant;
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }
}

/**
 * Carga todos los elementos del LS en el carrito que cumplan ser del usuario logueado
 */
 function cargarCarritoLS(){
    let i = 0;
    let carritoMail = carrito[mail]
    for (const property in carritoMail) {
        if(property != 'cantidad')
            addToTable(carritoMail[property])
      }

    let inputsArray = document.getElementsByClassName('cantCart');
    
    for (let j = 0; j< inputsArray.length; j++){
        inputsArray[j].addEventListener('change',function(){
            let num = inputsArray[j].value;
            if (num % 1 > 0)
                inputsArray[j].value = Math.round(inputsArray[j].value)
            else if(num < 1)
                inputsArray[j].value = 1

            
            id = inputsArray[j].id.split('_')[1];
            cant = document.getElementById(`input_${id}`).value;
            precio = document.getElementById(`precio_${id}`).innerHTML.split(' ');
            precio[1] = parseInt(precio[1])
            actualizarCantCarrito(id,inputsArray[j].value)
            actualizarSubtotal(id,precio[1],cant)
            
            cargarSubtotalProductos();
            actualizarTotales()
        })
    } 
    actualizarTotales()
}

/**
 * Elimina del carrito (LS) al elemento id y reorganiza los nombres.
 ** Si se borra prod(i), ahora prod(i+1) = prod(i) y asi hacia adelante
 * @param {int} id 
 */
function eliminarDeCarrito(id){
    delete carrito[mail][id];
    carrito[mail].cantidad -= 1;
    localStorage.setItem('carrito',JSON.stringify(carrito));
    
    window.location = window.location.href
}

function vaciarCarrito(){
    delete carrito[mail];
    carrito[mail] ={cantidad:0};
    carrito = JSON.stringify(carrito)
    if (carrito!={})
        localStorage.setItem('carrito',carrito);
    else
        localStorage.removeItem('carrito');
}


/**
 * Añade a la tabla del carrito al elemento prod
 * @param {Array} prod 
 */
function addToTable(prod){
    let contenidoHTML = `
        <tr class='align-middle'>
            <th scope="row">
                <img src="${prod.img}" class='img-cart'></img>
            </th>
            <td>${prod.name}</td>
            <td id="precio_${prod.id}">${prod.currency} ${prod.cost}</td>
            <td>
                <input id='input_${prod.id}' class="cantCart" min='1' type="number" value="${prod.cant}">
            </td>
            <th>${prod.currency} <span id='subt_${prod.id}' data-current='${prod.currency}' class="subtotal">${prod.cant*prod.cost}</span></th>
            <th><svg class='deleteProd' onclick='eliminarDeCarrito("${prod.id}")' type='button' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg></th>
        </tr>
    `;
    cartContent.innerHTML += contenidoHTML;
}

function cargarCarritoServidor(){
    getJSONData(urlProdN).then(result=>{
        if(result.status == 'ok'){
            result = result.data['articles'];
            result.forEach(prod => {
                addToTable((Object.values(prod)));
            });
        }
    });
}

function cargarSubtotalProductos(){
    let subtotales = document.getElementsByClassName("subtotal");
    totalProds = 0;
    for (let subt of subtotales) {
        precio = parseInt(subt.innerHTML)
        if(subt.dataset.current != 'USD')
            precio /= 40;
        totalProds+=precio;
    }
    totalProductos.innerHTML = `USD ${totalProds.toFixed(2)}`;
}


function validaciones(form,event,fromSubmit = true){
    let inputVencimiento = document.getElementById('vencimiento');

    //Para que la fecha de vencimiento mínima sea hoy
    let fecha = new Date();
    let anioMin = fecha.getFullYear().toString();
    let anioMax = (fecha.getFullYear() + 100).toString();
    let mes  = (fecha.getMonth() + 1).toString();
    inputVencimiento.setAttribute('min',anioMin+'-'+mes);
    inputVencimiento.setAttribute('max',anioMax+'-'+mes);
    /////////////////////////////////////////////////

    let noMostrar = true;

    if(transferencia.checked)
        for (let i = 0;i<iptBanco.length;i++){
            iptBanco[i].disabled = false;
            noMostrar = noMostrar && iptBanco[i].checkValidity();
            
        }
    else if(tarjeta.checked)
        for(let i = 0;i<iptCredito.length;i++){
            iptCredito[i].disabled = false;
            noMostrar = noMostrar && iptCredito[i].checkValidity();
        }
    else
        noMostrar = false;
        
    if (!form.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }
    else if(fromSubmit){
        sessionStorage.setItem('comprado',1);
        vaciarCarrito();
    }

    if(noMostrar)
        document.getElementById('invalid-Pago').style.display = 'none';
    
    else    
        document.getElementById('invalid-Pago').style.display = 'inline';

    
    form.classList.add('was-validated');
}

function actualizarTotales(){
    totalEnvio = porc*totalProds
    costoEnvio.innerHTML = `USD ${totalEnvio.toFixed(2)}` 
    precioTotal.innerHTML = `USD ${(totalProds+totalEnvio).toFixed(2)}`
}


document.addEventListener("DOMContentLoaded", function(){
    configurarNavBar();
    //cargarCarritoServidor();
    cargarCarritoLS();
    cargarSubtotalProductos();
    actualizarTotales();

   if(sessionStorage.getItem('comprado')){
        sessionStorage.removeItem('comprado');
        document.getElementById('alertaComprado').classList.add('show');
   }

    //Si no hay elementos en el carrito
    if(carrito[mail].cantidad == 0){
        document.getElementById("botonFinalizarCompra").disabled = true;
        document.getElementById("mensajeCarritoVacio").style.display = '';
    }

    radios.forEach(radio => {
        radio.addEventListener("change",function(){
            switch (radio.id) {
                case 'premium':
                    porc = 0.15
                    break;
                case 'express':
                    porc = 0.07
                    break;
                case 'standard':
                    porc = 0.05
                    break;
            }
            actualizarTotales();
        })
    });

    transferencia.addEventListener("change",function(){
        for (const ipt of iptBanco) {
            ipt.disabled = false;
        }
        for (const ipt of iptCredito) {
            ipt.disabled = true;
        }

        textoSeleccionPago.innerHTML = 'Transferencia bancaria';
        
    });

    tarjeta.addEventListener("change",function(){
        for (const ipt of iptBanco) {
            ipt.disabled = true;
        }

        for (const ipt of iptCredito) {
            ipt.disabled = false;
        }

        textoSeleccionPago.innerHTML = 'Tarjeta de crédito';
    });

    formEnvio.addEventListener("submit",function(event1){
        validaciones(formEnvio,event1);
        
        for (let ipt of iptValidar) {
            ipt.addEventListener("input",function(event2){
                validaciones(formEnvio,event2,false);
            });
        }
        
    });
});