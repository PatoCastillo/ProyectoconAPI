const API_KEY = '83f737cbaaa842295eb721256ab26ad0'; 
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

async function searchTracks() {
    const query = document.getElementById('searchQuery').value;
    const url = `${API_URL}?method=track.search&track=${query}&api_key=${API_KEY}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results.trackmatches.track);
    } catch (error) {
        console.error('Error al obtener datos de Last.fm:', error);
    }
}

function displayResults(tracks) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (tracks.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('result');

        // Obtener la imagen de la portada de la canción (imagen de mayor resolución)
        const imageUrl = track.image[2] ? track.image[2]['#text'] : 'https://via.placeholder.com/300';

        trackElement.innerHTML = `
            <img src="${imageUrl}" alt="${track.name}" style="width: 100%; height: auto; border-radius: 8px;">
            <h3>${track.name}</h3>
            <p>Artista: ${track.artist}</p>
            <a href="${track.url}" target="_blank">Ver más de esta canción</a>
        `;

        container.appendChild(trackElement);
    });
}

