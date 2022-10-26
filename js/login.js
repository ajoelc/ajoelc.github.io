let carritoLog = localStorage.getItem('carrito');
carritoLog = JSON.parse(carritoLog);

function redirect(url = window.location.href){
    let mail = document.getElementById("emailInicio").value;

    localStorage.setItem('mail', mail);
    
    if(!carritoLog)
        carritoLog = {}
    
    if(!carritoLog[mail]){
        carritoLog[mail] = {}
        carritoLog[mail].cantidad = 0;
        localStorage.setItem('carrito',JSON.stringify(carritoLog));
    }
    
    window.location.href = url;
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);

    if(!carritoLog)
        carritoLog = {}
    
    if(!carritoLog[mail]){
        carritoLog[mail] = {}
        carritoLog[mail].cantidad = 0;
        localStorage.setItem('carrito',JSON.stringify(carritoLog));
    }

    window.location.href = window.location.href;
}

document.addEventListener("DOMContentLoaded",function(){
    
})