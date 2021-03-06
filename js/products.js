var productsArray = [];

function showProductsList(array){
    if(array==undefined){
        array=productsArray;
    }
    let minimo = document.getElementById("minimo").value
    let maximo = document.getElementById("maximo").value 

    if (minimo==""){
        minimo=0;
    }
    if (maximo==""){
        maximo=100000;
    }

    let htmlContentToAppend = "";
    for (product of productsArray){
    
        if (product.cost >= minimo && product.cost <= maximo){
    htmlContentToAppend += `
        
    <div class="col-md-4">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src= "` + product.imgSrc + `">
                    <h3 class="m-3"> ` + product.name + ' - <br> ' + product.currency + ' ' + product.cost + `" </h3> 
                    <div class="card-body">
                        <p class="card-text">` + product.description +`</p>
                        <small class="text-muted">` + product.soldCount + ` articulos</small>
                    </div>
                </a>
            </div>`
    document.getElementById("productos").innerHTML = htmlContentToAppend;  
    }
}
}

//Ordenar por precio//
function ordenar(forma){
    if (forma=="asc"){
        productsArray.sort(function (a, b){
            return a.cost - b.cost;
        });
    } 
    if(forma=="des"){
        productsArray.sort(function(a, b){
            return b.cost - a.cost; 
        });
    }showProductsList(productsArray)
} 
//Ordenar por relevancia//
function ordenarRelevante(forma){
    if (forma=="rel"){
        productsArray.sort(function(a, b){
            return b.soldCount - a.soldCount;
    });
} showProductsList(productsArray)
} 

function buscar(){
    let peticion = document.getElementById("buscar").value;
    let buscados = productsArray.filter(producto => {
        return producto.name.toLowerCase().indexOf(peticion.toLowerCase())>-1;
})
 showProductsList(buscados);
}

//Función que se ejecuta una vez se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
}); 
document.getElementById("buscar").addEventListener("keyup",() => {
    buscar();
}); 

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("minimo").value = "";
    document.getElementById("maximo").value = "";

    minimo = undefined;
    maximo = undefined;

    showProductsList();
});

//Redireccionar a la página de información del producto
document.getElementById("info-productos").addEventListener("click", function(){
    location.href = "product-info.html"
});