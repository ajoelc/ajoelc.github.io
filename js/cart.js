const userID = 25801;
const urlProdN = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`;
let cartContent = document.getElementById('tableCart');

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
    cargarCarrito();
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
            <th>${prod[4]} <span id='subt_${prod[0]}'>${prod[2]*prod[3]}</span></th>
            <th><svg class='deleteProd' onclick='eliminarDeCarrito(${prod[0]})' type='button' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg></th>
        </tr>
    `;
    cartContent.innerHTML += contenidoHTML;
}

/**
 * Carga todos los elementos del LS en el carrito que cumplan ser del usuario logueado
 */
function cargarCarrito(){
    getJSONData(urlProdN).then(result=>{
        if(result.status == 'ok'){
            result = result.data['articles'];
            result.forEach(prod => {
                addToTable((Object.values(prod)));
            });
    
            let i = 0;
            let arrayCarrito = [];
    
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
                    id = inputsArray[j].id.split('_')[1];
                    cant = document.getElementById(`input_${id}`).value;
                    precio = document.getElementById(`precio_${id}`).innerHTML.split(' ');
                    precio[1] = parseInt(precio[1])
                    actualizarCantCarrito(id,inputsArray[j].value)
                    actualizarSubtotal(id,precio[1],cant)
                })
            } 
        }
    });
}



document.addEventListener("DOMContentLoaded", function(){
    cargarCarrito();
    configurarNavBar();
});