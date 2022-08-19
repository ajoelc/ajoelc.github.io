const urlAutos = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

let autos = []

function mostrarProductos(array){
    let contenidoHTML = "";
    document.getElementById("categoria").innerHTML = `Aquí puedes encontrar todos nuestros productos de la categoría ` + array.catName
    for(let i = 0;i < array.products.length; i++){
        let prod = array.products[i];
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
        document.getElementById("productos").innerHTML = contenidoHTML; 
    }

}

document.addEventListener("DOMContentLoaded",function(e){
    getJSONData(urlAutos).then(function(resultObj){
        if(resultObj.status === "ok"){
            autos = resultObj.data;
            mostrarProductos(autos);
        }
        else{
            alert("Ha ocurrido un error ("+autos.data+")")
        }
    })
})