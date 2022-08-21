function redirect(){
    window.location.href = "inicio.html";
    localStorage.clear();
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.clear()
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);
    window.location.href = "inicio.html";
}