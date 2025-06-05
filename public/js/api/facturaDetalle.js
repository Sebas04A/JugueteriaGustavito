import { URL_API } from '../configs.js'
export const getFacturasDetalle = async () => {
    const response = await fetch(`${URL_API}/api/integracion/facturaDetalle`)
    if (!response.ok) {
        throw new Error('Error al obtener la factura')
    }
    const data = await response.json()
    return data
    return [
        {
            FacturaDetalleID: 1,
            FacturaID: 1,
            ProductoID: 1,
            Cantidad: 3,
            PrecioUnitario: 30.0,
            Subtotal: 90.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 2,
            FacturaID: 2,
            ProductoID: 1,
            Cantidad: 2,
            PrecioUnitario: 30.0,
            Subtotal: 60.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 3,
            FacturaID: 3,
            ProductoID: 1,
            Cantidad: 2,
            PrecioUnitario: 30.0,
            Subtotal: 60.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 4,
            FacturaID: 4,
            ProductoID: 1,
            Cantidad: 2,
            PrecioUnitario: 30.0,
            Subtotal: 60.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 5,
            FacturaID: 5,
            ProductoID: 1,
            Cantidad: 3,
            PrecioUnitario: 30.0,
            Subtotal: 90.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 6,
            FacturaID: 5,
            ProductoID: 3,
            Cantidad: 1,
            PrecioUnitario: 7.0,
            Subtotal: 7.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 7,
            FacturaID: 6,
            ProductoID: 1,
            Cantidad: 2,
            PrecioUnitario: 30.0,
            Subtotal: 60.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 8,
            FacturaID: 2887,
            ProductoID: 1,
            Cantidad: 0,
            PrecioUnitario: 30.0,
            Subtotal: 0.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 9,
            FacturaID: 2887,
            ProductoID: 3,
            Cantidad: 2,
            PrecioUnitario: 7.0,
            Subtotal: 14.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 10,
            FacturaID: 5360,
            ProductoID: 2,
            Cantidad: 1,
            PrecioUnitario: 5.0,
            Subtotal: 5.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 11,
            FacturaID: 5361,
            ProductoID: 3,
            Cantidad: 1,
            PrecioUnitario: 7.0,
            Subtotal: 7.0,
            Facturas: null,
            Productos: null,
        },
        {
            FacturaDetalleID: 12,
            FacturaID: 5362,
            ProductoID: 3,
            Cantidad: 1,
            PrecioUnitario: 7.0,
            Subtotal: 7.0,
            Facturas: null,
            Productos: null,
        },
    ]
}

export const createFacturaDetalle = async facturaDetalle => {
    const response = await fetch(`${URL_API}/api/FacturaDetalle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaDetalle),
    })
    if (!response.ok) {
        throw new Error('Error al crear el detalle de la factura')
    }
    return facturaDetalle
}
