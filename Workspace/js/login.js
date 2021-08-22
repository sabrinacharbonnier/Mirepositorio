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
document.addEventListener("DOMContentLoaded", function(e){
});