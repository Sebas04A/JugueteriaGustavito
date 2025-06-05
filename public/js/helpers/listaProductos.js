import { agregarProductoCarrito, crearCarrito, getCarrito, getCarritoUser } from '../api/carrito.js'
import { comprarProducto } from '../components/producto.js'
import { cambiarStockProducto } from '../api/carritoDetalle.js'
async function cargarTemplateExterno(url) {
    const res = await fetch(url)
    const html = await res.text()

    // Crear un elemento contenedor temporal
    const templateWrapper = document.createElement('div')
    templateWrapper.innerHTML = html.trim()

    // Buscar y devolver el nodo <template>
    return templateWrapper.querySelector('template')
}
console.log('Cargando lista de productos...')

export function insertarListaProductos(
    tipo,
    productos,
    haveDetails = true,
    haveFavs = false,
    haveDeleteFavs = false,
    size = null
) {
    console.log('insertando lista de productos')
    // console.log(productos)

    console.log('DOM fully loaded and parsed')
    const contenedor = document.getElementById('lista-productos')
    contenedor.className = 'd-flex justify-content-center flex-wrap gap-4'

    try {
        if (productos.length === 0) {
            contenedor.innerHTML =
                '<div class="text-center text-xl ">No se encontraron productos</div>'
            return
        }
        console.log('productos', productos)
        mostrarProductos(productos, contenedor, tipo, haveDetails, haveFavs, haveDeleteFavs, size)
    } catch (error) {
        console.error('Error al cargar los productos:', error)
        contenedor.innerHTML =
            '<div class="text-center text-xl ">Error al cargar los productos</div>'
    }
}

export async function mostrarProductos(
    productos,
    contenedor,
    tipo,
    haveDetails,
    haveFavs,
    haveDeleteFavs,
    size
) {
    const template = await cargarTemplateExterno('/public/components/templates/producto.html')
    contenedor.innerHTML = '' // Limpiar el contenedor antes de agregar los productosf
    productos.forEach(async producto => {
        // console.log('producto a mostrar', producto)
        const productoRenderizado = await renderizarProducto(
            producto,
            template,
            tipo,
            haveDetails,
            haveFavs,
            haveDeleteFavs,
            size
        )
        // console.log('producto renderizado', productoRenderizado)

        contenedor.appendChild(productoRenderizado)
    })
}

async function renderizarProducto(
    producto,
    template,
    tipo,
    haveDetails,
    haveFavs,
    haveDeleteFavs,
    size
) {
    const clone = template.content.cloneNode(true)
    // console.log('producto', producto)

    clone.querySelector('.containerPropertyImg').addEventListener('click', e => {
        e.preventDefault()
        console.log('click en producto', producto)
        location.href = `/public/pages/producto.html?id=${producto.idProducto}`
    })

    // cambiando min width segun size
    if (size) {
        clone.querySelector('.propertyItem').style.minWidth = size
    }
    clone.querySelector('.propertyTag').textContent = producto.prodCategoria

    if (!haveDetails) {
        clone.querySelector('.listDetails').classList.add('d-none')
    }
    // clone.querySelector('.desc1').textContent = producto.prodDescripcion
    clone.querySelector('.desc2').textContent = producto.prodProveedor

    // clone.querySelector('.propertyLink').href = `/producto/${producto.nombre}`
    clone.querySelector('.propertyLink').href = `/producto/${producto.prodNombre}`
    clone.querySelector('.propertyImage').src = producto.prodImg[0]
    clone.querySelector('.propertyImage').alt = producto.nombre
    clone.querySelector('.propertyImage').title = producto.nombre

    // clone.querySelector("propertyTag")

    clone.querySelector('.nombre').textContent = producto.prodNombre

    clone.querySelector('.propertyPrice').textContent = `$${producto.prodPrecio.toFixed(2)}`

    const cantidad = clone.querySelector('.cantidad')
    // AGREGAR EL ID
    if (tipo == 'carrito' || tipo == 'factura') {
        console.log('CARRITO O FACTURA')
        const total = document.querySelector('#total')
        // ESCONDE CARRITO
        clone.querySelector('.buy-button').style.display = 'none'
        cantidad.textContent = producto.cantidad
        console.log('CANTIDAD')
        console.log(producto.cantidad)
        if (total) {
            const totalActual = parseFloat(total.textContent)

            const totalDespues = (totalActual + producto.cantidad * producto.prodPrecio).toFixed(2)
            total.textContent = totalDespues
        }

        const usuario = localStorage.getItem('usuario')
        if (!usuario) {
            alert('Debes iniciar sesión para ver el carrito')
            return
        }
        let carrito = await getCarritoUser(usuario)
        if (!carrito) {
            const carritoID = await crearCarrito(usuario)
            carrito = await getCarrito(carritoID)
            console.log('Carrito creado:', carrito)
        }
        clone.querySelector('.quitar-cantidad').onclick = async e => {
            if (producto.cantidad <= 0) {
                console.log('no se puede quitar')
                alert('No se puede quitar más productos')
                return
            }
            if (producto.cantidad === 1) {
                const confirmacion = confirm(
                    '¿Estás seguro de que quieres eliminar este producto del carrito?'
                )
                if (!confirmacion) {
                    return
                }
            }
            e.preventDefault()

            const res = await cambiarStockProducto(
                carrito.CarritoID,
                producto.idProducto,
                producto.cantidad - 1
            )
            if (!res) {
                alert('Error al quitar el producto del carrito')
                return
            }
            producto.cantidad -= 1
            cantidad.textContent = producto.cantidad
            total.textContent = (parseFloat(total.textContent) - producto.prodPrecio).toFixed(2)
        }
        clone.querySelector('.agregar-cantidad').onclick = async e => {
            if (producto.cantidad >= producto.prodStock) {
                console.log('no se puede agregar')
                alert('No se puede agregar más productos')
                return
            }
            e.preventDefault()
            const res = await cambiarStockProducto(
                carrito.CarritoID,
                producto.idProducto,
                producto.cantidad + 1
            )
            if (!res) {
                alert('Error al agregar el producto al carrito')
                return
            }

            producto.cantidad += 1
            cantidad.textContent = producto.cantidad
            total.textContent = (parseFloat(total.textContent) + producto.prodPrecio).toFixed(2)
        }
    } else {
        clone.querySelector('.buy-button').setAttribute('data-id', producto.idProducto)
        clone.querySelector('.buy-button').onclick = async e => {
            e.preventDefault()
            if (producto.prodStock <= 0) {
                console.log('no hay stock')
                alert('No hay stock disponible')
                return
            }
            console.log('comprando')
            const usuario = localStorage.getItem('usuario')
            if (!usuario) {
                alert('Debes iniciar sesión para comprar')
                return
            }
            const res = await agregarProductoCarrito(usuario, producto.idProducto, 1)
            console.log('res', res)
            if (!res) {
                alert('Error al agregar el producto al carrito')
                return
            }
            alert('Producto agregado al carrito')
        }
        const cantidadElement = clone.querySelector('.cantidad-container')
        cantidadElement.classList.add('d-none')
    }
    if (haveFavs || haveDeleteFavs) {
        console.log(clone.querySelector('.containerPropertyImg'))
        clone.querySelector('.containerPropertyImg').innerHTML +=
            '<button className="saveButton"}> <span>' + haveFavs
                ? 'Eliminar de Favoritos'
                : 'Agregar a Favoritos' + '</span> </button>'
    }
    return clone
}
