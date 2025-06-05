import { getCarritoUser, getProductosCarrito } from '../api/carrito.js'
import { insertarListaProductos } from '../helpers/listaProductos.js'

const carrito = await getCarritoUser(localStorage.getItem('usuario'))
if (!carrito) {
    alert('No tienes un carrito creado')
    throw new Error('No tienes un carrito creado')
}
console.log(carrito)
if (carrito.CarritoDetalle.length === 0) {
    alert('No tienes productos en el carrito')
    throw new Error('No tienes productos en el carrito')
}

console.log(carrito)
const productos = await getProductosCarrito(carrito.CarritoID)
console.log(productos)
insertarListaProductos('carrito', productos, false, false, false, '7rem')
