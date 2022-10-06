const urlProdN = `https://japceibal.github.io/emercado-api/products/`;
let cartContent = document.getElementById('tableCart');

function estaEnCarrito(id){
    let i=0;
    let actual = localStorage.getItem(`miProd${i}`);
    while(actual && actual.split(',')[0] != id){
        i++;
        actual = localStorage.getItem(`miProd${i}`);
    }
    return [actual,i]
}

function agregarAlCarrito(id){
    esta = estaEnCarrito(id)
    if (!esta[0]){
        let i = esta[1];
        let producto = [id,1];
        localStorage.setItem(`miProd${i}`,producto);
    }
    else{
        alert('EL PRODUCTO YA ESTA EN EL CARRITO!');
    }
}

function actualizarCantCarrito(id,cant){
    esta = estaEnCarrito(id);
    if(esta[0]){
        producto = [id,cant]
        localStorage.setItem(`miProd${esta[1]}`,producto);
    }
}

function addToTable(infoProd,prod,i){
    let elem = document.createElement('tr');

    contenidoHTML = `
        <tr class='align-middle'>
            <th scope="row">
                <img src="${infoProd.images[0]}" class='img-cart'></img>
            </th>
            <td>${infoProd.name}</td>
            <td>${infoProd.currency} ${infoProd.cost}</td>
            <td>
                <input class="cantCart" id='cantCart${i}' min='1' type="number" value="${prod[1]}">
            </td>
            <th>${infoProd.currency} <span id='costCart${i}'>${prod[1]*infoProd.cost}</span></th>
        </tr>
    `;
    elem.innerHTML = contenidoHTML
    cartContent.appendChild(elem);

    cantCart = document.getElementById(`cantCart${i}`);
    costCartContainer = document.getElementById(`costCart${i}`);
    
    cantCart.addEventListener('input',function(){
        actualizarCantCarrito(prod[0],cantCart.value);
        costCartContainer.innerHTML = cantCart.value*infoProd.cost
    });
}

function cargarCarrito(){
    let i = 0;
    let arrayCarrito = []
    let contenidoHTML = '';
    while(localStorage.getItem(`miProd${i}`)){
        arrayCarrito.push(localStorage.getItem(`miProd${i}`));
        i++;
    }
    i = 1
    arrayCarrito.forEach(prod => {
        prod = prod.split(',');
        let urlProducto = urlProdN + prod[0] +'.json';
        let cantCart;
        let costCartContainer;
        getJSONData(urlProducto).then(function(resultObj){
            if(resultObj.status === "ok"){
                infoProd = resultObj.data;
                addToTable(infoProd,prod,i);
                i++;
            }
        });
    });
        
        
    
}

cargarCarrito();

document.addEventListener("DOMContentLoaded", function(){
    configurarNavBar();

});