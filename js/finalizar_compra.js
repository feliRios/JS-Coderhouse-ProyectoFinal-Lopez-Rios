async function buyCart() {
  // Me traigo el carrito del storage
  let carrito = JSON.parse(sessionStorage.getItem("carrito"));

  const total = carrito.reduce((acu, e) => {
    return (acu += e.price * e.quantity);
  }, 0);

  const inputOptions = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        1: "Si",
        0: "No",
      });
    }, 500);
  });

  const { value: eleccion } = await Swal.fire({
    title: "¿Tenés un código de descuento? (archivo discs.txt)",
    width: 600,
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes seleccionar una opción para continuar";
      }
    },
  });

  if (eleccion == 1) {
    Swal.fire({
      title: "Ingrese su codigo promocional",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        return fetch("./json/discounts.json")
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error(res.statusText);
          })
          .then((todos) => {
            let codigos = todos[0].codigos;
            if (codigos.includes(code)) {
              return true;
            } else {
              throw new Error("Código no válido");
            }
          })
          .catch((err) => {
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Genial!",
          html: `
                  Con tu codigo obtenes un <strong>20%</strong> de descuento <br>
                  Total a pagar: ARS <strong>$ ${total * 0.8}</strong> <br>
                  (Precio anterior: ARS $ ${total})
                `,
          showCancelButton: true,
          confirmButtonText: "Finalizar compra",
          cancelButtonText: "Cancelar",
        }).then((res) => {
          if (res.isConfirmed) {
            carrito = [];
            sessionStorage.setItem('carrito', JSON.stringify(carrito));

            Swal.fire({
              icon: "success",
              title: "Gracias por su compra",
              text: `Usted pagó ARS $ ${total * 0.8}`,
            });

            showCart();
          }
        });
      }
    });
  } else {
    carrito = [];
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
      icon: "success",
      title: "Gracias por su compra",
      text: `Usted pagó ARS $ ${total}`,
    });

    showCart();
  }
}
