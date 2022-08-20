function redirect(){
    window.location.href = "inicio.html";
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    return false;
}

function redirectGoogle(response){
    const responsePayload = decodeJwtResponse(response.credential);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Email: " + responsePayload.email);
    window.location.href = "inicio.html";
}