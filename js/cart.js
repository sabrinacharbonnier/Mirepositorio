let carritoArray = {};

function mostrarCarritoInfo(){
    let carrito = "";

    for(let i=0; i< carritoArray.articles.length; i++){
        article = carritoArray.articles[i]

        if (article.currency == "UYU"){
            article.currency = "USD"
            article.unitCost /= 40;
        }
    
        carrito += 
        '<tr><td><img class="img-fluid img-thumbnail" src="' + article.src + '"></td><td>' + article.name + ' </td><td class="precio">' + article.unitCost + '</td><td><div class="col-md-3 mb-3"><input type="number" required="" value="' + article.count + '" min="0" onchange="subtotal('+ i +', value)"></div></div></td><td>' + article.currency + '' + article.unitCost*article.count + ' </td></tr></table>'
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
    let subtotal=0;

    for (let i=0; i< precios.length; i++){

        total+= parseFloat(precios[i].innerHTML);
      
        subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }
    document.getElementById('sumaTotal').innerHTML=(total).toFixed(2);
    document.getElementById('subtotal').innerHTML=(subtotal).toFixed(2);
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
});