import { comprarCarrito, getCarritoUser, getProductosCarritoId } from '../api/carrito.js'
import { comprar } from '../api/compra.js'
import { getUsuario } from '../api/usuarios.js'

// document.addEventListener('DOMContentLoaded', async () => {

const insertarCarrito = productos => {
    const ulProductos = document.getElementById('productosCarrito')
    ulProductos.innerHTML = '' // Limpiar contenido previo, si lo hubiera

    productos.forEach((prod, index) => {
        // Crear <li> para mostrar nombre (o descripción) e idProducto + cantidad
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        // Ajustado para mostrar precio unitario en lugar de ID del producto
        li.innerHTML = `
  <div>
    <strong>${prod.prodNombre || 'Producto sin nombre'}</strong><br>
    <small>Valor unitario: $${prod.prodPrecio?.toFixed(2) || '0.00'}</small>
  </div>
  <span class="badge bg-primary rounded-pill">Cantidad: ${prod.cantidad}</span>
`
        ulProductos.appendChild(li)

        // También generamos los inputs ocultos necesarios para enviar el JSON al servidor:
        //   carrito[productos][0][idProducto]=...
        //   carrito[productos][0][cantidad]=...
        const inputId = document.createElement('input')
        inputId.type = 'hidden'
        inputId.name = `carrito[productos][${index}][idProducto]`
        inputId.value = prod.idProducto
        ulProductos.appendChild(inputId)

        const inputCant = document.createElement('input')
        inputCant.type = 'hidden'
        inputCant.name = `carrito[productos][${index}][cantidad]`
        inputCant.value = prod.cantidad
        ulProductos.appendChild(inputCant)
    })
    // Calcular el total
    let totalCompra = productos.reduce((total, prod) => {
        const precio = prod.prodPrecio || 0
        return total + precio * prod.cantidad
    }, 0)

    // Crear <li> para mostrar el total
    const liTotal = document.createElement('li')
    liTotal.className =
        'list-group-item d-flex justify-content-between align-items-center bg-light fw-bold'
    liTotal.innerHTML = `
  <div>Total de la compra</div>
  <span class="text-success">$${totalCompra.toFixed(2)}</span>
`
    ulProductos.appendChild(liTotal)
}
function rellenarDatosUsuario(usuario) {
    console.log('Rellenando datos del usuario:', usuario)
    // Asignar valores a los inputs del formulario
    if (usuario.id_usuario) document.getElementById('cliCedula').value = usuario.id_usuario
    if (usuario.nombre) document.getElementById('cliNombre').value = usuario.nombre
    if (usuario.apellido) document.getElementById('cliApellido').value = usuario.apellido
    if (usuario.telefono) document.getElementById('cliTelefono').value = usuario.telefono
}
function validarDatosFormulario() {
    const cedula = document.getElementById('cliCedula')?.value.trim()
    const nombre = document.getElementById('cliNombre')?.value.trim()
    const apellido = document.getElementById('cliApellido')?.value.trim()
    const telefono = document.getElementById('cliTelefono')?.value.trim()
    const direccion = document.getElementById('direccion')?.value.trim()
    const metodoPago = document.getElementById('metodoPago')?.value

    const errores = []

    // Validar campos de cliente
    if (!cedula || !/^\d{9,13}$/.test(cedula)) {
        errores.push('Cédula inválida. Debe tener entre 9 y 13 dígitos.')
    }
    if (!nombre || nombre.length < 2) {
        errores.push('Nombre es obligatorio y debe tener al menos 2 caracteres.')
    }
    if (!apellido || apellido.length < 2) {
        errores.push('Apellido es obligatorio y debe tener al menos 2 caracteres.')
    }
    if (!telefono || !/^\d{9,10}$/.test(telefono)) {
        errores.push('Teléfono inválido. Debe tener 9 o 10 dígitos.')
    }

    // Validar dirección
    if (!direccion || direccion.length < 5) {
        errores.push('Dirección es obligatoria y debe tener al menos 5 caracteres.')
    }

    // Validar método de pago
    if (!metodoPago) {
        errores.push('Debes seleccionar un método de pago.')
    }

    // Validar productos en el carrito
    const inputs = document.querySelectorAll('input[type="hidden"]')
    const tieneProductos = Array.from(inputs).some(input =>
        input.name.includes('carrito[productos]')
    )
    if (!tieneProductos) {
        errores.push('Tu carrito está vacío.')
    }

    // Mostrar errores si hay
    if (errores.length > 0) {
        alert('Corrige los siguientes errores:\n\n' + errores.join('\n'))
        return false
    }

    return true
}

function obtenerDatosFormulario() {
    // Obtener datos del cliente
    if (!validarDatosFormulario()) {
        console.error('Datos del formulario no válidos')
        // alert('Por favor, corrige los errores en el formulario antes de continuar.')
        return null
    }

    const cliente = {
        cliCedula: document.getElementById('cliCedula')?.value || '',
        cliNombre: document.getElementById('cliNombre')?.value || '',
        cliApellido: document.getElementById('cliApellido')?.value || '',
        cliTelefono: document.getElementById('cliTelefono')?.value || '',
    }

    // Obtener dirección
    const direccion = document.getElementById('direccion')?.value || ''

    // Obtener método de pago
    const metodoPago = document.getElementById('metodoPago')?.value || ''

    // Resultado final
    const resultado = {
        cliente,
        direccion,
        metodoPago,
    }

    return resultado
}

let usuario
let carrito
let productos
try {
    console.log('Cargando carrito...')
    usuario = localStorage.getItem('usuario')
    if (!usuario) {
        alert('Debes iniciar sesión para ver tu carrito')
        throw new Error('Usuario no encontrado')
    }

    console.log('Usuario:', usuario)
    carrito = await getCarritoUser(usuario)
    if (!carrito) {
        alert('No tienes un carrito creado')
        throw new Error('No tienes un carrito creado')
    }

    console.log('Carrito encontrado:', carrito)
    console.log('Obteniendo productos del carrito...')
    productos = await getProductosCarritoId(carrito.CarritoID)
    console.log('Productos del carrito:', productos)

    // 1) Llenar la lista de productos dentro del <ul id="productosCarrito">
    insertarCarrito(productos)
    // 2) Llenar los campos del formulario con la info de cliente, dirección y método de pago
    const usuarioData = await getUsuario(usuario)
    if (!usuarioData) {
        alert('No se pudo obtener la información del usuario')
        throw new Error('Usuario no encontrado en la base de datos')
    }
    console.log('Datos del usuario:', usuarioData)
    rellenarDatosUsuario(usuarioData)

    // Asegúrate de que en el HTML existan inputs con estos ids:
    //   #cliCedula, #cliNombre, #cliApellido, #cliTelefono, #direccion, #metodoPago

    // Datos de cliente
    const cliente = carrito.cliente || {}
    if (cliente.cliCedula) document.getElementById('cliCedula').value = cliente.cliCedula
    if (cliente.cliNombre) document.getElementById('cliNombre').value = cliente.cliNombre
    if (cliente.cliApellido) document.getElementById('cliApellido').value = cliente.cliApellido
    if (cliente.cliTelefono) document.getElementById('cliTelefono').value = cliente.cliTelefono

    // Dirección de envío
    if (carrito.direccion) {
        document.getElementById('direccion').value = carrito.direccion
    }

    // Método de pago (debe coincidir exactamente con una de las opciones del <select>)
    if (carrito.metodoPago) {
        document.getElementById('metodoPago').value = carrito.metodoPago
    }
} catch (error) {
    console.error(error)
}
document.getElementById('btn-confirmar-compra').onclick = async e => {
    e.preventDefault()
    console.log('Confirmando compra...')
    console.log(usuario)
    console.log(carrito)
    const dataProductos = productos.map(prod => ({
        idProducto: prod.idProducto,
        cantidad: prod.cantidad,
    }))
    let dataFormulario = obtenerDatosFormulario()
    if (dataFormulario) {
        dataFormulario.carrito = { productos: dataProductos }
        console.log('Datos del formulario:', dataFormulario)
        try {
            const res = await comprar(dataFormulario)
            console.log('Respuesta de la compra:', res)
            // comprar numero
            if (typeof res === 'number') {
                if (res < -1) {
                    console.error('Error en la api:', res)
                } else if (res === -1) {
                    alert('Error en la compra')
                } else {
                    alert(`Compra realizada con éxito. Número de compra: ${res}`)
                    window.location.href = `/public/pages/compraRealizada.html?idFactura=${res}`
                }
            } else {
                console.log('La respuesta no es un número:', res)
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error)
            alert('Ocurrió un error al procesar tu compra. Por favor, inténtalo más tarde.')
        }
    }
}
