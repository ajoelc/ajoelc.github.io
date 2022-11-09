let ipt_primerNombre = document.getElementById('primerNombre');
let ipt_segundoNombre = document.getElementById('segundoNombre');
let ipt_primerApellido = document.getElementById('primerApellido');
let ipt_segundoApellido = document.getElementById('segundoApellido');
let ipt_email = document.getElementById('emailPerfil');
let ipt_telefono = document.getElementById('telefono');
let ipt_imagenPerfil = document.getElementById('iptImagenPerfil');
let btn_guardarCambios = document.getElementById('guardarCambiosPerfil')
let formPerfil = document.getElementById('formPerfil');

document.addEventListener("DOMContentLoaded", function(){
    configurarNavBar();

    ipt_email.value = mail

    if(ipt_primerNombre.value.match(/^[A-Za-z]+$/)){
        ipt_primerNombre.setCustomValidity('No puede contener números.')
    }

    btn_guardarCambios.addEventListener('click',function(e){
        if(!formPerfil.checkValidity()){
            e.preventDefault();
            e.stopPropagation();
        }
        formPerfil.classList+='was-validated';
    })
});