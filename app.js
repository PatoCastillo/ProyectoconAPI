async function searchTracks() {
    const query = document.getElementById('searchQuery').value.trim();

    if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    // URL de la API de iTunes con el término de búsqueda
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=20`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificar si hay resultados
        if (data.results.length === 0) {
            displayNoResults();
        } else {
            displayResults(data.results);
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayResults(tracks) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = ''; // Limpiar resultados previos

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('result');

        // Destructuración de la información relevante
        const { artworkUrl100, trackName, artistName, collectionName, previewUrl } = track;

        // Crear tarjeta de resultados
        trackElement.innerHTML = `
            <img src="${artworkUrl100}" alt="${trackName}">
            <h3>${trackName}</h3>
            <p>Artista: ${artistName}</p>
            <p>Álbum: ${collectionName}</p>
            <audio controls>
                <source src="${previewUrl}" type="audio/mpeg">
                Tu navegador no soporta la reproducción de audio.
            </audio>
            <a href="${track.trackViewUrl}" target="_blank">Escuchar completo</a>
        `;

        container.appendChild(trackElement);
    });
}

function displayNoResults() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '<p>No se encontraron resultados.</p>';
}

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