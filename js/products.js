let catID = localStorage.getItem('catID');
const url = 'https://japceibal.github.io/emercado-api/cats_products/'+catID+'.json'

let data;
let botonRelevancia = document.getElementById("sortRelevancia");
let botonFiltrar = document.getElementById("botonFiltrar");
let botonLimpiar = document.getElementById("botonLimpiar");
let botonAsc = document.getElementById("sortAsc");
let botonDes = document.getElementById("sortDes");
let buscador = document.getElementById("buscador");
let buscadorInput = '';

let min = '';
let max = '';

function mostrarProductos(array){
    let contenidoHTML = "";
    for(let i = 0;i < array.length; i++){
        let prod = array[i];
        let precioProd = parseInt(prod.cost);
        if(((min == '' && max == '') || (precioProd >= parseInt(min) && precioProd <= parseInt(max)) ||
            (min == '' && precioProd <= parseInt(max)) || (precioProd >= parseInt(min) && max == '')) &&
            ((buscadorInput == '') || ((prod.description.toLowerCase()).includes(buscadorInput)) || ((prod.name.toLowerCase()).includes(buscadorInput)))){
            contenidoHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + prod.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ prod.name +` - ` + prod.currency + ` ` + prod.cost +`</h4> 
                            <p> `+ prod.description +`</p> 
                            </div>
                            <small class="text-muted">` + prod.soldCount + ` vendidos</small> 
                        </div>

                    </div>
                </div>
            </div>
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

function mostrarSaludo(){
    let nombre = localStorage.getItem('nombre');
    if(nombre) return nombre;
    else return localStorage.getItem('mail')
}


document.addEventListener("DOMContentLoaded",function(e){
    document.getElementById("usuario").innerHTML = 'Hola, ' + mostrarSaludo() + '!';
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
        min = (document.getElementById("priceMin")).value;
        max = (document.getElementById("priceMax")).value;
        mostrarProductos(data.products);
    });

    botonLimpiar.addEventListener("click",function(){
        min = '';
        max = '';
        mostrarProductos(data.products);
    })
    
    buscador.addEventListener("input",function(){
        buscadorInput = (buscador.value).toLowerCase()
        mostrarProductos(data.products);
    })
})