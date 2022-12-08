const containCards = document.querySelector(".accordion-body");
const CntBandejas = document.querySelector("#acord-Bandejas");
let productos = [];
let listaProductos = document.querySelector("#listaProductos");
let btnVaciarCarrito = document.querySelector("#btn-Vaciar");
let tablaCarrito= document.querySelector('#tabla-carrito')

tablaCarrito.addEventListener('click',eliminarProducto)

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
        // let contenedor = document.createElement('div')

        containCards.innerHTML += `<div class="card mb-5" style="width: 18rem;">
          <img src="${item.imagen}" class="card-img-top" alt="...">
          <div class="card-body ${item.titulo}">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.acompanantes}</p>
            <h2 class="card-text">${item.precio}</h2>
            <p class="card-text">${item.bebidaysopa}</p>
            <a href="#" class="btn btn-primary">agregar al carrito</a>
          </div>
        </div>`;
      }
    }
  };
  leerLocalStorage();
}

CntBandejas.addEventListener("click", (e) => {
  e.preventDefault();
  let elemento = e.target.parentElement.parentElement;

  console.log(elemento.childNodes[3].childNodes[7].textContent);
  let infoProduct = {
    id: elemento.childNodes[3].childNodes[1].textContent,
    imagen: elemento.childNodes[1].src,
    titulo: elemento.childNodes[3].childNodes[1].textContent,
    precio: elemento.childNodes[3].childNodes[5].textContent,
    Especificacion: elemento.childNodes[3].childNodes[3].textContent,
    acompanantes: elemento.childNodes[3].childNodes[7].textContent,
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
});

function leerLocalStorage() {
  let productosLS;
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function (producto) {
    //Construir plantilla
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>
              <img class="img-fluid" src="${producto.imagen}" >
          </td>
          <td>${producto.titulo}<br>${producto.Especificacion}<br>${producto.acompanantes}</td>
          <td>${producto.cantida}</td>
          <td>${producto.precio}</td>
          <td>
              <a href="#" class="" style="font-size: 1.5rem" data-id="${producto.id}"><i class="delete-P bi bi-trash3-fill"></i><i class="cant-mas bi bi-plus-circle"></i><i class="cant-menos bi bi-dash-circle"></i></a>
          </td>
      `;
    listaProductos.appendChild(row);
  });
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
  const row = document.createElement("tr");
  /* row.classList.add('trCar') */
  row.innerHTML = `
      <td>
          <img class="imgCar img-fluid" src="${producto.imagen}" >
      <td class="tituloCar" style="font-size: 1rem p-3" >${producto.titulo}<br>${producto.Especificacion}<br>${producto.acompanantes}</td>
      <td class="precioCar" style="font-size: 1rem " >${producto.cantida} </td>
      <td class="precioCar" style="font-size: 1rem " >${producto.precio}</td>

      <td>
          <a href="#" style="font-size: 1.5rem" class="" data-id="${producto.id}"><i class="delete-P bi bi-trash3-fill"></i><i class="cant-mas bi bi-plus-circle"></i><i class="cant-menos bi bi-dash-circle"></i></a>
      </td>
  `;
  listaProductos.appendChild(row);
  guardarProductosLocalStorage(producto);
}

function vaciarCarrito(e) {
  e.preventDefault();
  while (listaProductos.firstChild) {
    listaProductos.removeChild(listaProductos.firstChild);
  }
  vaciarLocalStorage();
  return false;
}

function vaciarLocalStorage() {
  localStorage.clear();
}

function eliminarProducto(e) {
  e.preventDefault();
  let producto, productoID;
  if (e.target.classList.contains("delete-P")) {
    e.target.parentElement.parentElement.parentElement.remove();
    producto = e.target.parentElement.parentElement;
    productoID = producto.querySelector("a").getAttribute("data-id");
  }
  eliminarProductoLocalStorage(productoID)
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
    }
  });
  //A�adimos el arreglo actual al LS
  localStorage.setItem("productos", JSON.stringify(productosLS));
}
