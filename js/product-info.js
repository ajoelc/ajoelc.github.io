let prodID = localStorage.getItem("idProd");
const urlProd = `https://japceibal.github.io/emercado-api/products/${prodID}.json`
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
let infoProd = []
let imagenPrincipal;

function mostrarInfoProducto(prod){
    document.getElementById("nameCat").innerHTML = prod.category
    document.getElementById("nameProd").innerHTML = prod.name;
    document.getElementById("descriptionProd").innerHTML = prod.description;
    document.getElementById("contenedorImg").innerHTML =`
    <img id="imagenPrincipal" src="" alt="Imagen principal"></img>
    `;
    imagenPrincipal = document.getElementById("imagenPrincipal");
    imagenPrincipal.setAttribute("src",prod.images[0]);

    for(let i = 0;i < prod.images.length;i++){
        document.getElementById("allImages").innerHTML+=`
            <div>
                <a href="#">
                <img class="img-thumbnail" src="${prod.images[i]}"></img>        
                </a>
            </div>
        `;
    }
    
    let imagenes = document.getElementsByClassName("img-thumbnail");
    for(let i = 0;i < imagenes.length;i++){
        imagenes[i].addEventListener("mouseover",function(){
            imagenPrincipal.setAttribute("src",imagenes[i].src);
        })
    }

    document.getElementById("costProd").innerHTML = `${infoProd.currency} ${infoProd.cost}`
    if(infoProd.soldCount > 0)
        document.getElementById("soldProd").innerHTML = `¡ya se han vendido ${infoProd.soldCount}!`;
    else
    document.getElementById("soldProd").innerHTML = `Sé la primera en comprarlo`;   
}

function mostrarComentarios(){
    getJSONData(urlComents).then(function(resultObj){
        if(resultObj.status === "ok"){
            let coments = resultObj.data;
            let contenido = document.getElementById("comentarios");
            if(!coments.length) contenido.innerHTML = 'Todavía no hay comentarios';
            else 
                for(let i = 0;i<coments.length;i++){
                    let puntaje = coments[i].score;
                    let estrellasHTML =``;
                    for(let j = 0;j<5;j++){
                        if(puntaje>0)
                            estrellasHTML+=`<span class="fa fa-star checked"></span>`;
                        else
                            estrellasHTML+=`<span class="fa fa-star"></span>`;
                        puntaje--;
                    }
                    
                    
                    contenido.innerHTML+=`
                    
                    <div>
                        <p class="datosComentario">
                            <span class="user">${coments[i].user}</span>
                            •
                            <span class="date">${coments[i].dateTime}
                        
                            </p>
                        <p class="comentario">
                            ${coments[i].description}
                        </p>
                    </div>
                    `;

            }
        }
    })
}

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("usuario").innerHTML = 'Hola, ' + mostrarSaludo() + '!';

    let categoriesMenu = document.getElementById("categories-menu");
    getShowCategories(categoriesMenu);
    document.getElementById("categories-menu").addEventListener("click",function(e){
        localStorage.setItem("catID",e.target.id)
    })
    
    getJSONData(urlProd).then(function(resultObj){
        if(resultObj.status === "ok"){
            infoProd = resultObj.data;
            mostrarInfoProducto(infoProd);
            mostrarComentarios();
        }
    }); 
})