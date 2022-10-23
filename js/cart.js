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
    esta = estaEnCarrito(id);
    if(esta[0]){
        prod = esta[0]
        prod = prod.split(',')
        prod[2] = cant
        localStorage.setItem(`miProd${esta[1]}`,prod);
    }
}

/**
 * Carga todos los elementos del LS en el carrito que cumplan ser del usuario logueado
 */
 function cargarCarritoLS(){
    let i = 0;
    arrayCarrito = [];
    while(localStorage.getItem(`miProd${i}`)){
        arrayCarrito.push(localStorage.getItem(`miProd${i}`));
        i++;
    }
    
    arrayCarrito.forEach(producto => {
        producto = producto.split(',');
        if(producto[producto.length-1] == localStorage.getItem('mail'))
        addToTable(producto);
    });

    let inputsArray = document.getElementsByClassName('cantCart');
    
    for (let j = 0; j< inputsArray.length; j++){
        inputsArray[j].addEventListener('input',function(){
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
    esta = estaEnCarrito(id);
    localStorage.removeItem(`miProd${esta[1]}`);

    let i = esta[1]+1;
    let actual = localStorage.getItem(`miProd${i}`);
    while(actual && actual.split(',')[0] != id){
        localStorage.removeItem(`miProd${i}`);
        localStorage.setItem(`miProd${i-1}`,actual)
        i++;
        actual = localStorage.getItem(`miProd${i}`);
    }
    cartContent.innerHTML = '';
    window.location = window.location.href
}


/**
 * Añade a la tabla del carrito al elemento prod
 * @param {Array} prod 
 */
function addToTable(prod){
    let contenidoHTML = `
        <tr class='align-middle'>
            <th scope="row">
                <img src="${prod[5]}" class='img-cart'></img>
            </th>
            <td>${prod[1]}</td>
            <td id="precio_${prod[0]}">${prod[4]} ${prod[3]}</td>
            <td>
                <input id='input_${prod[0]}' class="cantCart" min='1' type="number" value="${prod[2]}">
            </td>
            <th>${prod[4]} <span id='subt_${prod[0]}' data-current='${prod[4]}' class="subtotal">${prod[2]*prod[3]}</span></th>
            <th><svg class='deleteProd' onclick='eliminarDeCarrito(${prod[0]})' type='button' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
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
    totalProductos.innerHTML = `USD ${totalProds}`;
}


function validaciones(form,event){
    // Condiciones para que NO se envíe el formulario:
    // -a or -b o
    let res = true;
    if (!form.checkValidity() || textoSeleccionPago.innerHTML == 'No ha seleccionado'){
        event.preventDefault();
        event.stopPropagation();
        document.getElementById('invalid-Pago').style.display = 'block';
        res = false;
    }
    form.classList.add('was-validated');
    return res;
}

function actualizarTotales(){
    totalEnvio = porc*totalProds
    costoEnvio.innerHTML = `USD ${totalEnvio}` 
    precioTotal.innerHTML = `USD ${totalProds+totalEnvio}`
}


document.addEventListener("DOMContentLoaded", function(){
    configurarNavBar();
    //cargarCarritoServidor();
    cargarCarritoLS();
    cargarSubtotalProductos();
    actualizarTotales();

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
        textoSeleccionPago.innerHTML = 'Transferencia Bancaria';
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
        if(validaciones(formEnvio,event1)){
            event1.preventDefault()
            event1.stopPropagation()
            console.log()
            document.getElementById('alertaComprado').classList+=' show';
        }
        for (let ipt of iptValidar) {
            ipt.addEventListener("input",function(event2){
                validaciones(formEnvio,event2);
            });
        }
        
    },false);
});