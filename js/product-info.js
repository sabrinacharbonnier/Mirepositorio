let infoProductos = [];
let mostrar = [];
let relacionados = []; 

//Muestra galería de imagenes
function mostrarGaleriaProducto(array){

    let htmlContentToAppend = "";
        htmlContentToAppend += `
            <div class="carousel-item active">
                <img src="` + infoProductos.images[0] + `" class="d-block w-100" alt="...">
            </div>`

    for(let i = 1; i < array.length; i++){
    let imageSrc = array[i];

    htmlContentToAppend += `
                <div class="carousel-item">
                    <img src="` + infoProductos.images[i] + `" class="d-block w-100" alt="...">
                </div>`   
    }document.getElementById("GaleriaImagenes").innerHTML = htmlContentToAppend;
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
function calificar(num){
  
    let estrellas = "";

    for (let i=1; i<=5; i++){

        if (i<=num ){ 

            estrellas += '<i class="fas fa-star "></i>';
            
        }else {
            estrellas +='<i class="far fa-star "></i>';
        }
    }
    
return estrellas;
}

//Funciona para mostrar productos relacionados//
function mostrarRelacionados(array){
    relacionados = "";
    infoProductos.relatedProducts.forEach((relacionado) => {
        relacionados +=`
        <div class="col-lg-3 col-md-4 col-6">
            <div class="justify-content-center">
                <h5>${array[relacionado].name}</h5>
                <img class="img-fluid img-thumbnail" src="` + array[relacionado].imgSrc + `" alt="">
                <small class = "text">` + array[relacionado].description +`</small>

            </div>
        </div>`
});
document.getElementById("relatedProduct").innerHTML = relacionados;
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
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            relacionados = resultObj.data;
            mostrarRelacionados(relacionados);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
        }
    });
});    