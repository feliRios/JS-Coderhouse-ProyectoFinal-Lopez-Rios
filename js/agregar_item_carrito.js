function agregarItemCarrito(element, todos) {
  // Esta funcion agrega un Item al carrito
  // Me traigo el carrito del storage
  let carrito = JSON.parse(sessionStorage.getItem('carrito'));

  // Selecciono el atributo ID del nodo. Posteriormente, selecciono el ultimo
  // caracter (que posee el ID del elemento en el JSON)
  let productId = element.id.slice(-1)
  let productToAdd = todos.filter(e => { return e.id == productId });
  console.log(productToAdd);
  console.log(carrito);

  // Logica: si se añade al carrito un producto que ya existe en el mismo, se
  // aumenta su cantidad una unidad.
  if ((carrito.filter(e => { return e.id == productToAdd[0].id } )).length){
    console.log("Si existe");
    let productToModify = carrito.filter(e => { return e.id == productToAdd[0].id } );
    productToModify[0].quantity++;
  } else {
    console.log("No existe");
    carrito.push(new Item(productToAdd[0].nombre, productToAdd[0].precio, 1, productToAdd[0].id));
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito));

  Toastify({
    text: "Producto agregado correctamente",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}
