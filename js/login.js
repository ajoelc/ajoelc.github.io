
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
            img:'img/img_perfil.png'
        }
        localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal))
    }
    window.location.href = url;
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    mail = infoUsuario.email
    
    localStorage.setItem('mail',mail);
    
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
            apellido1: infoUsuario.family_name,
            apellido2: '',
            mail : infoUsuario.email,
            telefono: '',
            img: infoUsuario.picture
        }
        localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal))
    }

    window.location.href = window.location.href;
}