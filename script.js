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

        // Llamar a la API de Google Books
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
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

                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const title = item.volumeInfo.title || 'Sin título';
                        const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconocido';
                        const firstPublishYear = item.volumeInfo.publishedDate || 'Año desconocido';
                        const imageUrl = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'img/default-cover.jpg'; // Imagen por defecto si no hay
                        const bookUrl = item.volumeInfo.infoLink; // URL de detalles del libro

                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <img src="${imageUrl}" alt="${title}" style="width:100px; height:auto;"/>
                            <h3>${title}</h3>
                            <p><strong>Autor(es):</strong> ${author}</p>
                            <p><strong>Año de publicación:</strong> ${firstPublishYear}</p>
                            <a href="${bookUrl}" target="_blank">Ver más detalles</a> <!-- Enlace para ver el libro -->
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


// API buscar película 
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        searchMovies(query);
    });

    document.getElementById('clearSearch').addEventListener('click', () => {
        document.getElementById('search-input').value = ''; // Limpiar el campo de búsqueda
        document.getElementById('results').innerHTML = ''; // Limpiar los resultados
    });

    async function searchMovies(query) {
        const apiKey = 'd27d9092784c8a305f1ca2f1cfcd8f2d'; // Reemplaza con tu clave de API
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-ES`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayResults(movies) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (movies.length === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron películas.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const title = document.createElement('h3');
            title.textContent = movie.title;

            const overview = document.createElement('p');
            overview.textContent = movie.overview;

            const posterPath = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
                : 'img/default-cover.jpg'; // Imagen por defecto si no hay

            const posterImage = document.createElement('img');
            posterImage.src = posterPath;
            posterImage.alt = movie.title;

            const movieLink = document.createElement('a');
            movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
            movieLink.target = '_blank'; 
            movieLink.textContent = 'Ver más detalles en TMDB';

            movieDiv.appendChild(posterImage);
            movieDiv.appendChild(title);
            movieDiv.appendChild(overview);
            movieDiv.appendChild(movieLink); 
            resultsDiv.appendChild(movieDiv);
        });
    }
});


//API clima 
const weatherForm = document.getElementById('weatherForm');
        const resultsContainer = document.getElementById('weatherResults');

        if (weatherForm) {
            weatherForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

                // Intentar obtener la ubicación del dispositivo
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error);
                } else {
                    resultsContainer.innerHTML = '<p>Geolocalización no es soportada en este navegador.</p>';
                }
            });
        }

        // Función de éxito para la geolocalización
        function success(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Llamar a la API de WeatherAPI con las coordenadas
            fetch(`https://api.weatherapi.com/v1/current.json?key=ca7cf7efc1124b40bfe21855241712&q=${lat},${lon}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la red');
                    }
                    return response.json();
                })
                .then(data => {
                    resultsContainer.innerHTML = ''; // Limpiar resultados previos

                    if (data) {
                        const location = data.location.name;
                        const temperature = data.current.temp_c;
                        const condition = data.current.condition.text;
                        const icon = data.current.condition.icon;

                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <h3>Clima en ${location}</h3>
                            <p><strong>Temperatura:</strong> ${temperature} °C</p>
                            <p><strong>Condición:</strong> ${condition}</p>
                            <img src="${icon}" alt="${condition}" />
                        `;
                        resultsContainer.appendChild(resultItem);
                    } else {
                        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error al buscar el clima:', error);
                    resultsContainer.innerHTML = '<p>Ocurrió un error al buscar el clima.</p>'; // Mensaje de error
                });
        }

        // Función de error para la geolocalización
        function error() {
            resultsContainer.innerHTML = '<p>No se pudo obtener la ubicación.</p>';
        }