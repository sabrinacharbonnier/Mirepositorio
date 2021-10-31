let nombre = document.getElementById("name");
let apellido = document.getElementById("apellido");
let edad = document.getElementById("edad");
let correo = document.getElementById("correo");
let telefono = document.getElementById("telefono");

let user = {}

function registrar(){

    user.nombre = nombre.value;
    user.apellido = apellido.value;
    user.edad = edad.value;
    user.correo = correo.value;
    user.telefono = telefono.value;

    localStorage.setItem("usuario", JSON.stringify(user));
    document.getElementById("nombre1").innerHTML = user.nombre;
    document.getElementById("apellido1").innerHTML = user.apellido;
    document.getElementById("edad1").innerHTML = user.edad;
    document.getElementById("correo1").innerHTML = user.correo;
    document.getElementById("telefono1").innerHTML = user.telefono;
}

function mensaje(){
    swal("¡Buen trabajo!", "Su perfil ha sido guardado", "success");
}

function perfil(){
    document.getElementById("nombre1").innerHTML = user.nombre;
    document.getElementById("apellido1").innerHTML = user.apellido;
    document.getElementById("edad1").innerHTML = user.edad;
    document.getElementById("correo1").innerHTML = user.correo;
    document.getElementById("telefono1").innerHTML = user.telefono;
}

document.getElementById("alerta").addEventListener("click", function(){
    mensaje()
});

document.addEventListener("DOMContentLoaded", function (e) {
    user = JSON.parse(localStorage.getItem('usuario'))

    if(localStorage.getItem('usuario') != null){
    perfil();
    }
});
