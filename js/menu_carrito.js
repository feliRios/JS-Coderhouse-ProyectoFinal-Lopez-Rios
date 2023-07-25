function showCart() {
  // Esta funcion se encarga de mostrar los items del carrito. Se utiliza
  // tanto al momento de añadir un producto nuevo al carrito como al momento
  // de actualizar la ventana.
  // Contiene a otras funciones de otras funcionalidades

  // Me traigo el carrito del storage
  let carrito = JSON.parse(sessionStorage.getItem("carrito"));

  let showMenu = document.querySelector(".menu");
  let showItems = document.querySelector(".cart-items");
  let showFunctions = document.querySelector(".cart-functions");

  showItems.innerHTML = '';  
  
  // Recorro todos los productos del carrito
  for (const product of carrito) {
    const newContent = document.createElement("li");
    newContent.innerHTML = `
                              <div>
                                <p>PRODUCTO: ${product.name}</p>
                                <p>PRECIO: ${product.price}</p>
                                <p>CANTIDAD: ${product.quantity}</p>
                                <button class="delete-cart-button" id="delete-cart-${product.id}">Eliminar</button>
                              </div>
                            `;
    const increaseDecreaseButton = document.createElement("div");
    increaseDecreaseButton.classList.add("incDec-button-container");
    increaseDecreaseButton.innerHTML = `
                                        <button class="increase-button" id="increase-button-${product.id}">+</button>
                                        <button class="decrease-button" id="decrease-button-${product.id}">-</button>
                                        `;
    newContent.appendChild(increaseDecreaseButton);
    showItems.appendChild(newContent);

    // Aca iria la logica de modificar la cantidad del item
  }

  // Variable declarada para calcular el total del carrito
  let cartTotal = carrito.reduce((acu, e) => { return acu += (e.price * e.quantity) }, 0);
  console.log(cartTotal);

  // Aca estaria la logica de los botones de vaciar carrito, ver el total y
  // calcular las cuotas con interes

  if (showFunctions.childNodes.length == 1 && carrito.length != 0) {
    // Esta condicional evita que las opciones del carrito se dupliquen e
    // indica si el carrito se encuentra vacio
    showFunctions.innerHTML = ``

    const cartOptions = document.createElement('div');
    cartOptions.classList.add('cart-options');
    cartOptions.innerHTML = `
                              <button class="empty-cart-button">VACIAR CARRITO</button>
                              <button class="interest-calc">CALCULAR CUOTAS</button>
                            `
    showFunctions.appendChild(cartOptions);

    // Logica y funcion de vaciar carrito
    let emptyCartButton = document.querySelector(".empty-cart-button");
    emptyCartButton.addEventListener("click", () => {
      emptyCart();
    });


    // Logica y funcion de calcular cuotas
    
    let interestCalcButton = document.querySelector('.interest-calc');
    interestCalcButton.addEventListener('click', () => {

      installmentsCalc();

    });
  
    const cartPrice = document.createElement('div');
    cartPrice.classList.add('cart-total');
    cartPrice.innerHTML = `
                            <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
                          `
    showFunctions.appendChild(cartPrice);
  } else if (carrito.length == 0 ){
    showFunctions.innerHTML = `<p>¡Tu carrito se encuentra vacío!</p>`
  }

  if (carrito.length != 0) {
    // Condicional que me permite actualizar el total del carrito al momento
    (document.querySelector('.cart-total')).innerHTML = `
      <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
    `
  }
}

//       let increaseButtons = document.getElementsByClassName("increase-button");
//       let decreaseButtons = document.getElementsByClassName("decrease-button");

//       modifyItem(e, increaseButtons, decreaseButtons, carrito);
//     });

//     // Aca estaria la logica de eliminar un item con su respectivo boton

//     let deleteButton = document.getElementsByClassName("delete-cart-button");
//     for (const element of deleteButton) {
//       element.addEventListener("click", () => {
//         deleteItem(element);
//       });
//     }

//     // Aca estaria la logica de aumentar o disminuir la cantidad de un item

//     // Aca estaria la logica de los botones de vaciar carrito, ver el total y
//     // calcular las cuotas con interes

//     const cartOptions = document.createElement("div");
//     cartOptions.classList.add("cart-options");
//     cartOptions.innerHTML = `
//                                 <button class="empty-cart-button">VACIAR CARRITO</button>
//                                 <button class="interest-calc">CALCULAR CUOTAS</button>
//                               `;
//     showMenu.appendChild(cartOptions);

//     // Logica y funcion de vaciar carrito

//     let emptyCartButton = document.querySelector(".empty-cart-button");
//     emptyCartButton.addEventListener("click", () => {
//       emptyCart();
//     });

//     // Logica y funcion de calcular cuotas

//     let interestCalcButton = document.querySelector(".interest-calc");
//     interestCalcButton.addEventListener("click", () => {
//       installmentsCalc();
//     });

//     let cartTotal = carrito.reduce((acu, e) => {
//       return (acu += e.price * e.quantity);
//     }, 0);

//     const cartPrice = document.createElement("div");
//     cartPrice.classList.add("cart-total");
//     cartPrice.innerHTML = `
//                               <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
//                             `;
//     showMenu.appendChild(cartPrice);
//   } else {
//     showMenu.innerHTML = `
//                             <p>¡Ups! Parece que tu carrito se encuentra vacío...</p>
//                            `;
//   }
// }
