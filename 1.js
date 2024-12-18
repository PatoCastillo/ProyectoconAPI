let map; // Variable para almacenar el objeto del mapa
let trafficLayer; // Variable para la capa de tráfico

// Función para inicializar el mapa
function initMap() {
    const guatemalaCity = { lat: 14.6349, lng: -90.5069 }; // Coordenadas de Ciudad de Guatemala (Latitud y Longitud)

    // Crear el mapa con las opciones proporcionadas
    map = new google.maps.Map(document.getElementById('map'), {
        center: guatemalaCity, // Centrar el mapa en las coordenadas de Ciudad de Guatemala
        zoom: 12, // Establecer el nivel de zoom (12 es un valor intermedio)
        mapTypeId: 'roadmap' // Tipo de mapa, puede cambiarse a 'satellite', 'terrain' o 'hybrid'
    });

    // Crear la capa de tráfico
    trafficLayer = new google.maps.TrafficLayer(); // Instancia de la capa de tráfico
    trafficLayer.setMap(map); // Activar la capa de tráfico en el mapa, mostrando la información de tráfico en tiempo real
}

// Función para buscar el tráfico de una ciudad ingresada
function searchTraffic() {
    const city = document.getElementById('searchQuery').value.trim(); // Obtener el nombre de la ciudad desde el input

    // Verificar si el campo de búsqueda está vacío
    if (!city) {
        alert('Ingresa una ciudad.'); // Si está vacío, mostrar un mensaje de alerta
        return; // Terminar la función si no se ha ingresado una ciudad
    }

    // Limpiar cualquier capa de tráfico previa antes de hacer una nueva búsqueda
    trafficLayer.setMap(null);

    // Usar la API de Geocoding de Google para obtener las coordenadas geográficas de la ciudad
    const geocoder = new google.maps.Geocoder(); // Instancia del geocodificador

    // Realizar la geocodificación de la ciudad ingresada
    geocoder.geocode({ address: city }, function(results, status) {
        if (status === 'OK') {
            // Si la geocodificación fue exitosa, obtener las coordenadas de la ciudad
            const location = results[0].geometry.location;

            // Centrar el mapa en la nueva ubicación obtenida de la geocodificación
            map.setCenter(location);
            map.setZoom(12); // Ajusta el nivel de zoom a 12

            // Mostrar la capa de tráfico en la nueva ubicación del mapa
            trafficLayer.setMap(map);
        } else {
            // Si no se pudo geocodificar la ciudad, mostrar un mensaje de error
            alert('No se pudo encontrar la ciudad. Intenta nuevamente.');
        }
    });
}
