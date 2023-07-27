function showCart() {
  // Esta funcion se encarga de mostrar los items del carrito. Se utiliza
  // tanto al momento de añadir un producto nuevo al carrito como al momento
  // de actualizar la ventana.

  // Me traigo el carrito del storage
  const carrito = JSON.parse(sessionStorage.getItem("carrito"));

  const showItems = document.querySelector(".cart-items");
  const showFunctions = document.querySelector(".cart-functions");

  showItems.innerHTML = "";

  for (const product of carrito) {
    // Bucle FOR que dibuja los items en el carrito
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

    // Logica para incrementar/decrementar la cantidad de productos a traves de
    // sus respectivos botones

    const increase = document.getElementById(`increase-button-${product.id}`);
    increase.addEventListener("click", () => {
      increaseProduct(product.id);
    });

    const decrease = document.getElementById(`decrease-button-${product.id}`);
    if (product.quantity > 1) {
      // Condicional que no permite reducir la cantidad de un item si su cantidad es 1
      decrease.addEventListener("click", () => {
        decreaseProduct(product.id);
      });
    } else {
      decrease.classList.add("unavailable-button");
      decrease.disabled = true;
      decrease.style.opacity = 0.8;
    }

    // Logica para eliminar un producto del carrito

    const deleteProduct = document.getElementById(`delete-cart-${product.id}`);
    deleteProduct.addEventListener("click", () => {
      deleteItem(product);
    });
  }

  // Variable declarada para calcular el total del carrito
  const cartTotal = carrito.reduce((acu, e) => {
    return (acu += e.price * e.quantity);
  }, 0);

  // Logica de los botones de vaciar carrito, ver el total y calcular cuotas con interes

  if (showFunctions.childNodes.length == 1 && carrito.length != 0) {
    // Esta condicional evita que las opciones del carrito se dupliquen e
    // indica si el carrito se encuentra vacio
    showFunctions.innerHTML = ``;

    const cartOptions = document.createElement("div");
    cartOptions.classList.add("cart-options");
    cartOptions.innerHTML = `
                              <button class="empty-cart-button">VACIAR CARRITO</button>
                              <button class="interest-calc">CALCULAR CUOTAS</button>
                              <button class="buy-cart">FINALIZAR COMPRA</button>
                            `;
    showFunctions.appendChild(cartOptions);

    // Logica y funcion de vaciar carrito
    const emptyCartButton = document.querySelector(".empty-cart-button");
    emptyCartButton.addEventListener("click", () => {
      emptyCart();
    });

    // Logica y funcion de calcular cuotas

    const interestCalcButton = document.querySelector(".interest-calc");
    interestCalcButton.addEventListener("click", () => {
      installmentsCalc();
    });

    // Logica y funcion de comprar carrito y aplicar un descuento

    const purchase = document.querySelector(".buy-cart");
    purchase.addEventListener("click", () => {
      buyCart(cartTotal);
    });

    const cartPrice = document.createElement("div");
    cartPrice.classList.add("cart-total");
    cartPrice.innerHTML = `
                            <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
                          `;
    showFunctions.appendChild(cartPrice);
  } else if (carrito.length == 0) {
    showFunctions.innerHTML = `<p>¡Tu carrito se encuentra vacío!</p>`;
  }

  if (carrito.length != 0) {
    // Condicional que me permite actualizar el total del carrito al momento
    document.querySelector(".cart-total").innerHTML = `
      <p>Total: ARS <strong>$ ${cartTotal}</strong></p>
    `;
  }
}
