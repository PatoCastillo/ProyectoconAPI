// Definición de la clave de la API y la URL base para acceder al servicio de Last.fm
const API_KEY = '83f737cbaaa842295eb721256ab26ad0'; 
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

// Función asincrónica para buscar canciones a través de la API de Last.fm
async function searchTracks() {
    // Obtiene el valor de la búsqueda introducida por el usuario
    const query = document.getElementById('searchQuery').value;

    // Crea la URL de la solicitud API usando el término de búsqueda y la clave de la API
    const url = `${API_URL}?method=track.search&track=${query}&api_key=${API_KEY}&format=json`;

    try {
        // Realiza la solicitud HTTP GET a la API
        const response = await fetch(url);
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        // Llama a la función para mostrar los resultados de la búsqueda
        displayResults(data.results.trackmatches.track);
    } catch (error) {
        // Si ocurre algún error en la solicitud, se muestra en la consola
        console.error('Error al obtener datos de Last.fm:', error);
    }
}

// Función para mostrar los resultados de la búsqueda en la interfaz
function displayResults(tracks) {
    // Obtiene el contenedor donde se mostrarán los resultados
    const container = document.getElementById('resultsContainer');
    // Limpia el contenido previo del contenedor
    container.innerHTML = '';

    // Si no se encontraron canciones, muestra un mensaje
    if (tracks.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // Itera sobre los resultados obtenidos
    tracks.forEach(track => {
        // Crea un nuevo elemento para cada canción
        const trackElement = document.createElement('div');
        // Añade la clase 'result' al nuevo elemento para darle formato
        trackElement.classList.add('result');

        // Obtiene la URL de la imagen de la canción (la de mayor resolución si está disponible)
        const imageUrl = track.image[2] ? track.image[2]['#text'] : 'https://via.placeholder.com/300';

        // Establece el contenido HTML del elemento con la imagen, nombre de la canción, artista y enlace
        trackElement.innerHTML = `
            <img src="${imageUrl}" alt="${track.name}" style="width: 100%; height: auto; border-radius: 8px;">
            <h3>${track.name}</h3>
            <p>Artista: ${track.artist}</p>
            <a href="${track.url}" target="_blank">Ver más de esta canción</a>
        `;

        // Añade el nuevo elemento al contenedor de resultados
        container.appendChild(trackElement);
    });
}


