import { agregarProductoCarrito } from '../api/carrito.js'
import { getProducto } from '../api/productos.js'

const id = new URLSearchParams(window.location.search).get('id')
if (!id) {
    console.error('No se proporcionó un ID de producto en la URL')
    throw new Error('ID de producto no encontrado')
}
console.log('ID del producto:', id)
const producto = await getProducto(id)
console.log('Producto obtenido:', producto)

document.getElementById('prodNombre').textContent = producto.prodNombre
document.getElementById('prodCategoria').textContent = producto.prodCategoria
document.getElementById('prodDescripcion').textContent = producto.prodDescripcion
document.getElementById('prodPrecio').textContent = `$${producto.prodPrecio.toFixed(2)}`
document.getElementById('prodStock').textContent = producto.prodStock
document.getElementById('prodProveedor').textContent = producto.prodProveedor
document.getElementById('prodImg').src = producto.prodImg
document.getElementById('agregar-carrito').onclick = e => {
    e.preventDefault()
    if (producto.prodStock <= 0) {
        alert('No hay stock disponible para este producto')
        return
    }
    console.log('Agregando producto al carrito:', producto.idProducto)
    const usuario = localStorage.getItem('usuario')
    agregarProductoCarrito(usuario, producto.idProducto, 1)

    alert('Producto agregado al carrito')
}
