export const configUsuarios = {
    nombre: 'Productos',
    // endpoint: 'https://api.ejemplo.com/productos',

    campos: [
        {
            name: 'id_usuario',
            label: 'ID Usuario',
            type: 'text',
            required: false,
            readonly: true,
            showForm: false,
            showTable: true,
        },
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'apellido',
            label: 'Apellido',
            type: 'text',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'telefono',
            label: 'Teléfono',
            type: 'text',
            required: false,
            readonly: false,
            showForm: true,
        },
        {
            name: 'contrasena',
            label: 'Contraseña',
            type: 'password',
            required: true,
            readonly: false,
            showForm: true,
        },
        {
            name: 'tipo_usuario',
            label: 'Tipo de Usuario',
            type: 'select',
            required: true,
            readonly: false,
            showForm: true,
            options: () => {
                return [
                    { value: 'admin', label: 'Administrador' },
                    { value: 'comprador', label: 'Comprador' },
                    { value: 'vendedor', label: 'Vendedor' },
                ]
            },
        },
        {
            name: 'fecha_nacimiento',
            label: 'Fecha de Nacimiento',
            type: 'date',
            required: false,
            readonly: false,
            showForm: true,
            transform: value => {
                const fecha = new Date(value)

                const dia = String(fecha.getDate()).padStart(2, '0')
                const mes = String(fecha.getMonth() + 1).padStart(2, '0')
                const anio = fecha.getFullYear()

                return `${dia}/${mes}/${anio}`
            },
        },
        {
            name: 'genero',
            label: 'Género',
            type: 'select',
            required: false,
            readonly: false,
            showForm: true,
            options: () => {
                return [
                    { value: 'masculino', label: 'Masculino' },
                    { value: 'femenino', label: 'Femenino' },
                    { value: 'otro', label: 'Otro' },
                ]
            },
        },
        {
            name: 'comentario',
            label: 'Comentario',
            type: 'text',
            required: false,
            readonly: false,
            showForm: true,
            showTable: false,
        },
        {
            name: 'fecha_registro',
            label: 'Fecha de Registro',
            type: 'datetime-local',
            required: false,
            readonly: true,
            showForm: false,
        },
        {
            name: 'ultima_actividad',
            label: 'Última Actividad',
            type: 'datetime-local',
            required: false,
            readonly: true,
            showForm: false,
        },
        {
            name: 'estado_cuenta',
            label: 'Estado de Cuenta',
            type: 'select',
            required: true,
            readonly: false,
            showForm: false,
            // showTable: false,
        },
        {
            name: 'verificado',
            label: 'Verificado',
            type: 'checkbox',
            required: false,
            readonly: false,
            showForm: false,
            // showTable: false,
        },
    ],
    id: 'id_usuario',
}

// "id_usuario": "admin",
// "nombre": "Admina",
// "apellido": "asdf",
// "email": "",
// "telefono": null,
// "contrasena": "admin123",
// "tipo_usuario": "admin",
// "fecha_nacimiento": null,
// "genero": null,
// "comentario": null,
// "fecha_registro": "2025-04-29T10:40:52.807",
// "ultima_actividad": null,
// "estado_cuenta": "Activo",
// "verificado": false,
// "Carrito": [],
// "Facturas": [],
// "Favoritos": []
