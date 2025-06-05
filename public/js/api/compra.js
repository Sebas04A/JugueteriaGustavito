import { URL_API } from '../configs.js'
import { getCarritoDetallesCarrito } from './carritoDetalle.js'
import { getUsuario } from './usuarios.js'

export const realizarCompra = async (idUsuario, carrito) => {
    const usuario = await getUsuario(idUsuario)

    console.log('Usuario:', usuario)
    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }
    console.log('Carrito:', carrito)
    const carritoDetalle = await getCarritoDetallesCarrito(carrito.CarritoID)
    console.log('Carrito Detalle:', carritoDetalle)
    const productosBody = carritoDetalle.map(producto => ({
        idProducto: producto.idProducto,
        cantidad: producto.cantidad,
    }))

    console.log('Carrito:', productosBody)
    const bodyCompra = {
        carrito: {
            productos: productosBody,
        },
        direccion: 'Calle Falsa 123, Ciudad',
        metodoPago: 'Tarjeta de Crédito',
        cliente: {
            cliCedula: usuario.id_usuario,
            cliNombre: usuario.nombre,
            cliApellido: usuario.apellido,
            cliTelefono: usuario.telefono,
        },
    }
    const response = await fetch(`${URL_API}/api/integracion/compra`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyCompra),
    })
    if (!response.ok) {
        throw new Error('Error al realizar la compra')
    }
    const data = await response.json()
    return {
        mensaje: 'Compra realizada con éxito',
        compra: data,
    }
}
export const integracionCompra = async data => {
    const response = await fetch(`${URL_API}/api/integracion/compra`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Error al realizar la compra')
    }
    console.log('Respuesta de la integración:', response)
    return await response.json()
}
export const confirmacionCompra = async id => {
    const response = await fetch(`${URL_API}/api/integracion/confirmarCompra`, {
        method: 'POST',
        body: JSON.stringify({ idFactura: id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error al confirmar la compra')
    }
    console.log('Respuesta de la confirmación:', response)
    const data = await response.json()
    return data
}
export const comprar = async data => {
    const id = await integracionCompra(data)
    console.log('ID de la compra:', id)
    const res = await confirmacionCompra(id)

    console.log('Compra realizada:', res)
    return id
}
