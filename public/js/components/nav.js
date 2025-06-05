export default function InitNav() {
    let isScrolling
    let lastScrollTop = 0
    let isMouseOverNav = false

    const nav = document.querySelector('nav')
    const fondoNav = document.querySelector('#fondo-nav-mobile')

    const hamburguesa = document.getElementById('hamburguesa')
    hamburguesa.addEventListener('click', function () {
        const menu = document.getElementById('mobile-menu')
        menu.classList.toggle('visible')
        fondoNav.classList.toggle('hidden')
    })
    fondoNav.addEventListener('click', function () {
        const menu = document.getElementById('mobile-menu')
        menu.classList.remove('visible')
        fondoNav.classList.add('hidden')
    })

    function showNav() {
        nav.style.opacity = '1'
    }
    function hideNav() {
        // no se esconde en celulares
        if (window.scrollY < 20 || window.innerWidth < 350) {
            return
        }
        nav.style.opacity = '0'
    }

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY

        if (scrollTop < lastScrollTop) {
            // Scroll hacia arriba
            showNav()
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // Para evitar valores negativos

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling)

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
            hideNav()
        }, 400) // 600ms = 0.6 second
    })
    nav.addEventListener('mouseenter', function () {
        isMouseOverNav = true
        showNav()
    })

    // Hide nav when mouse leaves it
    nav.addEventListener('mouseleave', function () {
        isMouseOverNav = false
        isScrolling = setTimeout(function () {
            hideNav()
        }, 400) // 600ms = 0.6 second
    })
}

let isScrolling
let lastScrollTop = 0
let isMouseOverNav = false

var nav = document.querySelector('nav')

function showNav() {
    nav.style.opacity = '1'
}

function hideNav() {
    // no se esconde en celulares
    if (window.scrollY < 20 || window.innerWidth < 350) {
        return
    }
    nav.style.opacity = '0'
}
