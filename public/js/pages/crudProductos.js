import { configProductos } from '../crud/configs/productos.js'
import { iniciarCRUD } from '../crud/crudManager.js'

document.addEventListener('DOMContentLoaded', () => {
    iniciarCRUD(configProductos)
})
