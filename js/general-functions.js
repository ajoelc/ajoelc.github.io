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