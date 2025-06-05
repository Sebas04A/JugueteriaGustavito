import { URL_API } from '../configs.js'
import { getCarritoDetallesCarrito } from './carritoDetalle.js'
import { realizarCompra } from './compra.js'
import { getProducto } from './productos.js'
export const getCarritos = async () => {
    const response = await fetch(`${URL_API}/api/carrito`)
    if (!response.ok) {
        throw new Error('Error al obtener los carritos')
    }
    const data = await response.json()
    return data
}
export const getCarrito = async id => {
    const response = await fetch(`${URL_API}/api/carrito/${id}`)
    if (!response.ok) {
        throw new Error('Error al obtener el carrito')
    }
    const data = await response.json()
    return data
}

export const getCarritoUser = async id => {
    const carritos = await getCarritos()
    // console.log('ID Usuario:', id)
    // console.log('Carritos:', carritos)
    const carrito = carritos.find(c => {
        return c.id_usuario == id
    })
    console.log('Carrito encontrado:', carrito)
    return carrito || null
    data = {
        CarritoID: 1,
        id_usuario: null,
        FechaCreacion: '2025-04-29T17:25:31.773',
        CarritoDetalle: [
            {
                productoId: 1,
                cantidad: 1,
            },
            {
                productoId: 2,
                cantidad: 2,
            },
            {
                productoId: 3,
                cantidad: 1,
            },
        ],
        Usuarios: null,
    }
    return data
}
export const getProductosCarritoUser = async id => {
    const carrito = await getCarritoUser(id)
    if (!carrito) {
        throw new Error('No se encontró el carrito')
    }
    console.log('Carrito Detalle:', carrito)
    const carritoDetalle = await getCarritoDetallesCarrito(carrito.CarritoID)
    if (!carritoDetalle || carritoDetalle.length === 0) {
        throw new Error('El carrito está vacío o no se encontraron detalles del carrito')
    }
    let productos = []
    for (const detalle of carritoDetalle) {
        const producto = await getProducto(detalle.ProductoID)
        if (producto) {
            productos.push({ ...producto, cantidad: detalle.Cantidad })
        }
    }
    return productos
}
export const getProductosCarritoId = async idCarrito => {
    const carritoDetalle = await getCarritoDetallesCarrito(idCarrito)
    if (!carritoDetalle || carritoDetalle.length === 0) {
        throw new Error('El carrito está vacío o no se encontraron detalles del carrito')
    }
    let productos = []
    for (const detalle of carritoDetalle) {
        const producto = await getProducto(detalle.ProductoID)
        if (producto) {
            productos.push({ ...producto, cantidad: detalle.Cantidad })
        }
    }
    return productos
}
export const crearCarrito = async id => {
    const response = await fetch(`${URL_API}/api/carrito`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario: id }),
    })
    if (!response.ok) {
        throw new Error('Error al crear el carrito')
    }
    const idCarrito = await response.json()
    return idCarrito
}
export const eliminarCarrito = async id => {
    const response = await fetch(`${URL_API}/api/carrito/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error al eliminar el carrito')
    }
    return id
}

export const agregarDetalleCarrito = async (CarritoID, ProductoID, Cantidad) => {
    const body = {
        CarritoID,
        ProductoID,
        Cantidad,
    }
    console.log(body)
    const response = await fetch(`${URL_API}/api/carritoDetalle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    console.log(response)
    if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito')
    }
    const data = await response.json()
    return data
}
export const agregarProductoCarrito = async (idUsuario, idProducto, cantidad) => {
    // console.log('Usuario:', usuario)

    const carrito = await getCarritoUser(idUsuario)
    console.log('Carrito:', carrito)

    let idCarrito = carrito.CarritoID
    console.log('ID Carrito:', idCarrito)

    if (!carrito) {
        try {
            console.log('Carrito no encontrado, creando uno nuevo...')
            idCarrito = await crearCarrito(idUsuario)
            console.log(idCarrito)
            carrito = await getCarritoUser(idUsuario)
            idCarrito = carrito.CarritoID
            console.log('Nuevo ID Carrito:', idCarrito)
        } catch (error) {
            console.error('Error al crear el carrito:', error)
            return
        }
    }
    return await agregarDetalleCarrito(idCarrito, idProducto, cantidad)
}

export const comprarCarrito = async (idUsuario, idCarrito) => {
    return realizarCompra(idUsuario, idCarrito)
}
