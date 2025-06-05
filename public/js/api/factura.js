import { URL_API } from '../configs.js'
import { getCarritoDetalles, getCarritoDetallesCarrito } from './carritoDetalle.js'
export async function getFacturas() {
    const response = await fetch(`${URL_API}/facturas`)
    if (!response.ok) {
        throw new Error('Error al obtener las facturas')
    }
    const data = await response.json()
    return data
    return [
        {
            FacturaID: 1,
            Fecha: '2025-04-29T20:00:39.957',
            Total: 90.0,
            id_usuario: 'user',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 1,
                    FacturaID: 1,
                    ProductoID: 1,
                    Cantidad: 3,
                    PrecioUnitario: 30.0,
                    Subtotal: 90.0,
                },
            ],
        },
        {
            FacturaID: 2,
            Fecha: '2025-04-30T10:56:28.6',
            Total: 60.0,
            id_usuario: 'user',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 2,
                    FacturaID: 2,
                    ProductoID: 1,
                    Cantidad: 2,
                    PrecioUnitario: 30.0,
                    Subtotal: 60.0,
                },
            ],
        },
        {
            FacturaID: 3,
            Fecha: '2025-04-30T18:30:02.54',
            Total: 60.0,
            id_usuario: 'user2',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 3,
                    FacturaID: 3,
                    ProductoID: 1,
                    Cantidad: 2,
                    PrecioUnitario: 30.0,
                    Subtotal: 60.0,
                },
            ],
        },
        {
            FacturaID: 4,
            Fecha: '2025-04-30T18:30:07.27',
            Total: 60.0,
            id_usuario: 'user2',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 4,
                    FacturaID: 4,
                    ProductoID: 1,
                    Cantidad: 2,
                    PrecioUnitario: 30.0,
                    Subtotal: 60.0,
                },
            ],
        },
        {
            FacturaID: 5,
            Fecha: '2025-04-30T18:58:25.807',
            Total: 97.0,
            id_usuario: 'user',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 5,
                    FacturaID: 5,
                    ProductoID: 1,
                    Cantidad: 3,
                    PrecioUnitario: 30.0,
                    Subtotal: 90.0,
                },
                {
                    FacturaDetalleID: 6,
                    FacturaID: 5,
                    ProductoID: 3,
                    Cantidad: 1,
                    PrecioUnitario: 7.0,
                    Subtotal: 7.0,
                },
            ],
        },
        {
            FacturaID: 6,
            Fecha: '2025-05-01T14:15:20.367',
            Total: 60.0,
            id_usuario: 'user',
            FacturaDetalle: [
                {
                    FacturaDetalleID: 7,
                    FacturaID: 6,
                    ProductoID: 1,
                    Cantidad: 2,
                    PrecioUnitario: 30.0,
                    Subtotal: 60.0,
                },
            ],
        },
        {
            FacturaID: 7,
            Fecha: '2023-05-09T09:32:17',
            Total: 4744.43,
            id_usuario: 'user2',
            FacturaDetalle: [],
        },
    ]
}
export async function putFactura(id, factura) {
    const response = await fetch(`${URL_API}/facturas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
    })
    if (!response.ok) {
        throw new Error('Error al actualizar la factura')
    }
    const data = await response.json()
    return data
}
export async function postFactura(factura) {
    const response = await fetch(`${URL_API}/facturas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
    })
    if (!response.ok) {
        throw new Error('Error al crear la factura')
    }
    const data = await response.json()
    return data
}
export async function getFacturaById(id) {
    const response = await fetch(`${URL_API}/facturas/${id}`)
    if (!response.ok) {
        throw new Error('Error al obtener la factura')
    }
    const data = await response.json()
    return data
}

export const createFactura = async (id_usuario, CarritoID) => {
    const CarritoDetalle = await getCarritoDetallesCarrito(CarritoID)

    const response = await fetch(`${URL_API}/facturas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario }),
    })
    if (!response.ok) {
        throw new Error('Error al crear la factura')
    }

    const data = await response.json()
    return data
}
