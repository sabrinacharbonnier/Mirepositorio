let infoProductos = [];
let mostrar = [];

//Muestra galería de imagenes
function mostrarGaleriaProducto(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("GaleriaImagenes").innerHTML = htmlContentToAppend;
    }
}

//Mostrar comentarios//
function mostrarComentarios(comentarios){
    for (comment of comentarios){
        mostrar += `
        <div class="list-group-item list-group-item-action">
            <div class="justify-content-center">
            <h5>${comment.user}</h5> <small class = "text">` + calificar(comment.score) +`</small> 
            <p class="">${comment.description}</p>  
            <small class = "text">${comment.dateTime}</small>
            </div>
        </div>
        `;
    }
    document.getElementById("comentarios").innerHTML = mostrar;
}

//función para calificar
function calificar(num){//  num = 3
  
    let estrellas = "";

    for (let i=1; i<=5; i++){//         La puntuación máxima es de 5, así que... cuento hasta 5

        if (i<=num ){ //Cuento y pregunto 

            estrellas += '<i class="fas fa-star "></i>';//Pongo una estrellita llena
            
        }else {
            estrellas +='<i class="far fa-star "></i>';//Pongo el contorno
        }
    }
    
return estrellas;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Petición a JSON de product-info
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            infoProductos = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCat");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSold");

            productNameHTML.innerHTML = infoProductos.name;
            productDescriptionHTML.innerHTML = infoProductos.description;
            productCostHTML.innerHTML = infoProductos.cost;
            productCategoryHTML.innerHTML = infoProductos.category;
            productCurrencyHTML.innerHTML = infoProductos.currency;
            productSoldCountHTML.innerHTML = infoProductos.soldCount;

            //Muestro las imagenes en forma de galería
            mostrarGaleriaProducto(infoProductos.images);
        }
    });
});

    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                comentarios = resultObj.data;
                mostrarComentarios(comentarios);
            }
        });
});