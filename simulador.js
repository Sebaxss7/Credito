// Funciones auxiliares para mostrar y limpiar errores
function mostrarError(idInput, mensaje) {
    let inputElem = document.getElementById(idInput);
    if (inputElem) {
        inputElem.classList.add("input-error");
        let msgElem = document.getElementById("err-" + idInput);
        if (!msgElem) {
            msgElem = document.createElement("small");
            msgElem.id = "err-" + idInput;
            msgElem.className = "mensaje-error";
            inputElem.parentNode.insertBefore(msgElem, inputElem.nextSibling);
        }
        msgElem.textContent = mensaje;
    }
}

function limpiarErrores() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.classList.remove("input-error"));
    
    let mensajes = document.querySelectorAll(".mensaje-error");
    mensajes.forEach(msg => msg.remove());
}

function calcular() {
    // 1. Limpiar errores previos
    limpiarErrores();

    // 2. Obtener elementos de entrada
    let txtIngresos = document.getElementById("txtIngresos");
    let txtEgresos = document.getElementById("txtEgresos");
    let txtMonto = document.getElementById("txtMonto");
    let txtPlazo = document.getElementById("txtPlazo");
    let txtTasaInteres = document.getElementById("txtTasaInteres");

    let esValido = true;

    // --- VALIDACIONES ---

    // Ingresos
    let ingresosVal = txtIngresos.value.trim();
    let ingresos = parseFloat(ingresosVal);
    if (ingresosVal === "") {
        mostrarError("txtIngresos", "El campo de ingresos es obligatorio.");
        esValido = false;
    } else if (isNaN(ingresos) || ingresos <= 0) {
        mostrarError("txtIngresos", "Ingrese un valor de ingresos válido y mayor a 0.");
        esValido = false;
    }

    // Egresos
    let egresosVal = txtEgresos.value.trim();
    let egresos = parseFloat(egresosVal);
    if (egresosVal === "") {
        mostrarError("txtEgresos", "El campo de egresos es obligatorio.");
        esValido = false;
    } else if (isNaN(egresos) || egresos < 0) {
        mostrarError("txtEgresos", "Los egresos no pueden ser negativos.");
        esValido = false;
    } else if (!isNaN(ingresos) && egresos > ingresos) {
        mostrarError("txtEgresos", "Los egresos no pueden ser mayores que los ingresos.");
        esValido = false;
    }

    // Monto
    let montoVal = txtMonto.value.trim();
    let monto = parseFloat(montoVal);
    if (montoVal === "") {
        mostrarError("txtMonto", "El monto del crédito es obligatorio.");
        esValido = false;
    } else if (isNaN(monto) || monto < 100 || monto > 50000) {
        mostrarError("txtMonto", "El monto debe estar entre $100 y $50,000.");
        esValido = false;
    }

    // Plazo
    let plazoVal = txtPlazo.value.trim();
    let plazoAnios = parseFloat(plazoVal);
    if (plazoVal === "") {
        mostrarError("txtPlazo", "El plazo es obligatorio.");
        esValido = false;
    } else if (isNaN(plazoAnios) || !Number.isInteger(plazoAnios) || plazoAnios < 1 || plazoAnios > 30) {
        mostrarError("txtPlazo", "El plazo debe ser un número entero entre 1 y 30 años.");
        esValido = false;
    }

    // Tasa de Interés
    let tasaVal = txtTasaInteres.value.trim();
    let tasa = parseFloat(tasaVal);
    if (tasaVal === "") {
        mostrarError("txtTasaInteres", "La tasa de interés es obligatoria.");
        esValido = false;
    } else if (isNaN(tasa) || tasa < 1 || tasa > 50) {
        mostrarError("txtTasaInteres", "La tasa de interés debe estar entre 1% y 50%.");
        esValido = false;
    }

    // Si hay errores, detener el cálculo
    if (!esValido) {
        return;
    }

    // 3. Ejecutar el cálculo si todas las validaciones pasaron correctamente
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("lblDisponibleValor").textContent = "USD " + disponible.toFixed(2);

    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("lblCapacidadPagoValor").textContent = "USD " + capacidadPago.toFixed(2);

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("lblInteresValor").textContent = "USD " + interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("lblTotalValor").textContent = "USD " + totalPagar.toFixed(2);

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    document.getElementById("lblCuotaValor").textContent = "USD " + cuotaMensual.toFixed(2);

    let fueAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let lblResultado = document.getElementById("lblResultado");

    if (fueAprobado) {
        lblResultado.textContent = "CRÉDITO APROBADO";
    } else {
        lblResultado.textContent = "CRÉDITO RECHAZADO";
    }
}

function reiniciar() {
    limpiarErrores();
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";
    document.getElementById("lblDisponibleValor").textContent = "USD 0.00";
    document.getElementById("lblCapacidadPagoValor").textContent = "USD 0.00";
    document.getElementById("lblInteresValor").textContent = "USD 0.00";
    document.getElementById("lblTotalValor").textContent = "USD 0.00";
    document.getElementById("lblCuotaValor").textContent = "USD 0.00";
    document.getElementById("lblResultado").textContent = "";
}