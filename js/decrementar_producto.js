function decreaseProduct(productId) {
  const carrito = JSON.parse(sessionStorage.getItem("carrito"));
  const product = carrito.find((el) => el.id === productId);
  product.quantity--;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  showCart();
}
