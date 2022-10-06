let prodID = localStorage.getItem("idProd");
const urlProd = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
let infoProd = []
let imagenPrincipal;
let comentarios = document.getElementById("comentarios");
let botonComprar = document.getElementById("botonComprar");



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

    if(mostrarUsuario() != 'Anónimo')
        botonComprar.setAttribute('onclick',`agregarAlCarrito(${prod.id})`);


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

    document.getElementById("costProd").innerHTML = `${infoProd.currency} ${infoProd.cost}`
    if(infoProd.soldCount > 0)
        document.getElementById("soldProd").innerHTML = `¡ya se han vendido ${infoProd.soldCount}!`;
    else
    document.getElementById("soldProd").innerHTML = `Sé la primera en comprarlo`;   

    let relatedProducts = infoProd.relatedProducts;
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

function plantillaComentario(user,desc,score,dateTime){
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
    <div class=containerComentario>
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
        let i = 0;
        while(localStorage.getItem(`miCom${i}`)){
            let contenido = localStorage.getItem(`miCom${i}`);
            contenido = contenido.split(',');

            if(contenido[0] == localStorage.getItem(`idProd`)){
                nocoment = false;
                comentarios.innerHTML+=plantillaComentario(contenido[1],contenido[2],contenido[3],contenido[4]);
            }
            i++;
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
    if(mostrarUsuario()=='Anónimo'){
        document.getElementById("containerNewComent").style.display = "none";
        botonComprar.setAttribute('data-toggle',"modal");
        botonComprar.setAttribute('data-target',"#modalLogin");
    }else{
        document.getElementById("needToLogin").style.display = "none";
        document.getElementById("sendComent").removeAttribute("disabled");
        let i = 0;
        while(localStorage.getItem(`miCom${i}`)){
            let contenido = localStorage.getItem(`miCom${i}`).split(',');
            let comentId = contenido[0];
            let comentUser = contenido[1];

            
            
            if((comentUser == localStorage.getItem("mail") || comentUser == localStorage.getItem("nombre")) && comentId == localStorage.getItem(`idProd`)){
                document.getElementById("sendComent").setAttribute("disabled","true");
            }
            i++;
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

            let i=0;
            while(localStorage.getItem(`miCom${i}`)) i++;

            let contenido = [localStorage.getItem("idProd"),mostrarUsuario(),newComent.value,puntaje,fechaString];
            localStorage.setItem(`miCom${i}`,contenido);
            comentarios.innerHTML+=plantillaComentario(contenido[1],contenido[2],contenido[3],contenido[4]);          
            newComent.value = '';
        }
    })
});