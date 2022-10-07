function redirect(url = window.location.href){
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);

    window.location.href = url;
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);

    window.location.href = window.location.href;
}

document.addEventListener("DOMContentLoaded",function(){
    
})