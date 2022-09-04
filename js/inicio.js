document.addEventListener("DOMContentLoaded", function(){
    let categoriesMenu = document.getElementById("categories-menu");
    getShowCategories(categoriesMenu);
    
    document.getElementById("categories-menu").addEventListener("click",function(e){
        localStorage.setItem("catID",e.target.id)
    })
    
    document.getElementById("usuario").innerHTML = 'Hola, ' + mostrarSaludo() + '!';
    
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