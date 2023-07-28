async function installmentsCalc() {
  // Esta funcion permite calcular el valor total del carrito en caso de que
  // el usuario precise un pago en cuotas (en este caso con interes)
  // 6 cuotas -> 15% interes
  // 12 cuotas -> 20% interes
  // 18 cuotas -> 22% interes

  const carrito = JSON.parse(sessionStorage.getItem("carrito"));

  const inputOptions = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        6: "6 (15% interes)",
        12: "12 (20% interes)",
        18: "18 (22% interes)",
      });
    }, 500);
  });

  const { value: cuotas } = await Swal.fire({
    title: "Seleccione la cantidad de cuotas",
    width: 600,
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Debes seleccionar una opción para continuar";
      }
    },
  });

  if (cuotas) {
    const total = carrito.reduce((acu, e) => {
      return (acu += e.price * e.quantity);
    }, 0);
    const valorCuota = total / parseInt(cuotas);
    let valorCuotaConInteres, valorTotal;

    switch (cuotas) {
      case "6":
        valorCuotaConInteres = valorCuota * 1.15;
        valorTotal = valorCuotaConInteres * 6;
        break;

      case "12":
        valorCuotaConInteres = valorCuota * 1.2;
        valorTotal = valorCuotaConInteres * 12;
        break;

      case "18":
        valorCuotaConInteres = valorCuota * 1.22;
        valorTotal = valorCuotaConInteres * 18;
        break;

      default:
        throw new Error("opción no valida");
    }

    Swal.fire({
      html: `
              Seleccionaste: ${cuotas} cuotas <br> 
              El total del carrito es: ARS <strong>$ ${valorTotal}</strong> <br>
              (Un total de ${cuotas} cuotas de ARS $ ${
        valorTotal / cuotas
      }) <br>
              Monto total anterior SIN interes: ARS $ <strong>${total}</strong>
            `,
    });
  }
}
