import { renderTabla, renderFormulario, crearNav, crearAsPrincipal } from '../crud/crudManager.js'

const titlulo = document.getElementById('titulo-crud')
const btnHeader = document.getElementById('btn-header')
const iconMas = `<iconify-icon
                        icon="akar-icons:plus"
                        class="me-sm-2"
                        style="color: #fff; font-size: 20px"
                    ></iconify-icon>`
const crudPlaceholder = document.getElementById('crud-placeholder')
const homeCrud = document.getElementById('crud-home')
const aContainer = document.getElementById('a-container')

async function cargarPagina() {
    console.log('Cargando página...')
    const hash = window.location.hash.slice(1)
    const partes = hash.split('/')
    const modulo = partes[0]
    const accion = partes[1]
    const id = partes[2] || null
    console.log('Cargando sección:', modulo, 'acción:', accion, 'ID:', id)

    crearNav()

    if (!modulo) {
        console.log('No se ha especificado una sección')
        // alert('No se ha especificado una sección')
        homeCrud.classList.remove('d-none')
        const as = crearAsPrincipal()
        as.forEach(a => {
            aContainer.appendChild(a)
        })

        crudPlaceholder.classList.add('d-none')

        return
    }
    homeCrud.classList.add('d-none')

    crudPlaceholder.classList.remove('d-none')

    const pBtnHeader = document.createElement('p')
    pBtnHeader.className = 'm-0 hidden d-sm-block'

    const tituloLegible = modulo.charAt(0).toUpperCase() + modulo.slice(1)
    titlulo.textContent = tituloLegible
    console.log('renderizando modulo', modulo + ' ' + accion)

    if (accion === 'listar') {
        pBtnHeader.textContent = `Agregar ${tituloLegible}`
        btnHeader.innerHTML = iconMas
        btnHeader.appendChild(pBtnHeader)
        btnHeader.onclick = () => {
            window.location.hash = `${modulo}/crear`
        }
        renderTabla(modulo)
        document.getElementById('crud-tabla').classList.remove('d-none')
        document.getElementById('crud-form').classList.add('d-none')
    } else if (accion === 'crear') {
        btnHeader.innerHTML = ` Regresar Lista `
        btnHeader.onclick = () => {
            window.location.hash = `${modulo}/listar`
        }
        titlulo.textContent = `Crear ${tituloLegible}`
        renderFormulario(modulo)
        document.getElementById('crud-form').classList.remove('d-none')
        document.getElementById('crud-tabla').classList.add('d-none')
    } else if (accion === 'editar') {
        btnHeader.innerHTML = ` Regresar Lista `
        btnHeader.onclick = () => {
            window.location.hash = `${modulo}/listar`
        }
        titlulo.textContent = `Editar ${tituloLegible}`
        renderFormulario(modulo, id)
        document.getElementById('crud-form').classList.remove('d-none')
        document.getElementById('crud-tabla').classList.add('d-none')
    }
}
console.log('Cargando página inicial...')
cargarPagina()
// Cargar al entrar
// window.addEventListener('DOMContentLoaded', cargarPagina)
// Cargar cada vez que cambia el hash
window.addEventListener('hashchange', cargarPagina)

{
    /* <div id="mobile-menu" class="hidden">
    <ul>
        <li><a href="/public/index.html">Inicio</a></li>
        <li><a href="about.html">Sobre Nosotros</a></li>
        <li><a href="/public/pages/buscarProductos.html">Buscar Propiedades</a></li>
    </ul>
</div>
<nav>
    <p id="titulo">Jugueteria Gustavito</p>

    <ul id="nav-list">
        <li><a href="/public/index.html">Inicio</a></li>
        <li><a id="actual" href="about.html">Sobre Nosotros</a></li>
        <li><a href="/public/pages/buscarProductos.html">Buscar Juguetes</a></li>
    </ul>

    <div id="hamburguesa" onclick="toggleMenu()">&#9776;</div>
</nav> */
}
