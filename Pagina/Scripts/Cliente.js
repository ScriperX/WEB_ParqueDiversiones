
function Insertar() {
    EjecutarComando("POST", "Insertar");
}

function Actualizar() {
    EjecutarComando("PUT", "Actualizar");
}

function Eliminar() {
    EjecutarComando("DELETE", "Eliminar");
}

async function EjecutarComando(metodo, funcion) {

    const cliente = new Cliente($("#txtDocumento").val(), $("#txtNombre").val(), $("#txtPrimerApellido").val(), $("#txtSegundoApellido").val(),
        $("#txtDireccion").val(), $("#txtFechaNacimiento").val(), $("#txtEmail").val());

    try {
        const Respuesta = await fetch("http://localhost:24550/api/ParqueDiversiones/" + funcion,
        {
            method: metodo,
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        const Resultado = await Respuesta.json();
        $("#dvMensaje").html(Resultado);

    } catch (error) {
        $("#dvMensaje").html(error);
    }
}


async function Consultar() {
    let Documento = $("#txtDocumento").val();

    try {
        const Respuesta = await fetch("http://localhost:24550/api/ParqueDiversiones/ConsultarXDocumento?Documento=" + Documento, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        });

        const Cliente = await Respuesta.json();

        // Asignar los valores en la interfaz
        $("#txtCliente").val(Cliente.Nombre);
        $("#txtFechaPago").val(Cliente.FechaCompra);
        $("#txtNumeroDias").val(Cliente.DiasComprados);
        $("#txtPorcentajeDescuento").val(Cliente.PorcentajeDescuento);
        $("#txtValorDescuento").val(Cliente.ValorDescuento);
        $("#txtValorPagar").val(Cliente.ValorTotal);
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}

class Cliente {
    constructor(Documento, Nombre, FechaCompra, DiasComprados, PorcentajeDescuento, ValorDescuento, ValorTotal) {
        this.Documento = Documento;
        this.Nombre = Nombre;
        this.FechaCompra = FechaCompra;
        this.DiasComprados = DiasComprados;
        this.PorcentajeDescuento = PorcentajeDescuento;
        this.ValorDescuento = ValorDescuento;
        this.ValorTotal = ValorTotal;
    }
}