import { agregarProductoCarrito } from '../api/carrito.js'
import { getCategorias } from '../api/categoria.js'
import { getFacturas } from '../api/factura.js'
import { getFacturasDetalle } from '../api/facturaDetalle.js'
import { getProducto, getProductos, postProducto, putProducto } from '../api/productos.js'
import { getUsuarios, postUsuario, putUsuario } from '../api/usuarios.js'
import { insertarListaProductos, mostrarProductos } from '../helpers/listaProductos.js'
import { configCategorias } from './configs/categorias.js'
import { configFacturaDetalle } from './configs/facturaDetalle.js'
import { configFacturas } from './configs/facturas.js'
import { configProductos } from './configs/productos.js'
import { configUsuarios } from './configs/usuario.js'

console.log('Cargando crudManager.js')

const modulo_config_funcion = {
    productos: {
        datos: getProductos,
        config: configProductos,
        actualizar: putProducto,
        crear: postProducto,
    },
    usuarios: {
        datos: getUsuarios,
        config: configUsuarios,
        actualizar: putUsuario,
        crear: postUsuario,
    },
    categorias: { datos: getCategorias, config: configCategorias },
    facturaDetalle: { datos: getFacturasDetalle, config: configFacturaDetalle },
    factura: { datos: getFacturas, config: configFacturas },
}
export function crearAsPrincipal() {
    return Object.keys(modulo_config_funcion).map(modulo => {
        const a = document.createElement('a')
        a.className = 'btn btn-primary btn-lg'
        a.style = `
                border-radius: 10px;
                font-size: 18px;
                font-weight: bold;
                padding: 12px;
                background-color: var(--color-primario-claro);
                color: var(--color-texto-primario);
            `
        a.textContent = 'Administrar ' + modulo
        a.href = `#${modulo}/listar`
        return a
    })
}
function crearUlNav() {
    const moduloActual = window.location.hash.slice(1).split('/')[0]
    const ul = document.createElement('ul')
    for (const modulo in modulo_config_funcion) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = `#${modulo}/listar`
        a.textContent = modulo.charAt(0).toUpperCase() + modulo.slice(1)
        if (modulo === moduloActual) {
            // mostrar com inactivo
            a.classList.add('actual')
        }

        li.appendChild(a)
        ul.appendChild(li)
    }
    return ul
}
function obtenerBtnInicio() {
    const inicio = document.createElement('btn')
    inicio.id = 'inicio'
    inicio.classList.add(
        'justify-content-center',
        'bg-primario-claro',
        'align-items-center',
        'me-4',
        'me-md-0',
        'rounded',
        'align-items-center',
        'sm-ml-0',
        'mr-4',
        'm-2',
        'fs-1',
        'fw-bold',
        'text-center',
        'p-2',
        'd-none',
        'd-sm-flex'
    )
    inicio.addEventListener('click', () => {
        window.location = '/public/index.html'
    })
    inicio.innerHTML = `<iconify-icon icon="material-symbols:home"></iconify-icon>`
    return inicio
}
function fondoMobile() {
    const div = document.createElement('div')
    div.id = 'fondo-nav-mobile'
    div.className = 'position-absolute hidden z-2 top-0 start-0 w-100 h-100'
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
    return div
}
export async function crearNav() {
    console.log('Creando nav')

    const divNav = document.getElementById('nav-crud-placeholder')
    divNav.innerHTML = ''

    divNav.appendChild(fondoMobile())

    const mobileMenu = document.createElement('div')
    mobileMenu.id = 'mobile-menu'
    mobileMenu.classList.add('hidden')

    const ulMobile = crearUlNav()
    const liInicio = document.createElement('li')
    const aInicio = document.createElement('a')
    aInicio.href = '#'
    aInicio.textContent = 'Inicio'
    aInicio.addEventListener('click', () => {
        window.location = '/public/index.html'
    })
    liInicio.appendChild(aInicio)
    ulMobile.prepend(liInicio)
    mobileMenu.appendChild(ulMobile)

    divNav.appendChild(mobileMenu)

    const nav = document.createElement('nav')

    const inicio = obtenerBtnInicio()
    nav.appendChild(inicio)

    const titulo = document.createElement('p')
    titulo.id = 'titulo'
    titulo.textContent = 'CRUD'
    nav.appendChild(titulo)

    const ul = crearUlNav()
    ul.id = 'nav-list'
    nav.appendChild(ul)

    const hamburguesa = document.createElement('div')
    hamburguesa.id = 'hamburguesa'
    hamburguesa.innerHTML = '&#9776;'
    hamburguesa.addEventListener('click', () => {
        // mobileMenu.classList.toggle('visible')
        // mobileMenu.classList.toggle('hidden')
    })
    nav.appendChild(hamburguesa)

    divNav.appendChild(nav)
}

export async function renderTabla(modulo) {
    const config = modulo_config_funcion[modulo].config
    const campos = config.campos.filter(c => (c.showTable == null) & c.showForm || c.showTable)
    const datos_tabla = await modulo_config_funcion[modulo].datos()
    const grid = document.getElementById('crud-tabla')
    const form = document.getElementById('crud-form')
    form.classList.add('d-none')
    grid.classList.remove('d-none')

    grid.style.gridTemplateColumns = `repeat(${campos.length + 1}, auto)`
    grid.classList.add('gy-4')

    const thead = `
        ${campos
            .map(c => `<div class="border-end mr-2 bg-primario p-1">${c.label}</div>`)
            .join('')}<div class="border-end">Acciones</div></div>
    `
    grid.innerHTML = thead
    console.log(`config.campos`, config.id)

    datos_tabla.forEach(item => {
        // console.log('item', item)
        const tbody = `${campos
            // .filter(c => c.showForm)
            .map(c => {
                let valor = item[c.name]
                // console.log('Campo:', c)
                if (c.transform) {
                    console.log(c.transform(item[c.name]))
                    valor = c.transform(item[c.name])
                }
                return `<div class="text-truncate border-end bg-fondo p-1">${valor}</div>`
            })
            .join('')}
      <div class=""><button class="btn color-texto-primario" onclick="window.location.hash = '${modulo}/editar/${
            item[config.id]
        }'", ${item.id})">Editar</button></div>
    </div>`
        grid.innerHTML += tbody
    })
}

async function createInputForm(campo, dato) {
    console.log('Creando input para el campo:', campo, 'con dato:', dato)
    const container = document.createElement('div')
    container.classList.add('col-md-6')
    if (campo.type == 'productos') {
        console.log('Productos')
        const container = document.createElement('div')
        container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'm-4')
        const containerProductos = document.createElement('div')
        containerProductos.id = 'lista-productos'
        containerProductos.classList = 'd-flex justify-content-center flex-wrap gap-4'

        console.log(dato)
        const idFactura = dato[0].FacturaID
        // OBTNER SOLO EL PRODUCTOID
        const productosIds = dato.map(p => p.ProductoID)
        console.log('IDs de productos:', productosIds)
        console.log('ID de factura:', idFactura)
        const productos = []
        for (const datoItem of dato) {
            const producto = await getProducto(datoItem.ProductoID)
            producto.cantidad = datoItem.Cantidad
            console.log('Producto:', producto)
            console.log('Dato:', datoItem)
            productos.push(producto)
        }

        console.log('Productos:', productos)
        const totalContainer = document.createElement('div')
        totalContainer.id = 'total-container'
        totalContainer.classList.add('text-center', 'fw-bold', 'color-primario')
        const totalSpan = document.createElement('span')
        totalSpan.id = 'total'
        totalSpan.textContent = productos
            .reduce((total, p) => total + p.prodPrecio * p.cantidad, 0)
            .toFixed(2)
        totalContainer.innerHTML = `Total: `
        totalContainer.appendChild(totalSpan)
        totalContainer.innerHTML += ' $'
        containerProductos.appendChild(totalContainer)
        container.appendChild(containerProductos)

        // mostrarProductos(productos, containerProductos, false, false, 'factura')
        mostrarProductos(productos, containerProductos, 'factura', false, false, false)

        console.log('Contenedor de productos:', containerProductos)
        container.appendChild(containerProductos)
        return container
    }

    const label = document.createElement('label')
    label.classList.add('form-label')
    label.textContent = campo.label
    container.appendChild(label)

    const input = document.createElement(campo.type == 'select' ? 'select' : 'input')
    input.classList.add('form-control')
    if (campo.readonly) {
        input.classList.add('readonly')
        input.setAttribute('readonly', true)
        input.classList.add('bg-fondo')
    }
    if (campo.type != 'select') {
        input.type = campo.type
    }
    if (campo.required) {
        input.setAttribute('required', true)
    }
    input.value = dato
    input.name = campo.name

    if (campo.type == 'select') {
        const options = document.createElement('option')
        options.value = ''
        options.textContent = 'Seleccione'
        input.appendChild(options)

        if (campo.options) {
            let opciones = await campo.options()

            if (!opciones[0]['value']) {
                opciones = opciones.map((opcion, i) => {
                    return { value: i + 1, label: opcion }
                })
            }

            let opcionSeleccionada = null
            console.log('DATO OPCION', dato)
            opciones.forEach((opcion, i) => {
                console.log('Opción:', opcion)
                const option = document.createElement('option')
                option.value = opcion.value
                option.textContent = opcion.label
                // console.log('OPCION ACTUAL', opcion.value)
                if (dato && (opcion.value === dato || opcion.label === dato)) {
                    opcionSeleccionada = opcion.value
                }

                input.appendChild(option)
            })
            console.log('Opción seleccionada:', opcionSeleccionada)
            console.log('DATO', dato)
            opcionSeleccionada = opcionSeleccionada ? opcionSeleccionada : dato
            console.log('Opción seleccionada final:', opcionSeleccionada)
            input.value = opcionSeleccionada
        }
        if (campo.crud) {
            const btnAgregar = document.createElement('button')
            btnAgregar.classList.add('btn', 'bg-primario', 'rounded', 'px-2', 'py-0', 'ms-4')
            btnAgregar.textContent = '+'
            btnAgregar.type = 'button'
            btnAgregar.onclick = () => {
                window.location.hash = `${campo.crud}/crear`
            }
            container.appendChild(btnAgregar)
        }
    }
    container.appendChild(input)
    // console.log(container)
    if (campo.showForm) {
        return container
    }
}
export async function renderFormulario(modulo, id = null) {
    console.log('Renderizando formulario para el modulo:', modulo, 'ID:', id)
    const grid = document.getElementById('crud-tabla')
    const form = document.getElementById('crud-form')
    grid.classList.add('d-none')
    form.classList.remove('d-none')

    let datos = null
    const config = modulo_config_funcion[modulo].config

    if (id) {
        datos = await modulo_config_funcion[modulo].datos().then(datos => {
            return datos.find(item => item[config.id] == id)
        })
    }
    console.log('Datos a editar:', datos)
    const campos = config.campos.filter(c => c.showForm)
    form.innerHTML = ''

    for (const campo of campos) {
        const container = await createInputForm(campo, datos ? datos[campo.name] : null)
        if (container) {
            form.appendChild(container)
        }
    }

    const btn = document.createElement('button')
    btn.classList.add('btn', 'bg-primario', 'rounded', 'p-2')
    btn.textContent = 'Guardar'
    btn.type = 'submit'
    form.appendChild(btn)
    // return
    form.onsubmit = async e => {
        e.preventDefault()
        let datosCampos = {}
        campos.forEach(c => {
            datosCampos[c.name] = form.elements[c.name].value
        })
        console.log('Datos a guardar:', datosCampos)
        try {
            let res
            if (id) {
                console.log('Actualizando datos con ID:', id)
                console.log(datos[config.id])

                datosCampos[config.id] = id // Asegurarse de que el ID se mantenga
                console.log('Datos actualizados:', datosCampos)
                res = await modulo_config_funcion[modulo].actualizar(datosCampos)
            } else {
                res = await modulo_config_funcion[modulo].crear(datosCampos)
            }
            if (!res) {
                console.error('No se pudo guardar el producto')
                alert('No se pudo guardar el producto. Intente nuevamente.')
                return
            }
            console.log('Datos guardados exitosamente:', res)
            window.location.hash = `${modulo}/listar`
        } catch (error) {
            console.error('Error al guardar el producto:', error)
            alert('Hubo un problema al guardar el producto. Intente nuevamente.')
        }
        alert('Producto guardado exitosamente')

        form.reset()
    }
}

// // Esto se expone globalmente para el onclick inline
// window.eliminarItem = async (endpoint, id) => {
//     await deleteItem(endpoint, id)
//     location.reload()
// }
