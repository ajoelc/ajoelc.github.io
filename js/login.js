function redirect(){
    localStorage.clear();
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    window.location.href = "inicio.html";
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.clear()
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);
    window.location.href = "inicio.html";
}