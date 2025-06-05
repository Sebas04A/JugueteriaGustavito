// OBTENER PRODUCTOS CON AJAX

import { URL_API } from '../configs.js'

// export const getProductos = async () => {
//     const res = [
//         {
//             idProducto: 1,
//             prodCategoria: 'Sin categoría',
//             prodNombre: 'Jug1',
//             prodDescripcion: 'Desc1',
//             prodPrecio: 30.0,
//             prodStock: 0,
//             prodProveedor: 'Juguetería Gustavito',
//             prodImg: ['https://bebemundo.ec/cdn/shop/files/4895038506862.png?v=1702163429'],
//         },
//         {
//             idProducto: 2,
//             prodCategoria: 'Vehículos',
//             prodNombre: 'Jug2',
//             prodDescripcion: 'Desc2',
//             prodPrecio: 5.0,
//             prodStock: 3,
//             prodProveedor: 'Juguetería Gustavito',
//             prodImg: [
//                 'https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/f/i/fisher-price-juguete-para-bebes-dj-bouncy-salta-y-aprende-63048-default-1.jpg',
//             ],
//         },
//         {
//             idProducto: 3,
//             prodCategoria: 'Peluches',
//             prodNombre: 'Jug3',
//             prodDescripcion: 'Desc3',
//             prodPrecio: 7.0,
//             prodStock: 0,
//             prodProveedor: 'Juguetería Gustavito',
//             prodImg: [
//                 'https://www.ubuy.ec/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFsSTNpb00xWkwuX0FDX1NMMTUwMF8uanBn.jpg',
//             ],
//         },
//         {
//             idProducto: 4,
//             prodCategoria: 'Vehículos',
//             prodNombre: 'Jug4',
//             prodDescripcion: 'Desc4',
//             prodPrecio: 10.0,
//             prodStock: 0,
//             prodProveedor: 'Juguetería Gustavito',
//             prodImg: [
//                 'https://img.huffingtonpost.com/asset/5c8ae0422500000d04c9cc1c.jpeg?ops=1200_630',
//             ],
//         },
//     ]

// }
// export const getProductos = async () => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const res = [
//                 {
//                     idProducto: 1,
//                     prodCategoria: 'Sin categoría',
//                     prodNombre: 'Jug1',
//                     prodDescripcion: 'Desc1',
//                     prodPrecio: 30.0,
//                     prodStock: 0,
//                     prodProveedor: 'Juguetería Gustavito',
//                     prodImg: ['https://bebemundo.ec/cdn/shop/files/4895038506862.png?v=1702163429'],
//                 },
//                 {
//                     idProducto: 2,
//                     prodCategoria: 'Vehículos',
//                     prodNombre: 'Jug2',
//                     prodDescripcion: 'Desc2',
//                     prodPrecio: 5.0,
//                     prodStock: 3,
//                     prodProveedor: 'Juguetería Gustavito',
//                     prodImg: [
//                         'https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/f/i/fisher-price-juguete-para-bebes-dj-bouncy-salta-y-aprende-63048-default-1.jpg',
//                     ],
//                 },
//                 {
//                     idProducto: 3,
//                     prodCategoria: 'Peluches',
//                     prodNombre: 'Jug3',
//                     prodDescripcion: 'Desc3',
//                     prodPrecio: 7.0,
//                     prodStock: 0,
//                     prodProveedor: 'Juguetería Gustavito',
//                     prodImg: [
//                         'https://www.ubuy.ec/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFsSTNpb00xWkwuX0FDX1NMMTUwMF8uanBn.jpg',
//                     ],
//                 },
//                 {
//                     idProducto: 4,
//                     prodCategoria: 'Vehículos',
//                     prodNombre: 'Jug4',
//                     prodDescripcion: 'Desc4',
//                     prodPrecio: 10.0,
//                     prodStock: 0,
//                     prodProveedor: 'Juguetería Gustavito',
//                     prodImg: [
//                         'https://img.huffingtonpost.com/asset/5c8ae0422500000d04c9cc1c.jpeg?ops=1200_630',
//                     ],
//                 },
//             ]
//             resolve(res)
//         }, 2000) // 2000 milisegundos = 2 segundos de demora
//     })
// }

// export const getProducto = async id => {
//     return {
//         idProducto: 1,
//         prodCategoria: 'Sin categoría',
//         prodNombre: 'Jug1',
//         prodDescripcion: 'Desc1',
//         prodPrecio: 30.0,
//         prodStock: 0,
//         prodProveedor: 'Juguetería Gustavito',
//         prodImg: ['https://bebemundo.ec/cdn/shop/files/4895038506862.png?v=1702163429'],
//     }
// }
export const getProducto = async id => {
    const res = await fetch(`${URL_API}/api/integracion/productos/${id}`)
    if (!res.ok) {
        throw new Error('Error al cargar el producto')
    }
    return await res.json()
}
export const getProductos = async () => {
    const res = await fetch('http://jugueteriagusta.runasp.net/api/integracion/productos')
    if (!res.ok) {
        throw new Error('Error al cargar los productos')
    }
    const data = await res.json()
    console.log(data)
    return data
}
const convertirProducto = producto => {
    if (producto.idProducto) producto.idProducto = Number(producto.idProducto)
    producto.prodCategoria = Number(producto.prodCategoria)
    // producto.prodCategoria = 2
    producto.prodStock = Number(producto.prodStock)
    producto.prodPrecio = parseFloat(producto.prodPrecio)

    for (const key in producto) {
        if (producto[key] === '') {
            producto[key] = null // Poner null en todos los campos vacíos
        }
        if (producto[key] === undefined) {
            producto[key] = null // Poner null en todos los campos undefined
        }
    }

    if (producto.prodImg) producto.prodImg = [producto.prodImg] // Asegurarse de que sea un array

    return producto
}

export const postProducto = async producto => {
    producto = convertirProducto(producto)
    // quitar idProducto
    delete producto.idProducto
    console.log('postProducto', producto)
    const res = await fetch(`${URL_API}/api/integracion/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    })
    console.log(res)
    if (!res.ok) {
        throw new Error('Error al crear el producto')
    }
    return await res.json()
}
export const putProducto = async producto => {
    producto = convertirProducto(producto)
    console.log('putProducto', producto)
    const res = await fetch(`${URL_API}/api/integracion/productos/${producto.idProducto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    })
    console.log(res)
    if (!res.ok) {
        throw new Error('Error al actualizar el producto')
    }
    return res
}
