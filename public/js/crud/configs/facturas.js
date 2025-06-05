export const configFacturas = {
    nombre: 'Facturas',
    endpoint: 'http://jugueteriagusta.runasp.net/api/facturas',
    campos: [
        {
            name: 'FacturaID',
            label: 'ID',
            type: 'number',
            required: true,
            readonly: true,
            showForm: true,
        },
        {
            name: 'Fecha',
            label: 'Fecha',
            type: 'datetime-local',
            required: true,
            readonly: false,
            showForm: true,
            transform: value => {
                const fecha = new Date(value)

                const dia = String(fecha.getDate()).padStart(2, '0')
                const mes = String(fecha.getMonth() + 1).padStart(2, '0')
                const anio = fecha.getFullYear()

                return `${dia}/${mes}/${anio}`
            },
        },
        {
            name: 'Total',
            label: 'Total',
            type: 'number',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'id_usuario',
            label: 'ID Usuario',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'FacturaDetalle',
            label: 'Detalles de la Factura',
            type: 'productos',
            required: false,
            readonly: false,
            showForm: true,
            transform: value => {
                console.log(value)
                return value.map(
                    detalle => `[Prod:${detalle.ProductoID},Cant: ${detalle.Cantidad}]`
                )
            },
            detelle: [
                {
                    name: 'FacturaDetalleID',
                    label: 'ID',
                    type: 'number',
                    required: true,
                    readonly: true,
                    showForm: true,
                },
                {
                    name: 'ProductoID',
                    label: 'ID Producto',
                    type: 'number',
                    required: true,
                    readonly: false,
                    showForm: true,
                },
                {
                    name: 'Cantidad',
                    label: 'Cantidad',
                    type: 'number',
                    required: true,
                    readonly: false,
                    showForm: true,
                },
                {
                    name: 'PrecioUnitario',
                    label: 'Precio Unitario',
                    type: 'number',
                    required: true,
                    readonly: false,
                    showForm: true,
                },
                {
                    name: 'Subtotal',
                    label: 'Subtotal',
                    type: 'number',
                    required: true,
                    readonly: false,
                    showForm: true,
                },
            ],
        },
    ],
    id: 'FacturaID',
}

// FacturaID: 1,
// Fecha: '2025-04-29T20:00:39.957',
// Total: 90.0,
// id_usuario: 'user',
// FacturaDetalle: [
//     {
//         FacturaDetalleID: 1,
//         FacturaID: 1,
//         ProductoID: 1,
//         Cantidad: 3,
//         PrecioUnitario: 30.0,
//         Subtotal: 90.0,
//     },
// ],
