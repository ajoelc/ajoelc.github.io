let pagAnt = localStorage.getItem("pagAnt");


function redirect(){
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);

    if(pagAnt) window.location.href = pagAnt;
    else window.location.href = "index.html"
    localStorage.removeItem("pagAnt");
    return false;
}

function redirectGoogle(response){
    const infoUsuario = jwt_decode(response.credential);
    localStorage.setItem('nombre',infoUsuario.given_name);
    localStorage.setItem('mail',infoUsuario.email);

    if(pagAnt) window.location.href = pagAnt;
    else window.location.href = "index.html"
    localStorage.removeItem("pagAnt");
}