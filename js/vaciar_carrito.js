function emptyCart() {
  Swal.fire({
    title: "¿Estás seguro que deseas vaciar el carrito?",
    text: "¡No vas a poder revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, vaciar carrito",
    cancelButtonText: "Cancelar",
  }).then((res) => {
    if (res.isConfirmed) {
      carrito = [];
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      Swal.fire({
        title: "Carrito vaciado",
        text: "Eliminaste todos los productos del carrito",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    }
    showCart();
  });
}
