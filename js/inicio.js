document.addEventListener("DOMContentLoaded", function(){
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

    let categoriesMenu = document.getElementById("categories-menu");
    getShowCategories(categoriesMenu);
    document.getElementById("categories-menu").addEventListener("click",function(e){
        localStorage.setItem("catID",e.target.id)
    })

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});