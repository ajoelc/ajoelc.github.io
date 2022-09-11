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
            if(coments.length){
                document.getElementById("noComent").setAttribute("style","display:none;");
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
                    
                    comentarios.innerHTML+=`
                    <div class=containerComentario>
                        <div class='datosComentario'>
                            <p>
                                <span class="comentUser">${coments[i].user}</span>
                                •
                                
                            </p>
                            <p class="comentDate">${coments[i].dateTime}</p>
                        </div>
                        <p class="comentario">
                            ${coments[i].description}
                            <span class="starsComent">${estrellasHTML}</span>
                        </p>
                    </div>
                    <hr>
                    `;
                }
            }
        }
        if(localStorage.getItem("miCom") && (localStorage.getItem("miComID") == localStorage.getItem("idProd"))){
            let puntaje = localStorage.getItem("miComScore");
            estrellasHTML ='';
            for(let j = 0;j<5;j++){
                if(puntaje>0)
                    estrellasHTML+=`<span class="fa fa-star checked"></span>`;
                else
                    estrellasHTML+=`<span class="fa fa-star"></span>`;
                puntaje--;
            }
            comentarios.innerHTML+=`
            <div class=containerComentario>
                <div class='datosComentario'>
                    <p>
                        <span class="comentUser">${localStorage.getItem("miComUser")}</span>
                        •
                    </p>
                    <p class="comentDate">${localStorage.getItem("miComDate")}</p>
                </div>
                
                <p class="comentario">
                    ${localStorage.getItem("miCom")}
                    <span>${estrellasHTML}</span>
                </p>
            </div>
            <hr>
            `;
        }
    })
}

function fechaToString(fecha){
    let fechaString='';
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth()+1;
    let dia = fecha.getDate();
    let horas = fecha.getHours();
    let min = fecha.getMinutes();
    let sec = fecha.getSeconds();
    fechaString = `${anio}-`;
    if(mes < 10) fechaString+=`0`
    fechaString += `${fecha.getMonth()+1}-`;
    if(dia < 10) fechaString+=`0`;
    fechaString += `${fecha.getDate()} `;
    if(horas < 10) fechaString+=`0`;
    fechaString+=`${horas}:`;
    if(min<10) fechaString+=`0`;
    fechaString+=`${min}:`;
    if(sec<10) fechaString+=`0`;
    fechaString+=`${sec}`;
    return fechaString;
}

document.addEventListener("DOMContentLoaded",function(){
    let comentarios = document.getElementById("comentarios");

    configurarNavBar();

    if(mostrarUsuario()=='Anónimo'){
        document.getElementById("containerNewComent").style.display = "none";
        document.getElementById("loguearse").addEventListener("click",function(){
            localStorage.setItem("pagAnt",window.location.pathname.slice(1));
        });
    }else{
        document.getElementById("needToLogin").style.display = "none";
    }
    
    getJSONData(urlProd).then(function(resultObj){
        if(resultObj.status === "ok"){
            infoProd = resultObj.data;
            mostrarInfoProducto(infoProd);
            mostrarComentarios();
        }
    }); 

    document.getElementById("sendComent").addEventListener("click",function(){
        let newComent = document.getElementById("newComent");
        if(newComent.value != ''){
            document.getElementById("noComent").setAttribute("style","display:none;");
            document.getElementById("sendComent").setAttribute("disabled","true");

            let fecha = new Date();
            let fechaString = fechaToString(fecha);

            let puntaje = document.getElementById("scoreComent").value;
            let estrellasHTML =``;

            localStorage.setItem("miCom",newComent.value);
            localStorage.setItem("miComScore",puntaje);
            localStorage.setItem("miComID",localStorage.getItem("idProd"));
            localStorage.setItem("miComDate",fechaString);
            localStorage.setItem("miComUser",mostrarUsuario());

            for(let j = 0;j<5;j++){
                if(puntaje>0)
                    estrellasHTML+=`<span class="fa fa-star checked"></span>`;
                else
                    estrellasHTML+=`<span class="fa fa-star"></span>`;
                puntaje--;
            }
            comentarios.innerHTML+=`
                        <div class=containerComentario>
                            <div class='datosComentario'>
                                <p>
                                    <span class="comentUser">${mostrarUsuario()}</span>
                                    •
                                </p>
                                <p class="comentDate">${fechaString}</p>
                            </div>
                            
                            <p class="comentario">
                                ${newComent.value}
                                <span>${estrellasHTML}</span>
                            </p>
                        </div>
                        <hr>
                        `;
            
            newComent.value = '';
        }
    })
})