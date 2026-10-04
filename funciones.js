function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

function calcularInteresSimple(monto, tasa,plazoAnios) {
    let calcularInteres = monto * (tasa / 100) * plazoAnios;
    return calcularInteres;
}

function calcularTotalPagar(monto, interes) {
    let totalPagar= monto + interes + 100;
    return totalPagar;
}

function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    return total / meses;
}

function crearCredito(capacidadPago,cuotaMensual) {
    if (capacidadPago >= cuotaMensual) {
        return "APROBADO";
    } else {
        return "RECHAZADO";
    }

}

function aprobarCredito (capacidadPago, cuotaMensual)  {
    if (capacidadPago > cuotaMensual) {
        return "APROBADO";
    } else {
        return "RECHAZADO";
    }
}
