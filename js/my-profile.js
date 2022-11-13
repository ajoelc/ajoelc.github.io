let imgPerfil = infoPersonal[mail].img;

let ipt_primerNombre = document.getElementById('primerNombre');
let ipt_segundoNombre = document.getElementById('segundoNombre');
let ipt_primerApellido = document.getElementById('primerApellido');
let ipt_segundoApellido = document.getElementById('segundoApellido');
let ipt_email = document.getElementById('emailPerfil');
let ipt_telefono = document.getElementById('telefono');
let ipt_imagenPerfil = document.getElementById('iptImagenPerfil');
let btn_guardarCambios = document.getElementById('guardarCambiosPerfil')
let formPerfil = document.getElementById('formPerfil');
let ipts_noNumbers = document.getElementsByClassName('noNumbers');
let imagenPerfilActual = document.getElementById('imagenPerfil');
let ipts_profile = document.getElementsByTagName('input');
let btn_borrarPerfil = document.getElementById('deleteProfilePicture');



document.addEventListener("DOMContentLoaded", function(){
    configurarNavBar();

    let i = 0;
    for (const campo in infoPersonal[mail]) {
        if(campo && campo != 'img') 
            ipts_profile[i].value = infoPersonal[mail][campo];
        i+=1;
    }

    if(infoPersonal[mail].img){
        imagenPerfilActual.src = infoPersonal[mail].img;
        btn_borrarPerfil.style.display = 'block';
        btn_borrarPerfil.addEventListener('click',()=>{
            infoPersonal[mail].img = 'img/img_perfil.png';
            localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal));
            window.location = window.location
        });
    }

    

    ipt_email.value = mail;

    //Hace que no se puedan ingresar números
    for (const ipt of ipts_noNumbers) {
        ['change','input'].forEach(evnt => {
            ipt.addEventListener(evnt,function(e){
                for (const c of e.target.value) {
                    if (c.match(/^[0-9]+$/)){
                        e.target.value = e.target.value.split(c).join("")
                        
                    }
                }
            })
        });
    }

    ipt_imagenPerfil.addEventListener('change',()=>{
        const FR = new FileReader();

        FR.readAsDataURL(ipt_imagenPerfil.files[0]);
        FR.addEventListener('load',()=>{
            imgPerfil = FR.result;
        })
    })
    
    btn_guardarCambios.addEventListener('click',function(e){
        if(!formPerfil.checkValidity()){
            e.preventDefault();
            e.stopPropagation();
        }
        else{
            let campos = ['nombre1','nombre2','apellido1','apellido2','mail','telefono'];
            let i = 0;
            let infoActual = {}
            campos.forEach(campo => {
                infoActual[campo] = ipts_profile[i].value;
                i+=1;
            });
            if(mail != infoActual.mail){
                delete infoPersonal[mail];
                mail = infoActual.mail;
            }
            infoPersonal[mail] = infoActual;
            infoPersonal[mail].img = imgPerfil;

            localStorage.setItem('infoPersonal',JSON.stringify(infoPersonal))
        }

        formPerfil.classList.add('was-validated');
    })
});