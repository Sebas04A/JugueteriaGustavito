import { getNombreCategoria } from '../../api/categoria.js'

export const configProductos = {
    nombre: 'Productos',
    endpoint: 'https://api.ejemplo.com/productos',

    campos: [
        {
            name: 'idProducto',
            label: 'ID',
            type: 'number',
            required: false,
            readonly: true,
            showForm: true,
        },
        {
            name: 'prodCategoria',
            label: 'Categoría',
            type: 'select',
            required: true,
            options: getNombreCategoria,
            crud: 'categorias',
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodNombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodDescripcion',
            label: 'Descripción',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodPrecio',
            label: 'Precio',
            type: 'number',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodStock',
            label: 'Stock',
            type: 'number',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodProveedor',
            label: 'Proveedor',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'prodImg',
            label: 'Imagenes (URL)',
            type: 'text',
            required: false,
            readonly: false,
            showForm: true,
            showTable: false,
        },
    ],
    id: 'idProducto',
}
