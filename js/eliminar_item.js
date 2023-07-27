function deleteItem(product) {
  // Esta funcion elimina el Item seleccionado del carrito
  const carrito = JSON.parse(sessionStorage.getItem("carrito"));
  const productIndex = carrito.findIndex((el) => el.id === product.id);
  carrito.splice(productIndex, 1);
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  showCart();
}
