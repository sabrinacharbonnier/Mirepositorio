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
    <div class = "list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src= "` + product.imgSrc + `" alt= "` + product.description + `" class="img-thumbnail">  
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + product.name  + " - U$S " + product.cost + `</h4>
                    <small class="text-muted">` + product.soldCount + ` articulos</small>
                </div> 
                <p class="mb-1">` + product.description +`</p>
            </div>
        </div>
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


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
}); 


document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("minimo").value = "";
    document.getElementById("maximo").value = "";

    minimo = undefined;
    maximo = undefined;

    showProductsList();
});
