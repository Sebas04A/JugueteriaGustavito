// js/main.js
import InitModal from './components/modal.js'
import InitNav from './components/nav.js'
async function loadComponent(id, url) {
    const res = await fetch(url)
    const html = await res.text()
    const element = document.getElementById(id)
    if (!element) {
        console.error(`Elemento con id ${id} no encontrado`)
        return
    }
    document.getElementById(id).innerHTML = html

    // 👇 Espera a que el navegador actualice el DOM
    await new Promise(requestAnimationFrame)
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('modal-placeholder', '/public/components/modal.html')

    await loadComponent('contenedor-sesion', '/public/components/modalUsuario/sesion.html')
    await loadComponent(
        'contenedor-registrarse',
        '/public/components/modalUsuario/registrarse.html'
    )
    await loadComponent('contenedor-iniciar-sesion', '/public/components/modalUsuario/login.html')
    try {
        await loadComponent('nav-placeholder', '/public/components/navbar.html')
    } catch (error) {
        console.error('Error al cargar el navbar:', error)
        return
    }
    const url = window.location.href.split('/').pop()
    const isCrud = url.includes('crud')
    if (!isCrud) {
        console.log('no es crud')
        InitNav()
    }
    InitModal() // Aquí ya es seguro
})
