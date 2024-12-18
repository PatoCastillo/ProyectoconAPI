// Lista de imágenes para el fondo
const imagenes = [
    'img/1.jpg', // Ruta de la primera imagen
    'img/2.jpg', // Ruta de la segunda imagen
    'img/3.jpg', // Ruta de la tercera imagen
    'img/4.jpg',  // Ruta de la cuarta imagen
    'img/5.jpg',  // Ruta de la quinta imagen
    'img/6.jpg',  // Ruta de la sexta imagen
    'img/7.jpg'  // Ruta de la septima imagen
];

let currentIndex = 0; // Índice actual de la imagen que se muestra

// Función para cambiar la imagen de fondo
function cambiarFondo() {
    const layers = document.querySelectorAll('.background-layer'); // Selecciona todas las capas de fondo

    if (layers.length === 0) { // Verifica si hay capas disponibles
        console.error('No hay capas de fondo disponibles.'); // Muestra un error en la consola si no hay capas
        return; // Sale de la función si no hay capas
    }

    // Ocultar la capa actual
    layers.forEach(layer => {
        layer.style.opacity = 0; // Establece la opacidad de cada capa a 0 (oculta)
    });

    // Mostrar la siguiente capa
    layers[currentIndex].style.backgroundImage = `url(${imagenes[currentIndex]})`; // Establece la imagen de fondo de la capa actual
    layers[currentIndex].style.opacity = 1; // Hace visible la capa actual

    // Actualizar el índice para la próxima imagen
    currentIndex = (currentIndex + 1) % imagenes.length; // Incrementa el índice y lo reinicia si excede el número de imágenes
}

// Cambiar imagen cada 10 segundos
setInterval(cambiarFondo, 10000); // Llama a la función cambiarFondo cada 10 segundos

// Cambiar la imagen al cargar la página por primera vez
cambiarFondo(); // Llama a la función para mostrar la primera imagen

// API buscar libro 
const bookSearchForm = document.getElementById('bookSearchForm'); // Selecciona el formulario de búsqueda de libros
if (bookSearchForm) { // Verifica si el formulario existe
    bookSearchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const query = document.getElementById('searchQuery').value; // Obtiene el valor de búsqueda ingresado
        console.log("Buscando libros para:", query); // Muestra en consola el valor de búsqueda
        const resultsContainer = document.getElementById('results'); // Selecciona el contenedor de resultados
        resultsContainer.innerHTML = '<p>Buscando...</p>'; // Mensaje de carga mientras se busca

        // Llamar a la API de Google Books
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`) // Realiza la solicitud a la API
            .then(response => {
                console.log("Respuesta de la API:", response); // Muestra la respuesta de la API en consola
                if (!response.ok) { // Verifica si la respuesta es correcta
                    throw new Error('Error en la red'); // Lanza un error si hay un problema
                }
                return response.json(); // Convierte la respuesta a formato JSON
            })
            .then(data => {
                console.log("Datos recibidos:", data); // Muestra los datos obtenidos en consola
                resultsContainer.innerHTML = ''; // Limpia los resultados previos

                if (data.items && data.items.length > 0) { // Verifica si hay elementos en los datos
                    data.items.forEach(item => { // Itera sobre cada elemento
                        const title = item.volumeInfo.title || 'Sin título'; // Obtiene el título o establece 'Sin título'
                        const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconocido'; // Obtiene los autores o establece 'Autor desconocido'
                        const firstPublishYear = item.volumeInfo.publishedDate || 'Año desconocido'; // Obtiene el año de publicación o establece 'Año desconocido'
                        const imageUrl = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'img/default-cover.jpg'; // Obtiene la imagen o establece una por defecto
                        const bookUrl = item.volumeInfo.infoLink; // Obtiene la URL de detalles del libro

                        const resultItem = document.createElement('div'); // Crea un nuevo div para el resultado
                        resultItem.className = 'result-item'; // Establece la clase del div
                        resultItem.innerHTML = `
                            <img src="${imageUrl}" alt="${title}" style="width:100px; height:auto;"/> <!-- Imagen del libro -->
                            <h3>${title}</h3> <!-- Título del libro -->
                            <p><strong>Autor(es):</strong> ${author}</p> <!-- Autores del libro -->
                            <p><strong>Año de publicación:</strong> ${firstPublishYear}</p> <!-- Año de publicación -->
                            <a href="${bookUrl}" target="_blank">Ver más detalles</a> <!-- Enlace para ver el libro -->
                        `;
                        resultsContainer.appendChild(resultItem); // Agrega el resultado al contenedor
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>'; // Mensaje si no hay resultados
                }
            })
            .catch(error => {
                console.error('Error al buscar libros:', error); // Muestra el error en consola
                resultsContainer.innerHTML = '<p>Ocurrió un error al buscar libros.</p>'; // Mensaje de error
            });
    });
} else {
    console.error('El formulario de búsqueda de libros no se encontró.'); // Mensaje de error si no se encuentra el formulario
}

// Función para limpiar la búsqueda
document.getElementById('clearSearch').addEventListener('click', function () {
    document.getElementById('searchQuery').value = ''; // Limpia el campo de búsqueda
    document.getElementById('results').innerHTML = ''; // Limpia los resultados
});

// API buscar película 
document.addEventListener('DOMContentLoaded', () => { // Espera a que el contenido del DOM esté cargado
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const query = document.getElementById('search-input').value; // Obtiene el valor de búsqueda ingresado
        searchMovies(query); // Llama a la función para buscar películas
    });

    document.getElementById('clearSearch').addEventListener('click', () => {
        document.getElementById('search-input').value = ''; // Limpia el campo de búsqueda
        document.getElementById('results').innerHTML = ''; // Limpia los resultados
    });

    async function searchMovies(query) { // Función asíncrona para buscar películas
        const apiKey = 'd27d9092784c8a305f1ca2f1cfcd8f2d'; // Clave de API para la búsqueda de películas
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-ES`; // URL para la API de búsqueda

        try {
            const response = await fetch(url); // Realiza la solicitud a la API
            if (!response.ok) { // Verifica si la respuesta es correcta
                throw new Error('Error en la solicitud'); // Lanza un error si hay un problema
            }
            const data = await response.json(); // Convierte la respuesta a formato JSON
            displayResults(data.results); // Llama a la función para mostrar los resultados
        } catch (error) {
            console.error('Error:', error); // Muestra el error en consola
        }
    }

    function displayResults(movies) { // Función para mostrar los resultados de películas
        const resultsDiv = document.getElementById('results'); // Selecciona el contenedor de resultados
        resultsDiv.innerHTML = ''; // Limpia los resultados previos

        if (movies.length === 0) { // Verifica si no hay películas
            resultsDiv.innerHTML = '<p>No se encontraron películas.</p>'; // Mensaje si no se encuentran películas
            return; // Sale de la función
        }

        movies.forEach(movie => { // Itera sobre cada película
            const movieDiv = document.createElement('div'); // Crea un nuevo div para la película
            movieDiv.classList.add('movie'); // Establece la clase del div

            const title = document.createElement('h3'); // Crea un elemento h3 para el título
            title.textContent = movie.title; // Establece el texto del título

            const overview = document.createElement('p'); // Crea un elemento p para la descripción
            overview.textContent = movie.overview; // Establece el texto de la descripción

            const posterPath = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` // URL de la imagen del póster
                : 'img/default-cover.jpg'; // Imagen por defecto si no hay póster

            const posterImage = document.createElement('img'); // Crea un elemento img para el póster
            posterImage.src = posterPath; // Establece la fuente de la imagen
            posterImage.alt = movie.title; // Establece el texto alternativo de la imagen

            const movieLink = document.createElement('a'); // Crea un enlace para ver más detalles
            movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`; // Establece la URL del enlace
            movieLink.target = '_blank'; // Abre el enlace en una nueva pestaña
            movieLink.textContent = 'Ver más detalles en TMDB'; // Texto del enlace

            movieDiv.appendChild(posterImage); // Agrega la imagen del póster al div de la película
            movieDiv.appendChild(title); // Agrega el título al div de la película
            movieDiv.appendChild(overview); // Agrega la descripción al div de la película
            movieDiv.appendChild(movieLink); // Agrega el enlace al div de la película
            resultsDiv.appendChild(movieDiv); // Agrega el div de la película al contenedor de resultados
        });
    }
});

// API clima 
document.addEventListener('DOMContentLoaded', () => { // Espera a que el contenido del DOM esté cargado
    const weatherForm = document.getElementById('weatherForm'); // Selecciona el formulario de clima
    const resultsContainer = document.getElementById('weatherResults'); // Selecciona el contenedor de resultados del clima
    const apiKey = 'ca7cf7efc1124b40bfe21855241712'; // Clave de API para la búsqueda del clima

    if (weatherForm) { // Verifica si el formulario existe
        weatherForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

            const query = document.getElementById('searchQuery').value; // Obtener la ciudad a buscar
            console.log("Buscando clima para:", query); // Mensaje de depuración

            // Llamar a la API de WeatherAPI con el parámetro de idioma en español
            fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&lang=es`) // Agrega &lang=es para español
                .then(response => {
                    console.log("Respuesta de búsqueda de ciudad:", response); // Mensaje de depuración
                    if (!response.ok) { // Verifica si la respuesta es correcta
                        throw new Error('Error en la red'); // Lanza un error si hay un problema
                    }
                    return response.json(); // Convierte la respuesta a formato JSON
                })
                .then(data => {
                    console.log("Datos del clima:", data); // Mensaje de depuración
                    resultsContainer.innerHTML = ''; // Limpia resultados previos

                    const location = data.location.name; // Obtiene el nombre de la ubicación
                    const temperature = data.current.temp_c; // Obtiene la temperatura actual en °C
                    const condition = data.current.condition.text; // Obtiene la condición del clima
                    const iconClass = getWeatherIconClass(data.current.condition.code); // Obtiene la clase del icono

                    const resultItem = document.createElement('div'); // Crea un nuevo div para el resultado del clima
                    resultItem.className = 'result-item'; // Establece la clase del div
                    resultItem.innerHTML = `
                        <h2>Clima en ${location}</h2> <!-- Muestra la ubicación -->
                        <p><strong>Temperatura:</strong> ${temperature} °C</p> <!-- Muestra la temperatura -->
                        <p><strong>Condición:</strong> ${condition}</p> <!-- Muestra la condición del clima -->
                        <i class="wi ${iconClass}"></i> <!-- Muestra el icono del clima -->
                    `;
                    resultsContainer.appendChild(resultItem); // Agrega el resultado al contenedor
                })
                .catch(error => {
                    console.error('Error al buscar el clima:', error); // Muestra el error en consola
                    resultsContainer.innerHTML = '<p>Ocurrió un error al buscar el clima.</p>'; // Mensaje de error
                });
        });
    } else {
        console.error('El formulario de búsqueda de clima no se encontró.'); // Mensaje de error si no se encuentra el formulario
    }
});

// Función para obtener la clase del icono según el código de condición
function getWeatherIconClass(code) {
    if (code === 1000) return 'wi-day-sunny'; // Soleado
    if (code === 1003) return 'wi-day-cloudy'; // Parcialmente nublado
    if (code === 1006) return 'wi-cloudy'; // Nublado
    if (code === 1009) return 'wi-cloud'; // Muy nublado
    if (code >= 1030 && code <= 1135) return 'wi-fog'; // Niebla
    if (code >= 2000 && code <= 2003) return 'wi-day-sunny'; // Tormentas
    if (code >= 3000 && code <= 3003) return 'wi-snow'; // Nieve
    // Agrega más condiciones según sea necesario
    return 'wi-na'; // No disponible
}
