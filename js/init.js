const PUERTO = 3000;
const URL_LS = 'http://localhost:'+ PUERTO;

const CATEGORIES_URL = URL_LS +'/emercado-api/cats/cat.json';
const PUBLISH_PRODUCT_URL = URL_LS + "/emercado-api/sell/publish.json";
const PRODUCTS_URL = URL_LS + "/emercado-api/cats_products/";
const PRODUCT_INFO_URL = URL_LS +  "/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = URL_LS + "/emercado-api/products_comments/";
const CART_INFO_URL = URL_LS + "/emercado-api/user_cart/";
const CART_BUY_URL = URL_LS + "/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let navbar = document.getElementById('navbar');
let modalLogin = document.getElementById('modalLogin');

let mail = localStorage.getItem('mail');
let infoPersonal = JSON.parse(localStorage.getItem('infoPersonal'));
let carrito = JSON.parse(localStorage.getItem('carrito'));
let comentariosLS = JSON.parse(localStorage.getItem('comentarios'));

if(!comentariosLS)
  comentariosLS = {};

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

if(navbar){
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
}

if(modalLogin)
  modalLogin.innerHTML = `
  <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <img id="logoLogin" src="img/login.png" alt="Logo de la página">
                </div>
                <div class="row">
                  <div class="container" id="contenedorLogin">
                    <h3 class="inputLogin">Inicio de sesión</h3>
                    
                    <form action="#" onsubmit="return redirect();">
                      <div class="form-floating inputLogin">
                        <input placeholder="email@dominio.com" type="email" class="form-control" name="emailInicio" id="emailInicio" required>
                        <label for="emailInicio">Email</label>
                      </div>
                      
                      <div class="form-floating inputLogin">
                        <input placeholder="contraseña" type="password" class="form-control" id="contraInicio" required>
                        <label class="form-label" for="contraInicio">Contraseña</label>
                      </div>
                    
                      <button type="submit" class="btn btn-dark center mt-2" id="modalLogin">Ingresar</button>
                    </form>  
            
                    <hr id="sepLogin">
                    <h3 class="center">ó</h3>
                    
                    <div class="center">
                      <div id="g_id_onload"
                        data-client_id="962699925016-rc80qcj05auboi3vr4rif6iba6hvpqj4.apps.googleusercontent.com"
                        data-context="signin"
                        data-ux_mode="popup"
                        data-callback="redirectGoogle"
                        data-auto_prompt="false">
                      </div>
            
                      <div class="g_id_signin inputLogin"
                        data-type="standard"
                        data-shape="pill"
                        data-theme="filled_black"
                        data-text="$ {button.text}"
                        data-size="large"
                        data-logo_alignment="left"
                        data-width="252px">
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div class="row">
                  <button id="modalCancel" type="button" class="close btn btn-dark center" data-dismiss="modal">
                    Cancelar
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
  `;