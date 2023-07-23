function deleteItem(element) {
  // Esta funcion elimina el Item seleccionado del carrito
  let carrito = JSON.parse(sessionStorage.getItem("carrito"));

  // Selecciono el atributo ID del nodo. Posteriormente, selecciono el ultimo
  // caracter (que posee el ID del elemento en el JSON)
  let productId = element.id.slice(-1);

  // Busco el indice del elemento con ID = productId. Si lo encuentra, lo elimina
  let index = carrito.findIndex((e) => {
    return e.id == productId;
  });
  index != -1 && carrito.splice(index, 1);

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}
