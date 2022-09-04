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

function mostrarSaludo(){
    let nombre = localStorage.getItem('nombre');
    let mail = localStorage.getItem('mail')
    if(nombre) return nombre;
    else if(mail) return mail;
    else return 'Anónimo'
}
