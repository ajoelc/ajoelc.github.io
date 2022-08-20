function redirect(){
    window.location.href = "inicio.html";
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    return false;
}

function redirectGoogle(response){
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
}