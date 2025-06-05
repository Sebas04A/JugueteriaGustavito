import { comprobarContra, postUsuario } from '../../api/usuarios.js'
import InitModal, { mostrarSesion } from '../modal.js'

// ----------------------------- Formulario INICIO SESION -----------------------------
export default async function verificarRegistroUsuario(e) {
    e.preventDefault()
    console.log('Iniciar sesión...')
    const formIniciarSesion = document.getElementById('form-iniciar-sesion')
    const usuario = formIniciarSesion['id_usuario'].value
    const contrasena = formIniciarSesion['contrasena'].value
    console.log(usuario, contrasena)
    let response
    try {
        response = await comprobarContra(usuario, contrasena)
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        alert(error)
        return
    }
    try {
        localStorage.setItem('usuario', usuario)
        console.log(response)
        if (response.tipo_usuario === 'admin') {
            localStorage.setItem('admin', true)
        }
        console.log('monstrando Sesion')
        mostrarSesion()
        alert('Inicio de sesión exitoso')
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        alert('Hubo un problema al iniciar sesión.', error)
    }
}

// ----------------------------- Formulario REGISTRO -----------------------------

export async function enviarRegistro(e) {
    e.preventDefault()
    console.log('registrando')
    const formRegistro = document.getElementById('form-registro')

    // Obtener valores del formulario
    const nombre = formRegistro['nombre'].value.trim()
    const apellido = formRegistro['apellido'].value.trim()
    const fecha_nacimiento = formRegistro['fecha_nacimiento'].value
    const genero = formRegistro['genero'].value
    // const direccion = formRegistro['direccion'].value.trim()
    // const ciudad = formRegistro['ciudad'].value.trim()
    // const estado = formRegistro['estado'].value.trim()
    // const codigo_postal = formRegistro['codigo_postal'].value.trim()
    const telefono = formRegistro['telefono'].value.trim()
    const email = formRegistro['email'].value.trim()
    const username = formRegistro['username'].value.trim()
    const password = formRegistro['password-registro'].value
    const confirm_password = formRegistro['confirm_password'].value
    // const categorias_interes = Array.from(
    //     document.querySelectorAll('#opciones-intereses-container input:checked')
    // ).map(checkbox => checkbox.value)
    // const comentarios = formRegistro['comentarios'].value.trim()
    const tipoUsuario = formRegistro['tipo_usuario'].value

    // Verificar datos
    if (password !== confirm_password) {
        alert('Las contraseñas no coinciden')
        return
    }
    if (!username || !password || !email) {
        alert('Por favor, completa todos los campos obligatorios')
        return
    }
    if (username.length < 3 || username.length > 20) {
        alert('El nombre de usuario debe tener entre 3 y 20 caracteres')
        return
    }
    if (password.length < 6 || password.length > 20) {
        alert('La contraseña debe tener entre 6 y 20 caracteres')
        return
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert('El nombre de usuario solo puede contener letras y números')
        return
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido')
        return
    }
    if (telefono && !/^\d{10,15}$/.test(telefono)) {
        alert('El teléfono debe tener entre 10 y 15 dígitos')
        return
    }

    // if (categorias_interes.length === 0) {
    //     alert('Selecciona al menos una categoría de interés')
    //     return
    // }

    const nuevoUsuario = {
        id_usuario: username, // Este puede ser generado automáticamente en el servidor
        nombre, // Nombre del usuario
        apellido, // Apellido del usuario
        fecha_nacimiento: fecha_nacimiento || null, // Asegúrate de convertir a formato válido si es necesario
        genero: genero || null, // Género del usuario
        // comentario: comentarios || null, // Comentarios adicionales
        // direccion, // Dirección del usuario (puedes asignar si es parte de Direcciones en el servidor)
        // ciudad, // Ciudad del usuario
        // estado, // Estado o provincia del usuario
        // codigoPostal: codigo_postal || null, // Código postal
        telefono: telefono || null, // Teléfono del usuario
        email, // Correo electrónico del usuario
        contrasena: password, // Contraseña del usuario
        tipoUsuario, // Esto puede ser asignado como "comprador", "vendedor" o "ambos" en el servidor
        // fechaRegistro: null, // El servidor puede asignar automáticamente esta fecha
        // ultimaActividad: null, // También puede asignarse en el servidor
        // estadoCuenta: 'Activo', // Valor por defecto en el servidor
        // verificado: false, // Valor por defecto
        // categoriasInteres: categorias_interes || [], // Categorías de interés seleccionadas
    }
    console.log('Nuevo usuario a registrar:', nuevoUsuario)

    try {
        const res = await postUsuario(nuevoUsuario)
        console.log('Respuesta del servidor:', res)

        if (res < 0) console.error('Error al registrar el usuario:', res)
        alert('Usuario registrado con éxito')

        localStorage.setItem('usuario', username)
        if (nuevoUsuario.tipoUsuario === 'admin') {
            localStorage.setItem('admin', true)
        }
        mostrarSesion()
        formRegistro.reset()
    } catch (error) {
        console.error('Error al registrar el usuario:', error)
        alert('Hubo un problema al registrar el usuario.', error.message)
        return
    }
}

// ----------------------------- Cerrar Sesion -----------------------------
// Aplicar el tamaño al texto de muestra al hacer clic en el botón
