import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

interface Producto {
    nombre: string;
    cantidad: string;
    marca: string;
    precio: string;
}

interface Categoria {
    nombre: string;
    subcategoria: string;
    productos: Producto[];
}

interface URL {
    link: string;
    pages: number;
}

const getCategoriaAndSubcategoria = (link: string): [string, string] => {
    const [categoria, subcategoria] = link.split('/').slice(3, 5);
    return [categoria, subcategoria];
};

const parseProducto = (element: cheerio.Element, $: cheerio.CheerioAPI): Producto => {
    const nombre = $(element).find('.product-card-name').text().trim() || 'Nombre no disponible';
    const cantidad = $(element).find('.area-measurement-unit').text().trim() || 'Cantidad no disponible';
    const marca = $(element).find('.product-card-brand').text().trim() || 'Marca no disponible';
    const precio = $(element).find('.prices-main-price').text().trim() || 'Precio no disponible';

    return { nombre, cantidad, marca, precio };
};

const loadProductos = async (fullLink: string): Promise<Producto[]> => {
    try {
        const { data } = await axios.get(fullLink);
        const $:cheerio.CheerioAPI  = cheerio.load(data) as cheerio.CheerioAPI;

        return $('.product-card-wrap').map((_, element) => parseProducto(element, $)).get();
    } catch (error) {
        console.error('Error al obtener los productos:', (error as Error).message);
        console.log(fullLink);
        return [];
    }
};

const saveCategories = (categorias: Categoria[]): void => {
    try {
        fs.writeFileSync('productos.json', JSON.stringify(categorias, null, 2));
        console.log('Productos guardados en productos.json');
    } catch (error) {
        console.error('Error al guardar el catálogo:', (error as Error).message);
    }
};

const loadCategories = async (urlList: URL[]): Promise<void> => {
    const categorias: Categoria[] = await Promise.all(
        urlList.map(async ({ link, pages }) => {
            const [categoriaNombre, subcategoriaNombre] = getCategoriaAndSubcategoria(link);

            const productos = (await Promise.all(
                Array.from({ length: pages }, (_, i) => loadProductos(`${link}?page=${i + 1}`))
            )).flat();

            return {
                nombre: categoriaNombre,
                subcategoria: subcategoriaNombre,
                productos,
            };
        })
    );

    saveCategories(categorias);
};

const urlList: URL[] = [
    { link: 'https://www.jumbo.cl/lacteos/leches', pages: 7 },
    { link: 'https://www.jumbo.cl/lacteos/huevos', pages: 2 },
    { link: 'https://www.jumbo.cl/despensa/reposteria/cremas', pages: 2 },
    { link: 'https://www.jumbo.cl/lacteos/mantequillas-y-margarinas', pages: 2 },
    { link: 'https://www.jumbo.cl/despensa/pastas-y-salsas', pages: 9 },
    { link: 'https://www.jumbo.cl/despensa/arroz-y-legumbres', pages: 4 },
    { link: 'https://www.jumbo.cl/despensa/aceites-sal-y-condimentos', pages: 14 },
    { link: 'https://www.jumbo.cl/despensa/conservas', pages: 9 },
    { link: 'https://www.jumbo.cl/despensa/harina-y-complementos', pages: 3 },
    { link: 'https://www.jumbo.cl/frutas-y-verduras/frutas', pages: 2 },
    { link: 'https://www.jumbo.cl/frutas-y-verduras/verduras', pages: 8 },
    { link: 'https://www.jumbo.cl/frutas-y-verduras/frutos-secos-y-semillas', pages: 4 },
    { link: 'https://www.jumbo.cl/pescaderia/pescados', pages: 2 },
    { link: 'https://www.jumbo.cl/pescaderia/camarones', pages: 1 },
    { link: 'https://www.jumbo.cl/pescaderia/mariscos', pages: 1 },
    { link: 'https://www.jumbo.cl/pescaderia/ahumados-y-carpaccios', pages: 1 },
    { link: 'https://www.jumbo.cl/carniceria/vacuno', pages: 4 },
    { link: 'https://www.jumbo.cl/carniceria/cerdo', pages: 2 },
    { link: 'https://www.jumbo.cl/carniceria/pavo', pages: 1 },
    { link: 'https://www.jumbo.cl/carniceria/pollo', pages: 2 },
];
loadCategories(urlList);