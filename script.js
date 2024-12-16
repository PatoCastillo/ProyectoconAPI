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

// API buscar libro 
const bookSearchForm = document.getElementById('bookSearchForm');
if (bookSearchForm) {
    bookSearchForm.addEventListener('submit', function (event) {
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
                        const coverId = book.cover_i; // ID de la portada

                        // URL de la imagen del libro
                        const imageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'img/default-cover.jpg'; // Imagen por defecto si no hay

                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <img src="${imageUrl}" alt="${title}" style="width:100px; height:auto;"/>
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
} else {
    console.error('El formulario de búsqueda de libros no se encontró.');
}

// Función para limpiar la búsqueda
document.getElementById('clearSearch').addEventListener('click', function () {
    document.getElementById('searchQuery').value = ''; // Limpiar el campo de búsqueda
    document.getElementById('results').innerHTML = ''; // Limpiar los resultados
});

// API buscar película (TMDB)
const movieSearchForm = document.getElementById('movieSearchForm');
if (movieSearchForm) {
    movieSearchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir comportamiento predeterminado del formulario

        const query = document.getElementById('searchQuery').value.trim();
        const resultsContainer = document.getElementById('results');

        // Validación básica
        if (!query) {
            resultsContainer.innerHTML = '<p>Por favor, ingresa un término de búsqueda.</p>';
            return;
        }

        resultsContainer.innerHTML = '<p>Buscando...</p>'; // Mensaje de carga

        // Llamada a TMDB API (endpoint público)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=es-ES`)
            .then(response => {
                if (!response.ok) throw new Error('Error en la red');
                return response.json();
            })
            .then(data => {
                resultsContainer.innerHTML = ''; // Limpiar resultados previos

                if (!data || !data.results || data.results.length === 0) {
                    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
                    return;
                }

                // Mostrar resultados
                data.results.forEach(movie => {
                    const title = movie.title || 'Sin título';
                    const year = movie.release_date ? movie.release_date.split('-')[0] : 'Año desconocido';
                    const poster = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : 'img/default-cover.jpg'; // Imagen por defecto si no hay

                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `
                        <img src="${poster}" alt="${title}" />
                        <h3>${title}</h3>
                        <p><strong>Año:</strong> ${year}</p>
                    `;
                    resultsContainer.appendChild(resultItem);
                });
            })
            .catch(error => {
                console.error('Error al buscar películas:', error);
                resultsContainer.innerHTML = '<p>Ocurrió un error al buscar películas.</p>';
            });
    });
} else {
    console.error('El formulario de búsqueda de películas no se encontró.');
}
