const btn = document.querySelector(".test");

btn.addEventListener("click", traerDatos);

function traerDatos() {

  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "json/api.json", true);

  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        let datos = JSON.parse(this.responseText);
        console.log(datos)
    }
  };
}
