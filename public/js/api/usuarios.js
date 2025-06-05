import { URL_API } from '../configs.js'

export const getUsuarios = async () => {
    const response = await fetch(`${URL_API}/api/Usuarios`)
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios')
    }
    const data = await response.json()
    console.log(data)
    return data
    return [
        {
            id_usuario: 'admin',
            nombre: 'Admina',
            apellido: 'asdf',
            email: '',
            telefono: null,
            contrasena: 'admin123',
            tipo_usuario: 'admin',
            fecha_nacimiento: null,
            genero: null,
            comentario: null,
            fecha_registro: '2025-04-29T10:40:52.807',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
        {
            id_usuario: 'nico',
            nombre: 'Nicolás',
            apellido: 'Guevara',
            email: 'nico',
            telefono: '098427123m',
            contrasena: 'nico',
            tipo_usuario: 'comprador',
            fecha_nacimiento: '2004-08-20T00:00:00',
            genero: 'masculino',
            comentario: 'Hoal',
            fecha_registro: '2025-05-01T08:13:12.04',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
        {
            id_usuario: 'sebas1',
            nombre: 'Sebas',
            apellido: 'alban',
            email: 'sebas',
            telefono: '0994542384m',
            contrasena: 'sebas123',
            tipo_usuario: 'comprador',
            fecha_nacimiento: '2003-10-10T00:00:00',
            genero: 'masculino',
            comentario: null,
            fecha_registro: '2025-05-01T08:46:35.19',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
        {
            id_usuario: 'user',
            nombre: '',
            apellido: '',
            email: 'user',
            telefono: null,
            contrasena: 'user123',
            tipo_usuario: 'comprador',
            fecha_nacimiento: null,
            genero: null,
            comentario: null,
            fecha_registro: '2025-04-29T16:42:58.053',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
        {
            id_usuario: 'user2',
            nombre: '',
            apellido: '',
            email: 'user2@gmal.com',
            telefono: null,
            contrasena: 'user123',
            tipo_usuario: 'vendedor',
            fecha_nacimiento: null,
            genero: null,
            comentario: null,
            fecha_registro: '2025-04-30T18:28:07.13',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
        {
            id_usuario: 'user3',
            nombre: '',
            apellido: '',
            email: 'user3@gmail.com',
            telefono: null,
            contrasena: 'user123',
            tipo_usuario: 'comprador',
            fecha_nacimiento: null,
            genero: null,
            comentario: null,
            fecha_registro: '2025-05-01T08:05:09.64',
            ultima_actividad: null,
            estado_cuenta: 'Activo',
            verificado: false,
            Carrito: [],
            Facturas: [],
            Favoritos: [],
        },
    ]
}
export const getUsuario = async id => {
    const response = await fetch(`${URL_API}/api/Usuarios/?cedula=${id}`)
    if (!response.ok) {
        throw new Error('Error al obtener el usuario')
    }
    const data = await response.json()
    return data
}

export const comprobarContra = async (id, contrasena) => {
    const usuario = await getUsuario(id)
    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }
    if (usuario.contrasena !== contrasena) {
        throw new Error('Contraseña incorrecta')
    }
    return usuario
}

const convertirUsuario = usuario => {
    // poner null en todos los ""
    let nuevoUsuario = { ...usuario }
    for (const key in usuario) {
        if (nuevoUsuario[key] === '') {
            nuevoUsuario[key] = null
        }
    }
    return nuevoUsuario
}

export const postUsuario = async usuario => {
    usuario = convertirUsuario(usuario)
    const response = await fetch(`${URL_API}/api/Usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })

    if (!response.ok) {
        throw new Error('Error al crear el usuario')
    }
    return await response.json()
}
export const putUsuario = async usuario => {
    usuario = convertirUsuario(usuario)
    console.log('putUsuario', usuario)
    const response = await fetch(`${URL_API}/api/Usuarios/${usuario.id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
    if (!response.ok) {
        throw new Error('Error al actualizar el usuario')
    }
    const responseText = await response.text()
    console.log(responseText)

    return responseText
}
