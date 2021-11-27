let carritoArray = {};
let porcentajeEnvio = 0.15;

function mostrarCarritoInfo(){
    let carrito = "";

    for(let i=0; i< carritoArray.articles.length; i++){
        article = carritoArray.articles[i]

        if (article.currency == "UYU"){
            article.currency = "USD"
            article.unitCost /= 40;
        }
    
        carrito += 
        '<tr><td><img class="img-fluid img-thumbnail" src="' + article.src + '"></td><td>' + article.name + ' </td><td class="precio">' + article.unitCost + '</td><td><div class="col-md-3 mb-3"><input type="number" required="" value="' + article.count + '" min="0" onchange="subtotal('+ i +', value)"></div></div></td><td>' + article.currency + '' + article.unitCost*article.count + ' </td><td><button class="btn btn-secondary" onclick="eliminar('+ i +')"><i class="bi bi-trash"></i></td></tr></table>'
    }
    document.getElementById("unCarrito").innerHTML = carrito;
}

function subtotal (i, valor){
    carritoArray.articles[i].count = valor
    mostrarCarritoInfo()    
}

function sumar(){
    let precios = document.getElementsByClassName('precio');
    let cantidades = document.getElementsByTagName('input');

    let total=0;
    let subtotal1=0;
    let costoComision=0;  

    for (let i=0; i< precios.length; i++){

        costoComision+= (parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value))* porcentajeEnvio;
        subtotal1+= parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
        total+= subtotal1 + costoComision;
    }
    document.getElementById('sumaTotal').innerHTML=(total).toFixed(2);
    document.getElementById('subtotal').innerHTML=(subtotal1).toFixed(2);
    document.getElementById("comision").innerHTML=(costoComision).toFixed(2)
} 
function eliminar(i){
    carritoArray.articles.splice(i,1);
    mostrarCarritoInfo();
    sumar();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritoArray = resultObj.data;
            mostrarCarritoInfo(carritoArray);
        }
    });

    document.getElementById("subtotal").addEventListener("change", function(){
        subtotal1 = this.value;
        sumar();
    });

    document.getElementById("premiumradio").addEventListener("change", function(){
        porcentajeEnvio = 0.15;
        sumar();
    });

    document.getElementById("expressradio").addEventListener("change", function(){
        porcentajeEnvio = 0.07;
        sumar();
    });

    document.getElementById("estandardradio").addEventListener("change", function(){
        porcentajeEnvio = 0.05;
        sumar();
    });
});