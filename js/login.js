function redirect(){
    window.location.href = "inicio.html";
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    return false;
}
