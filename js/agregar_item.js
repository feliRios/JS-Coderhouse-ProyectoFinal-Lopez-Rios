function addItemToCart(element, todos) {
  // Esta funcion agrega un Item al carrito

  return new Promise((resolve, reject) => {
    // Me traigo el carrito del storage
    const carrito = JSON.parse(sessionStorage.getItem("carrito"));

    // Selecciono el atributo ID del nodo. Posteriormente, selecciono el ultimo
    // caracter (que posee el ID del elemento en el JSON)
    const productId = element.id.slice(-1);
    const productToAdd = todos.filter((e) => {
      return e.id == productId;
    });

    if (productToAdd) {
      // Si se cumple esta condicion, significa que el item existe.

      if (
        carrito.filter((e) => {
          return e.id == productToAdd[0].id;
        }).length
      ) {
        // Logica: si se añade al carrito un producto que ya existe en el mismo, se
        // lanza una tostada indicativa

        Toastify({
          text: "Este producto ya fue agregado al carrito",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #e30000, #bb7001)",
          },
        }).showToast();
      } else {
        carrito.push(
          new Item(
            productToAdd[0].nombre,
            productToAdd[0].precio,
            1,
            productToAdd[0].id
          )
        );
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
          },
        }).showToast();
      }

      resolve(
        new Item(
          productToAdd[0].nombre,
          productToAdd[0].precio,
          1,
          productToAdd[0].id
        )
      );
    } else {
      reject("El producto no existe");
    }
  });
}
