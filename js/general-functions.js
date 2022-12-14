let categorias = [];
const urlRed = 'https://japceibal.github.io/emercado-api/cats_products/'

function getShowCategories(catMenu){
    catMenu.innerHTML = '';
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            categorias = resultObj.data
            categorias.forEach(elem => {
                catMenu.innerHTML+=`
                <a id="${elem.id}" class="dropdown-item" href="products.html">${elem.name}</a>
                `;
            });
            catMenu.addEventListener("click",function(e){
                localStorage.setItem("catID",e.target.id)
            });
        }
    });
}

function guardarRedirigir(id){
    localStorage.setItem("idProd",id);
    window.location.href = "product-info.html";
}

function mostrarUsuario(){
    if(!mail) return 'Anónimo';
    let nombre = infoPersonal[mail].nombre1;
    let email = infoPersonal[mail].mail;
    if(nombre) return nombre;
    else if(mail) return email;
}

function configurarNavBar(pagina){
    let botonLogin = document.getElementById("botonLogin");
    let categoriesMenu = document.getElementById("categories-menu");
    let optionsUserDrp = document.getElementById("optionsUserDrp");
    let mensajeSaludo = document.getElementById("saludoUsuario");
    getShowCategories(categoriesMenu);
    

    if(mostrarUsuario()=='Anónimo'){
        optionsUserDrp.style.display = "none";
        botonLogin.style.display = "block";
        mensajeSaludo.innerHTML = '';
    }
    else{
        optionsUserDrp.style.display = "block";
        botonLogin.style.display = "none";
        mensajeSaludo.innerHTML += `Hola, ${mostrarUsuario()}!`;
        botonLogout.addEventListener("click",function(){
            localStorage.removeItem("mail");
            window.location = 'index.html';
        })
    }
    switch(pagina){
        case 'inicio':
            document.getElementById('nav-btn-inicio').classList.add('active');
            break;        
        case 'categories':
            document.getElementById('nav-btn-categories').classList.add('active');
            break;
        case 'sell':
            document.getElementById('nav-btn-vender').classList.add('active');
            break;
    
    
    }
}

function inicializarCarrito(){

}

/**
 ** Si un producto con el id pasado por parametro se encuentra en el LS con key miProd(i) entonces lo devuelve en actual junto con el i.
 ** Si no se encuentra actual = null e i es el proximo indice de nombre libre
 * @param {int} id representa el id del producto
 * @return {Array} (actual,i)
 */
function estaEnCarrito(id){
    if(!carrito[mail]){
        carrito[mail] = {}
    }
    return carrito[mail][id]
}

/**
 * Agrega el texto correspondiente según si ya estaba o no el objeto
 * @param {string} esta
 */
function agregarTextoCarrito(esta){
    let texto = document.getElementById('textoBtnComprar');

    if (!esta){
        texto.innerHTML = '¡Producto agregado correctamente!';
        texto.classList += 'text-danger';
    }
    else{
        texto.innerHTML = '¡El producto ya estaba en el carrito!';
        texto.classList += 'text-success';
        
    }
    document.getElementById('botonComprar').disabled = 'true';
}

/**
 * Si prod no se encuentra en el LS lo agrega junto al mail del usuario
 * @param {string} prod 
 */
function agregarAlCarrito(prod){
    prod = prod.split(',');
    carrito = JSON.parse(localStorage.getItem('carrito'));
    if(!carrito)
        carrito = {}

    let esta = estaEnCarrito(prod[0])
    
    agregarTextoCarrito(esta);

    if (!esta){
        carrito[mail].cantidad++;

        carrito[mail][prod[0]] = {
            id : prod[0],
            name : prod[1],
            cant : prod[2],
            cost : prod[3],
            currency : prod[4],
            img : prod[5]
        };
        localStorage.setItem(`carrito`,JSON.stringify(carrito));
        
    }
    
    
}