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