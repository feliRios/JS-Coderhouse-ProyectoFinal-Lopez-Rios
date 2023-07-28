function deleteItem(product) {
  // Esta funcion elimina el Item seleccionado del carrito
  const card = document.querySelector(`.cart-product-${product.id}`)
  card.classList.add('fade-out')

  // Este setTimeout permite hacer la animacion del item eliminandose
  setTimeout(() => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito"));
    const productIndex = carrito.findIndex((el) => el.id === product.id);
    carrito.splice(productIndex, 1);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    showCart();
  }, 500);

  
}
