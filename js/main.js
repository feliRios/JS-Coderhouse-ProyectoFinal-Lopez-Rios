// PROYECTO FINAL
// - Presentar una página web interactiva en JavaScript. La misma debe simular distintos procesos.
// - Utilizar AJAX y JSON para obtener datos y diversas herramientas de JS como librerías,
//   promises y asincronía para controlar eventos en la interfaz y producir animaciones
//   en respuesta
// - Utilizar Javascript para mejorar la interacción y dinamismo de la página,
//   generando una interfaz coherente y atractiva.
// - Contar con una estructura de datos clara, basada en Arrays y Objetos.
// - Utilizar funciones, condicionales e iteradores para manipular los datos de la app.
// - Generar y manipular el DOM. Crear vistas a partir de datos de la app y generar
//   eventos para responder a la interacción del usuario. Utilizar alguna librería relevante
//   para el simulador.
// - Utilizar asincronía y fetch para cargar datos estáticos o consumir una API.

class Item {
  // Clase Item del carrito. Se aplicaron operadores ternarios para evitar nulls y NaNs
  constructor(name, price, quantity, id) {
    this.name = name || "";
    this.price = price || 0;
    this.quantity = quantity || 0;
    this.id = id || 0;
  }
}

if (!JSON.parse(sessionStorage.getItem("carrito"))) {
  // Inicializacion del carrito en el session storage:
  // si el carrito existe (es decir, ya se ejecuto el programa), se prosigue con el programa.
  // Si el carrito no existe (es decir, primera ejecucion), entonces se crea un carrito vacio
  const carrito = [];
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

// Se selecciona el nodo que va a contener los productos para comprar
const options = document.querySelector(".options");

// fetch para obtener los items localmente
fetch("./products.json")
  .then((req) => {
    if (req.ok) {
      return req.json();
    } else {
      throw new Error("Hubo un error al traer los datos: " + req.status);
    }
  })
  .then((todos) => {
    todos.forEach((element) => {
      const newContent = document.createElement("div");
      newContent.innerHTML = `
                                <h3>${element.nombre}</h3>
                                <p>Precio: ARS $ ${element.precio}</p>
                                <img src="${element.imag}">
                                <button class="add-cart-button" id="add-cart-${element.id}">AÑADIR AL CARRITO</button>
                             `;
      options.appendChild(newContent);
    });

    const addButton = document.getElementsByClassName("add-cart-button");

    for (const btn of addButton) {
      btn.addEventListener("click", () => {
        addItemToCart(btn, todos)
          .then((product) => {
            console.log(product);
            showCart();
          })
          .catch((err) => {
            alert(err);
          });
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

window.addEventListener("load", () => {
  showCart();
});
