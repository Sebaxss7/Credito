function calcular() {
    let ingresos = parseFloat (document.getElementById("txtIngresos").value);
    let egresos = parseFloat (document.getElementById("txtEgresos").value);
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("lblDisponibleValor").textContent = "USD " + disponible.toFixed(2);
    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("lblCapacidadPagoValor").textContent = "USD " + capacidadPago.toFixed(2);
    let monto = parseInt(document.getElementById("txtMonto").value) || 0;
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseInt(document.getElementById("txtTasaInteres").value) || 0;
    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("lblInteresValor").textContent = "USD " + interes.toFixed(2);
    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("lblTotalValor").textContent = "USD " + totalPagar.toFixed(2);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    document.getElementById("lblCuotaValor").textContent = "USD " + cuotaMensual.toFixed(2);
    let resultado = crearCredito(capacidadPago, cuotaMensual);
    document.getElementById("lblResultado").textContent = resultado;
    let lblResultado = document.getElementById("lblResultado");
    if(fueAprobado){
        lblResultado.innerText = "CREDTO APROBADO";
    } else {
        lblResultado.innerText = "CREDITO RECHAZADO";
    }
}

function reiniciar() {
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