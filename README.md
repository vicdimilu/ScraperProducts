# Scraper de Productos de Jumbo

Este proyecto es una aplicación en TypeScript que extrae productos de la página web de Jumbo y los organiza en un archivo JSON. El scraper navega por varias categorías y subcategorías de productos, obteniendo información como el nombre del producto, cantidad, marca y precio.

## Características

- **Scraping de múltiples páginas**: La aplicación puede navegar por varias páginas de una misma categoría para obtener todos los productos.
- **Organización en JSON**: Los productos obtenidos se guardan en un archivo JSON estructurado por categorías y subcategorías.
- **Uso de TypeScript**: El proyecto está completamente tipado usando TypeScript para asegurar la robustez y facilitar el mantenimiento.

## Requisitos

- Node.js (v20 o superior)
- npm o yarn

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio
   
2. **Instalar dependencias**:
    ```bash
    npm install
    ```

## Uso
1. **Configura las URL de las categorías**: Las URLs de las categorías y el número de páginas a recorrer se configuran en el archivo scrapeProducts.ts dentro de la variable urlList.

2. **Ejecuta la aplicación**:
    ```bash
    npm start
    ```
3. **Ver los resultados**: Los productos extraídos se guardarán en un archivo productos.json en el directorio raíz del proyecto.

## Estructura del Proyecto
``` bash
├── src
│   ├── scrapeProducts.ts  # Script principal que ejecuta el scraping y guarda los datos
├── productos.json          # Archivo JSON generado con los productos
├── package.json            # Dependencias del proyecto y scripts de npm
├── tsconfig.json           # Configuración de TypeScript
├── README.md               # Documentación del proyecto
```

## Contribución
Las contribuciones son bienvenidas. Si tienes alguna mejora o sugerencia, por favor abre un issue o un pull request en el repositorio.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.