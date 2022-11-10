const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let navbar = document.getElementById('navbar');

let mail = localStorage.getItem('mail');
let infoPersonal = JSON.parse(localStorage.getItem('infoPersonal'));
let carrito = JSON.parse(localStorage.getItem('carrito'));

if (!carrito)
  carrito = {};

if(!infoPersonal)
  infoPersonal = {};

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

navbar.classList+= 'navbar navbar-expand-lg navbar-dark bg-dark p-1';
navbar.innerHTML = `
<div class="container">
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    <span id="toggler-text">MENU</span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav w-100 justify-content-between">
      <li class="nav-item">
        <a id="nav-btn-inicio" class="nav-link" href="index.html">Inicio</a>
      </li>
      <div class="dropdown">
        <li class="nav-item" id="navbar-categories">
          <a id="nav-btn-categories" class="nav-link dropbtn" role="button" href="categories.html">Categorías</a>
          <div id="categories-menu">
          </div>
        </li>
      </div>
      <li class="nav-item">
        <a id="nav-btn-vender" class="nav-link" href="sell.html" id="vender">Vender</a>
      </li>
      <li id="usuario" class="nav-item">
        <p id="botonLogin" class="nav-link" href="login.html" role="button" data-toggle="modal" data-target="#modalLogin">Iniciar Sesión</p>            <div class="dropdown">
          <div id="conjuntoUsuario">
            <span id="saludoUsuario"></span>
            <span id="optionsUserDrp" role="button" class="drop-btn nav-link material-symbols-outlined" style="margin-left: 0px; color: rgb(211, 238, 185);">more_vert</span>
          </div>
          <div id="optionsUser">
            <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
            <a class="dropdown-item" href="cart.html">Mi carrito</a>
            <a id="botonLogout" class="dropdown-item" data-toggle="modal" data-target="#modalLogin" href="#">Cerrar Sesión</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
`;