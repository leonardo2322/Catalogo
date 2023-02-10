const containCards = document.querySelector(".accordion-body");
const CntBandejas = document.querySelector("#acord-Bandejas");
const sencillos = document.getElementById('sencillos')
const inputEspesification = document.getElementById('inpE')
let productos = [];
let listaProductos = document.querySelector("#listaProductos");
let btnVaciarCarrito = document.querySelector("#btn-Vaciar");
let tablaCarrito = document.querySelector("#tabla-carrito");
let count = 0;
let contar = 1;
let totalCompraID = document.querySelector("#totalID");
let Enviar = document.querySelector('#send')
tablaCarrito.addEventListener("click", evaluar);

function evaluar(e) {
  if (e.target.classList.contains("delete-P")) {
    eliminarProducto(e);
  } else if (e.target.classList.contains("cant-mas")) {
    e.target.parentElement.parentElement.parentElement.childNodes[5]
      .childNodes[0].value++;
      let valorDelElemento = parseInt(e.target.parentElement.parentElement.parentElement.childNodes[7].textContent)
      let suma = parseInt(totalCompraID.value) + valorDelElemento
      totalCompraID.value = suma
  } else if (e.target.classList.contains("cant-menos")) {
    e.target.parentElement.parentElement.parentElement.childNodes[5]
      .childNodes[0].value > 1
      ? e.target.parentElement.parentElement.parentElement.childNodes[5]
          .childNodes[0].value--
      : e.target.parentElement.parentElement.parentElement.remove();

    eliminarProducto(e);
  }
}

btnVaciarCarrito.addEventListener("click", vaciarCarrito);
document.addEventListener("DOMContentLoaded", traerDatos);

function traerDatos() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "json/cards.json", true);

  xhttp.send();

  xhttp.onreadystatechange = function () {  
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      containCards.innerHTML = "";
      for (let item of datos) {
        containCards.innerHTML += `
        <div class="card" style=";">
          <div class="row">
            
              <img src="${item.imagen}" class="img-fluid" id="img-cards" style="width:6rem" alt="${item.imagen}" />
           
            <div class="col">
              <div class="card-body">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text">${item.acompanantes}</p>
                <p class="card-text">${item.bebidaysopa}</p>
                <p class="card-text">
                  <small class="text-muted">${item.precio}</small>
                </p>
                <a href="#" class="addCart ">+</a>
              </div>
            </div>
          </div>
        </div>`;
      }
    }
  };

  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "json/api.json", true);
  xhttp2.send();
  xhttp2.onreadystatechange = function () {  
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      sencillos.innerHTML = "";
      for (let item of datos) {
        sencillos.innerHTML += `
        <div class="card" style=";">
          <div class="row">
            
              <img src="${item.imagen}" class="img-fluid" id="img-cards" style="width:6rem" alt="${item.imagen}" />
           
            <div class="col">
              <div class="card-body">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text">${item.acompanantes}</p>
                <p class="card-text">${item.bebidaysopa}</p>
                <p class="card-text">
                  <small class="text-muted">${item.precio}</small>
                </p>
                <a href="#" class="addCart ">+</a>
              </div>
            </div>
          </div>
        </div>`;
      }
    }
  };
  leerLocalStorage();
}

CntBandejas.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("addCart")) {
    DataRecolect(e);
  }
});
Enviar.addEventListener('click',whatsappSend)


function whatsappSend(e) {
  if (listaProductos.childNodes.length ==0){
    alert('introduce productos para realizar la compra')
  }else{
    let table = document.querySelector('#tableShop')
    let textoEspeci = ""
    let iterator = 0
    for (let data of table.rows){
      if (data.classList.contains('table-info')){

      }else{
        let Especificacion = data.childNodes[3].textContent
        let cantida = data.childNodes[5].childNodes[0].value
        let precio = data.childNodes[7].textContent
        let total = parseInt(precio) * parseInt(cantida)
        textoEspeci+= `Producto:${iterator} Plato:${Especificacion} Cantidad:${cantida} precio:${total} \n`
      
      }
      iterator++
    }
      
    let mensaje = `hola 👋 te hablamos https://leonardo2322.github.io/Catalogo/index.html colombia \n tipo de servicio: {validar Con nuestro equipo}🤝 \n Estado del Pago: no pagado💳 \n Pedido ✍:Por el catalogo digital \n especificacion Del Pedido: ${textoEspeci} costo total de la compra: ${totalCompraID.value} 💸 `
    iterator = 1
    let texto = mensaje + "  "+"Especificacion para los platos: " + inputEspesification.value + "   envia este mensaje te atenderemos enseguida"
    let what =`https://api.whatsapp.com/send?phone=+573502117928&text=${texto}`
    inputEspesification.value =  ""
    Enviar.setAttribute('href',`${what}`)
    vaciarCarrito()

  }
}

function DataRecolect(e) {
  let elemento = e.target.parentElement.parentElement;
  let imagenCard = elemento.parentElement;

  let infoProduct = {
    id: elemento.childNodes[1].childNodes[1].textContent,
    imagen: imagenCard.childNodes[1].src,
    titulo: elemento.childNodes[1].childNodes[1].textContent,
    precio: elemento.childNodes[1].childNodes[7].textContent,
    Especificacion: elemento.childNodes[1].childNodes[3].textContent,
    acompanantes: elemento.childNodes[1].childNodes[5].textContent,
    cantida: 1,
  };

  let productosLS;
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function (productoLS) {
    if (productoLS.id === infoProduct.id) {
      productosLS = productoLS.id;
    }
  });
  if (productosLS === infoProduct.id) {
    alert("El producto ya esta agregado al carrito ve a insertar cantidad");
  } else {
    insertarCarrito(infoProduct);
  }
}
function leerLocalStorage() {
  let productosLS;
  let cont = 1;
  let total = parseInt(totalCompraID.value);
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function (producto) {
    //Construir plantilla
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
              <img class="img-fluid" src="${producto.imagen}" >
          </td>
          <td>${producto.titulo}<br>${producto.Especificacion}<br>${producto.acompanantes}</td>
          <td class="cantidad "><input type="number" data-id="${cont}" value="${producto.cantida}" min="1" max="10" step="1" class="input-cant"></td>
          <td>${producto.precio}</td>
          <td>
              <a href="#" class="" style="font-size: 1.5rem" data-id="${producto.id}"><i class="delete-P bi bi-trash3-fill"></i><i class="cant-mas bi bi-plus-circle"></i><i class="cant-menos bi bi-dash-circle"></i></a>
          </td>
      `;
    cont++;

    console.log(typeof total);
    total += parseInt(producto.precio);
    console.log(total);

    listaProductos.appendChild(row);
  });
  totalCompraID.value = total;
}

function obtenerProductosLocalStorage() {
  let productoLS;
  //Comprobar si hay algo en LS
  if (localStorage.getItem("productos") === null) {
    productoLS = [];
  } else {
    productoLS = JSON.parse(localStorage.getItem("productos"));
  }
  return productoLS;
}

function guardarProductosLocalStorage(producto) {
  let productos;
  //Toma valor de un arreglo con datos del LS
  productos = this.obtenerProductosLocalStorage();
  //Agregar el producto al carrito
  productos.push(producto);
  //Agregamos al LS
  localStorage.setItem("productos", JSON.stringify(productos));
}

function insertarCarrito(producto) {
  count++
  console.log(count)
  const row = document.createElement("tr");
  /* row.classList.add('trCar') */
  row.innerHTML = `
  <td>
  <img class="img-fluid" src="${producto.imagen}" >
</td>
<td>${producto.titulo}<br>${producto.Especificacion}<br>${producto.acompanantes}</td>
<td class="cantidad "><input type="number" data-id="${contar}" value="${producto.cantida}" min="1" max="10" step="1" class="input-cant"></td>
<td>${producto.precio}</td>
<td>
  <a href="#" class="" style="font-size: 1.5rem" data-id="${producto.id}"><i class="delete-P bi bi-trash3-fill"></i><i class="cant-mas bi bi-plus-circle"></i><i class="cant-menos bi bi-dash-circle"></i></a>
</td>
  `;

  if (totalCompraID.value == 0) {
    totalCompraID.value = parseInt(producto.precio);
  } else {
    let total = parseInt(totalCompraID.value) + parseInt(producto.precio);
    totalCompraID.value = total;
  }

  contar++;
  listaProductos.appendChild(row);
  guardarProductosLocalStorage(producto);
}

// function sumarYRestar(valor){
//   if (totalCompraID.value == 0){
//     totalCompraID.value = parseInt(producto.precio)
//   }else{
//     let total =parseInt(totalCompraID.value) + parseInt(producto.precio)
//     console.log(total)
//     totalCompraID.value = total
//   }

// }

function vaciarCarrito(e) {
  e.preventDefault();
  inputEspesification.value=""
  count=0
  while (listaProductos.firstChild) {
    listaProductos.removeChild(listaProductos.firstChild);
  }
  vaciarLocalStorage();
  totalCompraID.value = 0;
  return false;
}

function vaciarLocalStorage() {
  localStorage.clear();
}

function eliminarProducto(e) {
  count--
  console.log(count)

  console.log(e.target)
  if (e.target.classList.contains("delete-P")) {
    e.preventDefault();
    let cantp = e.target.parentElement.parentElement.parentElement.childNodes[5].childNodes[0].value
    let producto, productoID;
    e.target.parentElement.parentElement.parentElement.remove();
    producto = e.target.parentElement.parentElement;
    productoID = producto.querySelector("a").getAttribute("data-id");
    contar--;
    let precio = parseInt(
      e.target.parentElement.parentElement.parentElement.childNodes[7]
        .textContent
    );
    let resta = parseInt(cantp) * parseInt(precio)
    let restando = parseInt(totalCompraID.value) - resta;
    totalCompraID.value = restando;
    eliminarProductoLocalStorage(productoID);
  }else if(e.target.classList.contains('cant-menos')){
    e.preventDefault()
    let datid= e.target.parentElement.getAttribute('data-id')
    let precio = parseInt(
      e.target.parentElement.parentElement.parentElement.childNodes[7]
        .textContent
    );
    let restando = parseInt(totalCompraID.value) - precio;
    totalCompraID.value = restando;

    console.log(datid,precio)
    eliminarProductoLocalStorage(datid)
  } else {
    let producto, productoID;
    console.log('dentra aqui')
    e.target.parentElement.parentElement.parentElement.remove();
    producto = e.target.parentElement.parentElement;
    console.log(producto);
    // productoID = producto.querySelector("a").getAttribute("data-id");
    contar--;
    // eliminarProductoLocalStorage(productoID);
  }
}

//Eliminar producto por ID del LS
function eliminarProductoLocalStorage(productoID) {
  let productosLS;
  //Obtenemos el arreglo de productos
  productosLS = this.obtenerProductosLocalStorage();
  //Comparar el id del producto borrado con LS
  productosLS.forEach(function (productoLS, index) {
    if (productoLS.id === productoID) {
      productosLS.splice(index, 1);
      if (count==0) {
        totalCompraID.value= 0
      }
    }
    
  });
  //A�adimos el arreglo actual al LS
  contar = 1;
  localStorage.setItem("productos", JSON.stringify(productosLS));
}
