function verificar(){

    let dato = document.getElementById('user');
    let contrasena = document.getElementById('key');
    let msj =document.getElementById('msj');
    let usuario = {};  
  
    if (dato.value.trim() ==='' || contrasena.value.trim()==='')
      {
          dato.classList.add("isInvalid"); 
          msj.innerHTML="Dato requerido"; 
          msj.style.color="black"; 
          msj.style.display="block";
      }else {        
         
          location.href ="home.html";
          usuario.nombre = dato.value;
          usuario.estado ="conectado";
  //---------->
          localStorage.setItem('usuario',JSON.stringify(usuario)); 
          
          sessionStorage.setItem('usuario',JSON.stringify(usuario));
      }
  } 
  
 document.addEventListener('DOMContentLoaded', ()=>{
      let usuario = JSON.parse( localStorage.getItem("usuario"));
      if (usuario.estado=='conectado'){
          location.href="home.html";
      }
  });

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    // The ID token you need to pass to your backend:

    let usuario={};

    usuario.nombre=profile.getGivenName();
    usuario.imagen = profile.getImageUrl();
    usuario.estado="conectado";
    localStorage.setItem('usuario',JSON.stringify(usuario)); 
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    location.href ="index.html";
    
  }
  document.addEventListener("DOMContentLoaded", function(e){
    let usuario = JSON.parse( localStorage.getItem("usuario"));
    document.getElementById('nombre').innerHTML= "Está conectado: <img src=" + usuario.imagen + " width=30>  " + usuario.nombre;
});
        