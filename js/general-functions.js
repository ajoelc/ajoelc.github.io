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
        }
    });
}

function guardarRedirigir(id){
    localStorage.setItem("idProd",id);
    window.location.href = "product-info.html";
}

function mostrarUsuario(){
    let nombre = localStorage.getItem('nombre');
    let mail = localStorage.getItem('mail')
    if(nombre) return nombre;
    else if(mail) return mail;
    else return 'Anónimo'
}

function configurarNavBar(){
    let botonLogin = document.getElementById("botonLogin");
    let categoriesMenu = document.getElementById("categories-menu");
    let optionsUserDrp = document.getElementById("optionsUserDrp");
    let mensajeSaludo = document.getElementById("saludoUsuario");
    getShowCategories(categoriesMenu);
    categoriesMenu.addEventListener("click",function(e){
        localStorage.setItem("catID",e.target.id)
    });

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
            localStorage.removeItem("nombre");
            document.getElementById('navbarNav').classList.remove('show');
            configurarNavBar();
        })
    }
}

function estaEnCarrito(id){
    let i=0;
    let actual = localStorage.getItem(`miProd${i}`);
    
    while(actual && actual.split(',')[0] != id){
        i++;
        actual = localStorage.getItem(`miProd${i}`);
    }
    return [actual,i]
}

function agregarTextoCarrito(esta){
    let texto = document.getElementById('textoBtnComprar');
    console.log(esta);
    if (esta == 'null'){
        texto.innerHTML = '¡Producto agregado correctamente!';
        texto.classList += 'text-danger';
    }
    else{
        texto.innerHTML = '¡El producto ya estaba en el carrito!';
        texto.classList += 'text-success';
        
    }
    document.getElementById('botonComprar').disabled = 'true';
}

function agregarAlCarrito(prod){
    prod = prod.split(',');
    esta = estaEnCarrito(prod[0]);
    
    if (!esta[0]){
        let i = esta[1];
        prod = [prod,localStorage.getItem('mail')];
        localStorage.setItem(`miProd${i}`,prod);
    }

    
}