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

class Item {
  // Clase Item del carrito. Se aplicaron operadores ternarios para evitar nulls y NaNs
  constructor(name, price, quantity, id) {
      this.name = name || '';
      this.price = price || 0;
      this.quantity = quantity || 0;
      this.id = id || 0;
  }
}

if (!JSON.parse(sessionStorage.getItem("carrito"))) {
  let carrito = [];
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

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
    let addButton = document.getElementsByClassName('add-cart-button');
    for (const element of addButton) {
      console.log(element);
      element.addEventListener('click', () => {

        agregarItemCarrito(element, todos);

      })
    }
  })
  .catch((err) => {
    console.log(err);
  });

function showItems(){
  // Esta seria la funcion principal. Muestra los items del carrito en el menu
  // desplegable. Contiene a otras funciones de otras funcionalidades

  let showItems = document.querySelector('.cart-items');
  let showMenu = document.querySelector('.menu');
  let carrito = JSON.parse(sessionStorage.getItem("carrito"));

  if (carrito.length){
    carrito.forEach(e => {
      const newContent = document.createElement('li');
      const increaseDecreaseButton = document.createElement('div');
      increaseDecreaseButton.classList.add('incDec-button-container');
      increaseDecreaseButton.innerHTML = `
                                          <button class="increase-button" id="increase-button-${e.id}">+</button>
                                          <button class="decrease-button" id="decrease-button-${e.id}">-</button>
                                         `
      newContent.innerHTML = `
                                <div>
                                  <p>PRODUCTO: ${e.name}</p>
                                  <p>PRECIO: ${e.price}</p>
                                  <p>CANTIDAD: ${e.quantity}</p>
                                  <button class="delete-cart-button" id="delete-cart-${e.id}">Eliminar</button>
                                </div>
                             `
      newContent.appendChild(increaseDecreaseButton);
      showItems.appendChild(newContent);

      // Aca iria la logica de modificar la cantidad de un item

      let increaseButtons = document.getElementsByClassName('increase-button');
      let decreaseButtons = document.getElementsByClassName('decrease-button');

      modifyItem(e, increaseButtons, decreaseButtons);

    });

    // Aca estaria la logica de eliminar un item con su respectivo boton

    let deleteButton = document.getElementsByClassName("delete-cart-button");
    for (const element of deleteButton) {
      element.addEventListener("click", () => {

        deleteItem(element);
        
      });
    }

    // Aca estaria la logica de aumentar o disminuir la cantidad de un item



    // Aca estaria la logica de los botones de vaciar carrito, ver el total y
    // calcular las cuotas con interes

    const cartOptions = document.createElement('div');
    cartOptions.classList.add('cart-options');
    cartOptions.innerHTML = `
                              <button class="empty-cart-button">VACIAR CARRITO</button>
                              <button class="interest-calc">CALCULAR CUOTAS</button>
                            `
    showMenu.appendChild(cartOptions);

    // Logica y funcion de vaciar carrito

    let emptyCartButton = document.querySelector('.empty-cart-button');
    emptyCartButton.addEventListener('click', () => {

      emptyCart();

    });

    // Logica y funcion de calcular cuotas
    
    let interestCalcButton = document.querySelector('.interest-calc');
    interestCalcButton.addEventListener('click', () => {

      installmentsCalc();

    });


    let cartTotal = carrito.reduce((acu, e) => { return acu += (e.price * e.quantity) }, 0);

    const cartPrice = document.createElement('div');
    cartPrice.classList.add('cart-total');
    cartPrice.innerHTML = `
                            <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
                          `
    showMenu.appendChild(cartPrice);

  } else {
    showMenu.innerHTML = `
                          <p>¡Ups! Parece que tu carrito se encuentra vacío...</p>
                         `
  }
}

showItems();
