
function redirect(url = window.location.href){
    let mail = document.getElementById("emailInicio").value;

    localStorage.setItem('mail', mail);
   
    if(!carrito[mail]){
        carrito[mail] = {
            cantidad : 0
        }
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }
    
    if(!infoPersonal[mail]){
        infoPersonal[mail]={
            nombre1 : '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            mail : mail,
            telefono: '',
            img:''
        }
        localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal))
    }
    window.location.href = url;
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);

    if(!carrito[mail]){
        carrito[mail] = {
            cantidad : 0
        }
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }

    if(!infoPersonal[mail]){
        infoPersonal[mail]={
            nombre1 : infoUsuario.given_name,
            nombre2: '',
            apellido1: infoUsuario.get,
            apellido2: '',
            mail : infoUsuario.email,
            telefono: '',
            img:''
        }
        localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal))
    }

    window.location.href = window.location.href;
}

document.addEventListener("DOMContentLoaded",function(){
    
})