function desconectar(){
    localStorage.clear();
    location.href="index.html"; 
    signOut(); 
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //Lo que quiero hacer cuando me desconecto
    });
  }
  function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }
