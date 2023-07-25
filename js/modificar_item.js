function modifyItem(product, increaseBtns, decreaseBtns, carrito) {
  for (const incButton of increaseBtns) {
    incButton.addEventListener("click", () => {
      if (incButton.id.slice(-1) == product.id) {
        product.quantity++;
      }
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }

  // La siguiente logica establece que si la cantidad del producto es mayor a 1,
  // entonces la cantidad se puede decrementar. Caso contrario, el boton de decremento
  // pasara a no estar disponible (mediante la adicion de una
  // nueva clase 'decrease-unavaliable')

  if (product.quantity > 1) {
    for (const decButton of decreaseBtns) {
      decButton.addEventListener("click", () => {
        if (decButton.id.slice(-1) == product.id) {
          product.quantity--;
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
      });
    }
  } else {
    for (const decButton of decreaseBtns) {
      if (decButton.id.slice(-1) == product.id) {
        decButton.classList.add("decrease-unavaliable");
        decButton.disabled = true;
        decButton.style.opacity = 0.7;
      }
    }
  }
}
