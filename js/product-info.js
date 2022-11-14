let prodID = localStorage.getItem("idProd");
const urlProd = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
const urlComents = PRODUCT_INFO_COMMENTS_URL + prodID + '.json';
let infoProd = []
let imagenPrincipal;
let comentarios = document.getElementById("comentarios");
let botonComprar = document.getElementById('botonComprar');


function mostrarInfoProducto(prod){
    document.getElementById("nameCat").innerHTML = prod.category
    document.getElementById("nameProd").innerHTML = prod.name;
    document.getElementById("descriptionProd").innerHTML = prod.description;
    let contenedorRelated = document.getElementById("relatedProducts");

    for(let i = 0;i < prod.images.length;i++){
        document.getElementById("allImages").innerHTML+=`
            <div>
                <img type="button" class="img-thumbnail" src="${prod.images[i]}"></img> 
            </div>
        `;
        document.getElementById("carouselImg").innerHTML+=`
            <div id="img${i}" class="carousel-item">
                <img id="imagenPrincipal" src="${prod.images[i]}"></img>
            </div>
        `;
    }
    document.getElementById("img0").classList.add('active'); 

    let imagenes = document.getElementsByClassName("img-thumbnail")
    let imagenesCarousel = document.getElementsByClassName("carousel-item");
    for(let i = 0;i < imagenes.length;i++){
        imagenes[i].addEventListener("mouseover",function(){
            for (let imgC of imagenesCarousel) {
                imgC.classList.remove('active');
            }
            imagenesCarousel[i].classList.add('active');
        });
    }

    if(mostrarUsuario() != 'Anónimo'){
        cant = 1;
        subtotal = prod.cost;
        producto = [prod.id,prod.name,cant,prod.cost,prod.currency,prod.images[0]];
        botonComprar.setAttribute('onclick',`agregarAlCarrito('${producto}');`);
    }

    

    document.getElementById("costProd").innerHTML = `${prod.currency} ${prod.cost}`
    if(prod.soldCount > 0)
        document.getElementById("soldProd").innerHTML = `¡ya se han vendido ${prod.soldCount}!`;
    else
    document.getElementById("soldProd").innerHTML = `Sé la primera en comprarlo`;   

    let relatedProducts = prod.relatedProducts;
    contenidoHTML = '';
    relatedProducts.forEach(prod => {
        contenidoHTML+=`
            <div class="card" role="button" onclick="guardarRedirigir(${prod.id});">
                <img class="card-img-top" src="${prod.image}" alt="Card image cap">
                <hr>
                <div class="card-body">
                <h5 class="card-title">${prod.name}</h5>
                </div>
            </div>
        `
    });
    contenedorRelated.innerHTML = contenidoHTML;
}

function plantillaComentario(user,desc,score,dateTime,img = 'img/img_perfil.png'){
    let comentario = '';
    let estrellasHTML =``;
    for(let j = 0;j<5;j++){
        if(score>0)
            estrellasHTML+=`<span class="fa fa-star checked"></span>`;
        else
            estrellasHTML+=`<span class="fa fa-star"></span>`;
        score--;
    }

    comentario = `
    <div class="row containerComentario">
        <div class="col-3 col-sm-2 col-lg-1">
            <img style='width:40px' class='imgComment block' src='${img}'></img>
        </div>
        <div class="col-9 col-sm-10 col-lg-11">
            <div class='row datosComentario'>
            <div class="col-md-7 col-sm-6">
                <p class="mb-1"><span class="comentUser">${user}•</span>
                    
                </p>
            </div>
                
            </div>
            <div class='row comentario'>
                <div class='col'>
                    <p class="comentario">
                        ${desc}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-7 col-md-8 col-xl-9">
                    <p class="mb-0 starsComent">${estrellasHTML}</p>
                </div>
                <div class="col-12 col-sm-5 col-md-4 col-xl-3">
                    <p class="comentDate">${dateTime}</p>
                </div>
            </div>
        </div>
        
    </div>
    <hr>
    `;
    return comentario;
}

function mostrarComentarios(){
    let nocoment = true;
    getJSONData(urlComents).then(function(resultObj){
        if(resultObj.status === "ok"){
            let coments = resultObj.data;
            if(coments.length){
                nocoment = false;
                for(let i = 0;i<coments.length;i++)                 
                    comentarios.innerHTML+=plantillaComentario(coments[i].user,coments[i].description,coments[i].score,coments[i].dateTime);
            }
        }
        if(comentariosLS[prodID]){
            comentariosLS[prodID].forEach(comment => {
                nocoment = false;
                comentarios.innerHTML += plantillaComentario(comment.user,comment.description,comment.score,comment.dateTime,infoPersonal[comment.user]['img']);
            });
        }
        if(!nocoment)
            document.getElementById("noComent").style.display = 'none';
        else
            document.getElementById("noComent").style.display = 'block';

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
    configurarNavBar();
    if(mostrarUsuario()=='Anónimo'){
        document.getElementById("containerNewComent").style.display = "none";
        botonComprar.setAttribute('data-toggle',"modal");
        botonComprar.setAttribute('data-target',"#modalLogin");
    }else{
        document.getElementById("needToLogin").style.display = "none";
        document.getElementById("sendComent").removeAttribute("disabled");
        if(comentariosLS[prodID]){
            let hayComentario = false;
            let i = 0;
            while(!hayComentario && i < comentariosLS[prodID].length){
                hayComentario = comentariosLS[prodID][i].user == mail;
                i+=1;
            }
            if(hayComentario)
                document.getElementById("sendComent").setAttribute("disabled","true");
        }
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
            
            if(!comentariosLS[prodID])
                comentariosLS[prodID] = [];

            comentarioActual = {
                product : prodID,
                score: puntaje,
                description: newComent.value,
                user: mail,
                dateTime: fechaString
            }

            comentariosLS[prodID].push(comentarioActual);

            localStorage.setItem('comentarios',JSON.stringify(comentariosLS));

            comentarios.innerHTML += plantillaComentario(mail,newComent.value,puntaje,fechaString);          
            newComent.value = '';
        }
    })
});