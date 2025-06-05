import { getCategorias, getNombreCategoria } from '../api/categoria.js'
import { getProductos } from '../api/productos.js'
import { insertarListaProductos } from '../helpers/listaProductos.js'

const productos = await getProductos()
console.log(productos)
insertarListaProductos('busqueda', productos)

const categoriaSelect = document.getElementsByClassName('location-select')[0]

// insertarCategorias
const categorias = await getCategorias()
categoriaSelect.innerHTML = '' // Limpiar opciones existentes
const option = document.createElement('option')
option.value = ''
option.textContent = 'Todas'
categoriaSelect.appendChild(option)
categorias.forEach(categoria => {
    console.log(categoria)
    const option = document.createElement('option')
    option.value = categoria.CategoriaID
    option.textContent = categoria.Nombre
    categoriaSelect.appendChild(option)
})
