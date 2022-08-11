let boton = document.getElementById("botonLogin")


boton.addEventListener("click",function(){
    let mail = document.getElementById("emailInicio").value;
    let contra = document.getElementById("contraInicio").value;
    if(mail!='' && contra!='')
        window.location.href = "inicio.html"
})