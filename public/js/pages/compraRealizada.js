import { getFacturaById } from '../api/factura.js'
import { getProducto } from '../api/productos.js'
import { getUsuario } from '../api/usuarios.js'

// 1) Extraer el ID de factura de la URL (se asume ?facturaId=123)
const params = new URLSearchParams(window.location.search)
const facturaId = params.get('idFactura')
if (!facturaId) {
    alert('ID de factura no especificado en la URL')
    throw new Error('ID de factura no especificado')
    // return
}

try {
    // 2) Llamar a la función de API que devuelve los datos de la factura
    //    Se asume que existe una función asíncrona getFacturaById(id) que retorna un objeto:
    //    {
    //      carrito: { productos: [ { idProducto, cantidad, nombre, precioUnitario }, … ] },
    //      direccion: "…",
    //      metodoPago: "…",
    //      cliente: { cliCedula, cliNombre, cliApellido, cliTelefono }
    //    }
    const factura = await getFacturaById(facturaId)
    factura.cliente = await getUsuario(factura.id_usuario)
    console.log('Factura obtenida:', factura)
    console.log('Cliente:', factura.cliente)
    console.log('ID', factura.cliente.nombre)

    // 3) Insertar datos del cliente
    //    Asegúrate de que en tu HTML cada campo tenga estos IDs:
    //      <span id="clienteCedula"></span>
    //      <span id="clienteNombre"></span>
    //      <span id="clienteApellido"></span>
    //      <span id="clienteTelefono"></span>
    console.log('Cedula:', factura.cliente.id_usuario)
    document.getElementById('clienteCedula').innerText = factura.cliente.id_usuario
    console.log('Nombre:', factura.cliente.nombre)
    document.getElementById('clienteNombre').innerText = factura.cliente.nombre
    console.log('Apellido:', factura.cliente.apellido)
    document.getElementById('clienteApellido').innerText = factura.cliente.apellido
    console.log('Telefono:', factura.cliente.telefono)
    document.getElementById('clienteTelefono').innerText = factura.cliente.telefono

    // 4) Insertar dirección y método de pago
    //    HTML:
    //      <p id="direccionEnvio"></p>
    //      <p id="metodoPagoConfirm"></p>
    // document.getElementById('direccionEnvio').innerText = factura.direccion
    // document.getElementById('metodoPagoConfirm').innerText = factura.metodoPago

    // 5) Mostrar cada producto en el <ul id="productosComprados">
    //    Asegúrate de que en tu HTML exista:
    //      <ul id="productosComprados" class="list-group"></ul>
    const ulProductos = document.getElementById('productosComprados')
    ulProductos.innerHTML = '' // Limpiar contenido previo

    factura.FacturaDetalle.forEach(async prod => {
        const producto = await getProducto(prod.ProductoID)
        console.log('Producto:', producto)
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        li.innerHTML = `
        <div>
          <strong>${producto.prodNombre || 'Producto #' + producto.idProducto}</strong><br>
          <small>ID: ${producto.idProducto} &mdash; Cantidad: ${prod.Cantidad}</small>
        </div>
        <span class="badge bg-success rounded-pill">✔️</span>
      `
        ulProductos.appendChild(li)
    })

    // 6) (Opcional) Mostrar total de unidades compradas al final
    const totalUnidades = factura.FacturaDetalle.reduce((sum, p) => sum + p.Cantidad, 0)
    const liTotal = document.createElement('li')
    liTotal.className =
        'list-group-item d-flex justify-content-between align-items-center bg-light fw-bold'
    liTotal.innerHTML = `
      <div>Total de Productos</div>
      <span class="text-success">${totalUnidades} unidad${totalUnidades === 1 ? '' : 'es'}</span>
    `
    ulProductos.appendChild(liTotal)
} catch (err) {
    console.error(err)
    alert('Error al cargar los datos de la factura. Revisa la consola.')
}
