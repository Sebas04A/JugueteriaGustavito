export default function obtenerUsuario() {
    const usuario = localStorage.getItem('usuario')
    const admin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')

    if (usuario) {
        return {
            usuario: JSON.parse(usuario),
            admin: JSON.parse(admin),
        }
    } else {
        return null
    }
}
