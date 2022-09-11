let categorias = [];
const urlRed = 'https://japceibal.github.io/emercado-api/cats_products/'

function getShowCategories(catMenu){
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

function mostrarUsuario(){
    let nombre = localStorage.getItem('nombre');
    let mail = localStorage.getItem('mail')
    if(nombre) return nombre;
    else if(mail) return mail;
    else return 'Anónimo'
}

function configurarNavBar(){
    let categoriesMenu = document.getElementById("categories-menu");
    getShowCategories(categoriesMenu);
    categoriesMenu.addEventListener("click",function(e){
        localStorage.setItem("catID",e.target.id)
    });

    if(mostrarUsuario()=='Anónimo'){
        let botonLogin = document.getElementById("botonLogin");
        botonLogin.style.display = "block";
        botonLogin.addEventListener("click",function(){
            localStorage.setItem("pagAnt",window.location.pathname.slice(1));
        })
    }
    else{
        document.getElementById("saludoUsuario").innerHTML += `Hola, ${mostrarUsuario()}!`;
    }
}