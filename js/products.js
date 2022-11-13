let catID = localStorage.getItem('catID');
const url = PRODUCTS_URL + catID+'.json'

let data;
let botonRelevancia = document.getElementById("sortRelevancia");
let botonFiltrar = document.getElementById("botonFiltrar");
let botonLimpiar = document.getElementById("botonLimpiar");
let botonAsc = document.getElementById("sortAsc");
let botonDes = document.getElementById("sortDes");
let buscador = document.getElementById("buscador");
let buscadorInput = '';
let elems = [];

let min = parseInt('');
let max = parseInt('');

function mostrarProductos(array){
    let contenidoHTML = "";
    for(let i = 0;i < array.length; i++){
        let prod = array[i];
        let precioProd = parseInt(prod.cost);
        if(!((precioProd < min) || (precioProd > max)) &&
            ((buscadorInput == '') || ((prod.description.toLowerCase()).includes(buscadorInput)) || ((prod.name.toLowerCase()).includes(buscadorInput)))){
            contenidoHTML += `
            <a href="#" style="display:flex; text-decoration:none; color:black">
            <div onclick="guardarRedirigir(${prod.id});" class=" list-group-item-action" id="${prod.id}">
                <div class="row">
                    <div class="col-3 rounded no-border">
                        <img src="${prod.image}" alt="product image" class="w-100 p-0 m-0">
                    </div>
                    <div class="col-9">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4> ${prod.name} - ${prod.currency} ${prod.cost}</h4> 
                            <p> ${prod.description}</p> 
                            </div>
                            <small class="text-muted">${prod.soldCount} vendidos</small> 
                        </div>
                    </div>
                </div>
            </div>
            </a>
            <hr>
            `
        }
    }
    if(contenidoHTML == ''){
        contenidoHTML = `
        <div class="list-group-item container center">
            <h4 id="textoNF">No se han encontrado productos con esas características</h4>
            <img src="img/sad.png" class="center" id="notFound"></img>
        </div>
        `
    }
    document.getElementById("productos").innerHTML = contenidoHTML; 
}


document.addEventListener("DOMContentLoaded",function(e){
    configurarNavBar('categories');

    getJSONData(url).then(function(resultObj){
        data = resultObj.data;
        if(resultObj.status === "ok"){
            document.getElementById("categoria").innerHTML = `Aquí puedes encontrar todos nuestros productos de la categoría ` + data.catName;
            mostrarProductos(data.products);
        }
        else{
            alert("Ha ocurrido un error ("+arrayProducts+")");
        }
    });

    botonRelevancia.addEventListener("click",function(){
        (data.products).sort(function(a,b){
            return b.soldCount - a.soldCount;
        })
        mostrarProductos(data.products);
    });

    botonAsc.addEventListener("click",function(){
        (data.products).sort(function(a,b){
            return a.cost - b.cost;
        })
        mostrarProductos(data.products);
    });

    botonDes.addEventListener("click",function(){
        (data.products).sort(function(a,b){
            return b.cost - a.cost;
        })
        mostrarProductos(data.products);
    });

    botonFiltrar.addEventListener("click",function(){
        min = parseInt((document.getElementById("priceMin")).value);
        max = parseInt((document.getElementById("priceMax")).value);
        mostrarProductos(data.products);
    });

    botonLimpiar.addEventListener("click",function(){
        min = parseInt('');
        max = parseInt('');
        document.getElementById("priceMin").value = min;
        document.getElementById("priceMax").value = max;
        mostrarProductos(data.products);
    });
    
    buscador.addEventListener("input",function(){
        buscadorInput = (buscador.value).toLowerCase()
        mostrarProductos(data.products);
    });
    
})