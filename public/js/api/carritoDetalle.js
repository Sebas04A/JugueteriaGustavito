import { URL_API } from '../configs.js'
export const getCarritoDetalles = async () => {
    const response = await fetch(`${URL_API}/api/carritoDetalle`)
    if (!response.ok) {
        throw new Error('Error al obtener los detalles del carrito')
    }
    const data = await response.json()
    return data
    // return [
    //     {
    //         CarritoDetalleID: 1,
    //         CarritoID: 1,
    //         ProductoID: 1,
    //         Cantidad: 3,
    //         PrecioUnitario: 30.0,
    //         Subtotal: 90.0,
    //         Carritos: null,
    //         Productos: null,
    //     },
    //     {
    //         CarritoDetalleID: 2,
    //         CarritoID: 2,
    //         ProductoID: 1,
    //         Cantidad: 2,
    //         PrecioUnitario: 30.0,
    //         Subtotal: 60.0,
    //         Carritos: null,
    //         Productos: null,
    //     },
    // ]
}
export const eliminarProductoCarrito = async carritoDetalle => {
    const response = await fetch(
        `${URL_API}/api/CarritoDetalle/${carritoDetalle.CarritoDetalleID}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito')
    }
    return carritoDetalle
}
export const getCarritoDetallesCarrito = async CarritoID => {
    const carritoDetalles = await getCarritoDetalles()
    console.log('Detalles del carrito:', carritoDetalles)
    console.log('CarritoID:', CarritoID)
    return carritoDetalles.filter(detalle => detalle.CarritoID === CarritoID)
}
export const getCarritoDetalleProducto = async (CarritoID, ProductoID) => {
    const carritoDetalles = await getCarritoDetalles()
    const carritoDetalle = carritoDetalles.find(
        detalle => detalle.CarritoID === CarritoID && detalle.ProductoID === ProductoID
    )
    if (!carritoDetalle) {
        throw new Error('No se encontró el detalle del carrito para el producto especificado')
    }
    return carritoDetalle
}

const actualizarCarritoDetalle = async carritoDetalle => {
    console.log('Actualizando carrito detalle:', carritoDetalle)
    const response = await fetch(
        `${URL_API}/api/carritoDetalle/${carritoDetalle.CarritoDetalleID}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carritoDetalle),
        }
    )
    if (!response.ok) {
        throw new Error('Error al actualizar el detalle del carrito')
    }
    const data = await response.json()
    return data
}
export const cambiarStockProducto = async (CarritoId, ProductoID, Cantidad) => {
    console.log('cambiarStockProducto', CarritoId, ProductoID, Cantidad)

    const productoCarrito = await getCarritoDetalleProducto(CarritoId, ProductoID)

    if (Cantidad < 0) {
        throw new Error('La cantidad debe ser mayor a cero')
    }
    if (Cantidad == 0) {
        return eliminarProductoCarrito(productoCarrito)
    }

    if (Cantidad == 0) {
        return eliminarProductoCarrito(productoCarrito)
    }

    productoCarrito.Cantidad = Cantidad
    return actualizarCarritoDetalle(productoCarrito)
}
