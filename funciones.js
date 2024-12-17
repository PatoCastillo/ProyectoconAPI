// URL de las APIs
const API_MERCADOLIBRE = 'https://api.mercadolibre.com/sites/MLM/search?q='; // API de MercadoLibre para México
const API_DUMMY = 'https://dummyjson.com/products/search?q='; // API ficticia DummyJSON para pruebas

// Función para buscar productos
async function searchProducts() {
    // Obtiene el término de búsqueda desde el input
    const query = document.getElementById('searchQuery').value.trim();

    // Si no se ingresa un término de búsqueda, muestra una alerta y termina la ejecución
    if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    try {
        // Llamada a la API de MercadoLibre
        const responseML = await fetch(`${API_MERCADOLIBRE}${encodeURIComponent(query)}`);
        const dataML = await responseML.json(); // Convierte la respuesta a JSON

        // Llamada a la API de DummyJSON
        const responseDummy = await fetch(`${API_DUMMY}${encodeURIComponent(query)}`);
        const dataDummy = await responseDummy.json(); // Convierte la respuesta a JSON

        // Combina los resultados de ambas APIs y los muestra
        const combinedResults = combineResults(dataML.results, dataDummy.products);
        displayResults(combinedResults); // Llama a la función para mostrar los resultados
    } catch (error) {
        console.error('Error al obtener los datos:', error); // Muestra el error en consola si ocurre
    }
}

// Función para combinar los resultados de ambas APIs
function combineResults(mlResults, dummyResults) {
    const combined = []; // Array para almacenar los productos combinados

    // Formatea los resultados de MercadoLibre
    mlResults.forEach(product => {
        combined.push({
            title: product.title, // Título del producto
            price: product.price, // Precio del producto
            image: product.thumbnail, // Imagen del producto
            link: product.permalink, // Enlace al producto
            source: 'MercadoLibre' // Fuente del producto
        });
    });

    // Formatea los resultados de DummyJSON
    dummyResults.forEach(product => {
        combined.push({
            title: product.title, // Título del producto
            price: product.price, // Precio del producto
            image: product.thumbnail, // Imagen del producto
            link: `https://dummyjson.com/product/${product.id}`, // Enlace al producto
            source: 'DummyJSON' // Fuente del producto
        });
    });

    return combined; // Devuelve el array de productos combinados
}

// Función para mostrar los productos en la página
function displayResults(products) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = ''; // Limpiar los resultados anteriores

    // Si no se encuentran productos, muestra un mensaje
    if (products.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // Ordena los productos por precio (de menor a mayor)
    products.sort((a, b) => a.price - b.price);

    // Muestra cada producto
    products.forEach(product => {
        const productElement = document.createElement('div'); // Crea un nuevo contenedor para el producto
        productElement.classList.add('product'); // Añade la clase 'product' para estilizar

        // Añade el contenido HTML del producto al contenedor
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}"> <!-- Imagen del producto -->
            <h2>${product.title}</h2> <!-- Título del producto -->
            <p><strong>Precio:</strong> $${product.price}</p> <!-- Precio del producto -->
            <p><strong>Fuente:</strong> ${product.source}</p> <!-- Fuente de donde proviene el producto -->
            <a href="${product.link}" target="_blank">Ver producto</a> <!-- Enlace al producto -->
        `;

        // Añade el contenedor del producto al contenedor principal
        container.appendChild(productElement);
    });
}
