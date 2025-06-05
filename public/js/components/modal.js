import verificarRegistroUsuario, { enviarRegistro } from './modal/login.js'
export function mostrarSesion() {
    document.getElementById('contenedor-sesion').style.display = 'block'
    document.getElementById('contenedor-registrarse').style.display = 'none'
    document.getElementById('contenedor-iniciar-sesion').style.display = 'none'
    // misChatsOptions.style.display = 'block'
    // const esAdmin = localStorage.getItem('admin')
    // if (esAdmin) {
    //     administradorOption.style.display = 'block'
    // } else {
    //     administradorOption.style.display = 'none'
    // }
}
export default function InitModal() {
    const iniciarSesionBtn = document.getElementById('btn-iniciar-sesion')
    iniciarSesionBtn.addEventListener('click', event => {
        verificarRegistroUsuario(event)
    })

    const registrarseBtn = document.getElementById('btn-registrarse')
    registrarseBtn.addEventListener('click', e => {
        console.log('registrarse')
        enviarRegistro(e)
    })

    const btnUsuario = document.getElementById('btn-usuario')
    const modalContent = document.getElementById('modal-content')
    const loginForm = document.getElementById('modal-derecha')

    const modalRegistrarse = document.getElementById('contenedor-registrarse')
    const modalIniciarSesion = document.getElementById('contenedor-iniciar-sesion')
    const modalSesion = document.getElementById('contenedor-sesion')

    const administradorOption = document.getElementById('administrador')
    // const misChatsOptions = document.getElementById('mis-chats')
    const darkModeBtn = document.getElementById('dark-mode')
    darkModeBtn.addEventListener('click', () => {
        const html = document.querySelector('html')
        html.classList.toggle('oscuro')
    })
    const cerrarSesionBtn = document.getElementById('btn-cerrar-sesion')
    cerrarSesionBtn.addEventListener('click', () => {
        cerrarSesion()
        noMostrarSesion()
    })

    function mostrarIniciarSesion() {
        modalIniciarSesion.style.display = 'block'
        modalRegistrarse.style.display = 'none'
        modalSesion.style.display = 'none'
    }
    function elegirVistaModal() {
        // mostrarSesion()
        // return
        if (localStorage.getItem('usuario')) {
            if (localStorage.getItem('admin') != null) {
                administradorOption.style.display = 'block'
            } else {
                administradorOption.style.display = 'none'
            }
            contenedorIniciarSesion.style.display = 'none'
            contenedorSesion.style.display = 'flex'
            cerrarSesionBtn.style.display = 'block'
            modalRegistrarse.style.display = 'none'
            modalIniciarSesion.style.display = 'none'
        } else {
            mostrarIniciarSesion()
        }
    }

    function mostrarModal() {
        loginForm.classList.add('active')
        elegirVistaModal()
    }
    function noMostrarSesion() {
        contenedorIniciarSesion.style.display = 'block'
        contenedorSesion.style.display = 'none'
        cerrarSesionBtn.style.display = 'none'
    }
    //---------------------------MOSTRAR MODAL

    btnUsuario.addEventListener('click', () => {
        loginForm.classList.toggle('active')
        elegirVistaModal()
    })
    // ---------------------------CERRAR MODAL
    const btnCerrar = document.getElementById('cerrar-login')
    btnCerrar.addEventListener('click', () => {
        loginForm.classList.remove('completo')
        loginForm.classList.remove('active')
    })

    // ---------------------------MOSTRAR MODAL DE REGISTRARSE

    function mostrarRegistrarse() {
        // mostrar display
        document.getElementById('contenedor-sesion').style.display = 'none'
        document.getElementById('contenedor-registrarse').style.display = 'block'
        document.getElementById('contenedor-iniciar-sesion').style.display = 'none'
        loginForm.style.width = '100%'
    }
    document.getElementById('registrarse-login').addEventListener('click', () => {
        mostrarRegistrarse()
    })
    // ---------------------------MOSTRAR MODAL DE INICIAR SESION

    const contenedorIniciarSesion = document.getElementById('contenedor-iniciar-sesion')
    const contenedorSesion = document.getElementById('contenedor-sesion')
    const misPropiedadesUl = document.getElementById('mis-propiedades-admin')

    // ---------------------------MOSTRAR CONTRASEÑA

    function verContra() {
        const contra = document.getElementById('contrasena')
        if (contra.type === 'password') {
            //Tiempo de 5 segundos
            setTimeout(() => {
                contra.type = 'password'
                verContra.name = 'eye-off'
            }, 2000)
            contra.type = 'text'
            verContra.name = 'eye'
        } else {
            contra.type = 'password'
            verContra.name = 'eye-off'
        }
    }
    function cerrarSesion() {
        localStorage.removeItem('usuario')
        localStorage.removeItem('admin')
        noMostrarSesion()
    }
}
