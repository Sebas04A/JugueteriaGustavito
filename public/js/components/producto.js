import { agregarProductoCarrito } from '../api/carrito.js'

export function comprarProducto(idProducto, cantidad) {
    // return
    const usuario = localStorage.getItem('usuario')
    if (!usuario) {
        alert('Debes iniciar sesión para comprar un producto')
        return
    }
    console.log(
        `Agregando producto carrito ${idProducto} con cantidad ${cantidad} del usuario ${usuario}`
    )
    // AGREGAR A LA BASE DE DATOS
    // return
    agregarProductoCarrito(usuario, idProducto, cantidad)
}
