export const configCategorias = {
    nombre: 'Categorias',
    endpoint: 'http://jugueteriagusta.runasp.net/api/categorias',
    campos: [
        {
            name: 'CategoriaID',
            label: 'ID',
            type: 'number',
            required: true,
            readonly: true,
            showForm: true,
        },
        {
            name: 'Nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'Descripcion',
            label: 'Descripción',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
    ],
    id: 'CategoriaID',
}
