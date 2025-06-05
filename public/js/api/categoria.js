import { URL_API } from '../configs.js'

export const getCategorias = async () => {
    const response = await fetch(`${URL_API}/api/Categoria`)
    if (!response.ok) {
        throw new Error('Error al obtener las categorias')
    }
    const data = await response.json()
    return data
    return [
        {
            CategoriaID: 1,
            Nombre: 'Muñecas',
            Descripcion: 'Juguetes con forma de figura humana, ideales para juego simbólico.',
            Productos: [],
        },
        {
            CategoriaID: 2,
            Nombre: 'Vehículos',
            Descripcion: 'Autos, camiones y otros medios de transporte en miniatura.',
            Productos: [],
        },
        {
            CategoriaID: 3,
            Nombre: 'Construcción',
            Descripcion: 'Bloques y piezas para armar y estimular la creatividad.',
            Productos: [],
        },
        {
            CategoriaID: 4,
            Nombre: 'Peluches',
            Descripcion: 'Juguetes suaves rellenos, generalmente en forma de animales.',
            Productos: [],
        },
        {
            CategoriaID: 5,
            Nombre: 'Educativos',
            Descripcion: 'Juguetes diseñados para promover el aprendizaje y desarrollo cognitivo.',
            Productos: [],
        },
    ]
}
export const getNombreCategoria = async () => {
    const response = await fetch(`${URL_API}/api/categoria`)
    console.log(response)
    if (!response.ok) {
        throw new Error('Error al obtener las categorias')
    }
    const data = await response.json()
    console.log(data)
    return data.map(categoria => categoria.Nombre)

    return ['Muñecas', 'Vehículos', 'Construcción', 'Peluches', 'Educativos']
}
