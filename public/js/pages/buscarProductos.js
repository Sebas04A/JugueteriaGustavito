import { getProductos } from '../api/productos.js'
import { insertarListaProductos } from '../helpers/listaProductos.js'

console.log('buscando productos')
const productos = await getProductos()
insertarListaProductos('busqueda', productos)
