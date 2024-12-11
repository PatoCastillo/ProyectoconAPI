 // Lista de imágenes para el fondo
 const imagenes = [
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg'
];

let currentIndex = 0;

// Función para cambiar la imagen de fondo
function cambiarFondo() {
    const layers = document.querySelectorAll('.background-layer');

    if (layers.length === 0) {
        console.error('No hay capas de fondo disponibles.');
        return;
    }

    // Ocultar la capa actual
    layers.forEach(layer => {
        layer.style.opacity = 0;
    });

    // Mostrar la siguiente capa
    layers[currentIndex].style.backgroundImage = `url(${imagenes[currentIndex]})`;
    layers[currentIndex].style.opacity = 1;

    // Actualizar el índice para la próxima imagen
    currentIndex = (currentIndex + 1) % imagenes.length;
}

// Cambiar imagen cada 10 segundos
setInterval(cambiarFondo, 10000);

// Cambiar la imagen al cargar la página por primera vez
cambiarFondo();

//API buscar libro 
document.getElementById('bookSearchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const query = document.getElementById('searchQuery').value;
    console.log("Buscando libros para:", query); // Verifica el valor de búsqueda
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>Buscando...</p>'; // Mensaje de carga

    // Llamar a la API de Open Library
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
        .then(response => {
            console.log("Respuesta de la API:", response); // Verifica la respuesta
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data); // Verifica los datos obtenidos
            resultsContainer.innerHTML = ''; // Limpiar resultados previos

            if (data.docs && data.docs.length > 0) {
                data.docs.forEach(book => {
                    const title = book.title || 'Sin título';
                    const author = book.author_name ? book.author_name.join(', ') : 'Autor desconocido';
                    const firstPublishYear = book.first_publish_year || 'Año desconocido';

                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `
                        <h3>${title}</h3>
                        <p><strong>Autor(es):</strong> ${author}</p>
                        <p><strong>Año de publicación:</strong> ${firstPublishYear}</p>
                    `;
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            }
        })
        .catch(error => {
            console.error('Error al buscar libros:', error);
            resultsContainer.innerHTML = '<p>Ocurrió un error al buscar libros.</p>'; // Mensaje de error
        });
});

