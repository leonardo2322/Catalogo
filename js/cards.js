const containCards = document.querySelector(".accordion-body")


document.addEventListener('DOMContentLoaded', traerDatos)
function traerDatos() {

    const xhttp = new XMLHttpRequest();
  
    xhttp.open("GET", "json/cards.json", true);
  
    xhttp.send();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          let datos = JSON.parse(this.responseText);
        containCards.innerHTML = ""
        for (let item of datos){
            // let contenedor = document.createElement('div')

          containCards.innerHTML += `<div class="card mb-5" style="width: 18rem;">
          <img src="${item.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.acompanantes}</p>
            <p class="card-text">${item.bebidaysopa}</p>
            <a href="#" class="btn btn-primary">agregar al carrito</a>
          </div>
        </div>`

        } 
 
        } 
    
      
    };
  }
  