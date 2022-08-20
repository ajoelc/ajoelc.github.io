function redirect(){
    window.location.href = "inicio.html";
    let mail = document.getElementById("emailInicio").value;
    localStorage.setItem('mail', mail);
    return false;
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function redirectGoogle(response){
    const responsePayload = parseJwt(response.credential);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Email: " + responsePayload.email);
    window.location.href = "inicio.html";
}