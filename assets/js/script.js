document.querySelector("#dolar").addEventListener("click", function () {
  obtenerDatos("dolar");
});
document.querySelector("#uf").addEventListener("click", function () {
  obtenerDatos("uf");
});

/* Al pasarle el parametro 'dolar' y 'uf' al llamado de la funcion obtenerDatos en las lineas 2 y 5, esta viaja o se copia al parametro de la funcion en la linea 10. Asi se recicla el codigo de dicha funcion para los dos botones dolar y uf.*/

function obtenerDatos(valor) {
  let url = `https://mindicador.cl/api/${valor}`;

  // Se instancia el objeto api
  const apiIndicador = new XMLHttpRequest();
  /* Dentro de open ([metodo], [url], [true]) | el true es para indicar si es asíncrono o no lo es. | el url es la variable que contiene la url de la api*/
  apiIndicador.open("GET", url, true);
  apiIndicador.send();

  apiIndicador.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      // Aquí se ejecuta el codigo de respuesta al boton.

      // Esto imprime en consola la consulta de la api completa.
      //   console.log(this.responseText);

      // Se guardan en variable todos los datos de la api.
      let datos = JSON.parse(this.responseText);
      /* Se imprime por consola ya el array de objetos con los datos de la api.*/
      //   console.log(datos.serie);

      let resultado = document.querySelector("#resultado");
      resultado.innerHTML =
        ""; /* string en blanco para cuando se busque UF quede en blando, y se debe colocar innerHTML para que modifique el elemento resultado*/

      // Variable que determina el inicio de la iteracion  
      let i = 1;
      // Iterar el array datos.serie con un for of.
      for (let item of datos.serie) {
        i++;
        resultado.innerHTML += `<li>${item.fecha.substr(0, 10)} | CLP ${item.valor}</li>`;
        /* Si se requieren solo 10 datos el ciclo se detiene en 10 porque el valor de i se inicializó con 0 */
        if(i > 10){
            break;
        }
      }
    }
  };
}
