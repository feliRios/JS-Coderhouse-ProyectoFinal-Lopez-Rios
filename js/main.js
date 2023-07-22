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

// Inicializacion de un carrito en el session storage:
// si el carrito existe (es decir, ya se ejecuto el programa), se prosigue con el programa.
// Si el carrito no existe (es decir, primera ejecucion), entonces se crea un carrito vacio

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
    console.log(todos);
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
  })
  .catch((err) => {
    console.log(err);
  });

if (!JSON.parse(sessionStorage.getItem("carrito"))) {
  let carrito = [];
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

// Menu principal
// options.innerHTML = `
//                         <ul>
//                             <li>
//                                 <button class="option-button" id="add-item">Agregar un producto</button>
//                             </li>
//                             <li>
//                                 <button class="option-button" id="show-cart">Mostrar carrito</button>
//                             </li>

//                             <li>
//                                 <button class="option-button" id="modify-item">Modificar un item</button>
//                             </li>
//                             <li>
//                                 <button class="empty-shopping-cart option-button" id="empty-cart">VACIAR CARRITO</button>
//                             </li>
//                         </ul>
//                     `;

// // Resolucion agregar item:
// let addItem = document.getElementById("add-item");

// addItem.addEventListener("click", agregarItemCarrito);
// // Resolucion mostrar carrito:
// let showCart = document.getElementById("show-cart");
// showCart.addEventListener("click", mostrarCarrito);

// // Resolucion vaciar carrito:
// let emptyCart = document.getElementById("empty-cart");
// emptyCart.addEventListener("click", vaciarCarrito);

// // Resolucion modificar item:
// let modifyItem = document.getElementById("modify-item");
// modifyItem.addEventListener("click", modificarItem);
