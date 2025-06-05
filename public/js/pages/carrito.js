import {
    comprarCarrito,
    eliminarCarrito,
    getCarritoUser,
    getProductosCarritoId,
    getProductosCarritoUser,
} from '../api/carrito.js'
import { insertarListaProductos } from '../helpers/listaProductos.js'
console.log('Cargando carrito...')
const usuario = localStorage.getItem('usuario')
if (!usuario) {
    alert('Debes iniciar sesión para ver tu carrito')
    throw new Error('Usuario no encontrado')
}

console.log('usuario', usuario)
const carrito = await getCarritoUser(usuario)
if (!carrito) {
    alert('No tienes un carrito creado')
    throw new Error('No tienes un carrito creado')
}
console.log('carrito encontrado', carrito)
console.log('---------------Obteniendo productos del carrito...')
const productos = await getProductosCarritoId(carrito.CarritoID)
console.log('productos del carrito', productos)
console.log(productos)
console.log('---------------Insertando productos en la lista...')
insertarListaProductos('carrito', productos, false)
document.getElementById('btn-comprar').onclick = async e => {
    // #redirigir a comprar
    window.location.href = '/public/pages/comprar.html'

    console.log(carrito)
    e.preventDefault()
    const usuario = localStorage.getItem('usuario')
    if (!usuario) {
        alert('Debes iniciar sesión para realizar la compra')
        return
    }
    // Aquí puedes agregar la lógica para procesar la compra
    const res = await comprarCarrito(usuario, carrito.CarritoID)
    console.log('Resultado de la compra:', res)
    if (!res) {
        alert('Error al realizar la compra')
        return
    }
    const resEliminar = await eliminarCarrito(carrito.CarritoID)
    console.log('Resultado de la eliminación del carrito:', resEliminar)
    if (!resEliminar) {
        alert('Error al eliminar el carrito después de la compra')
        return
    }

    alert('Compra realizada con éxito')
}
