// Importa el archivo languages.js que contiene un objeto con los idiomas y sus valores
import languages from "./languages.js";

const selectFirst = document.querySelector(".first");  // Selector para el primer select de idiomas (origen)
const selectSecond = document.querySelector(".second"); // Selector para el segundo select de idiomas (destino)
const translate = document.querySelector(".translate"); // Botón para realizar la traducción
const fromText = document.querySelector(".fromText"); // Área de texto para ingresar el texto a traducir
const toText = document.querySelector(".toText");     // Área de texto donde se muestra el texto traducido
const change = document.getElementById("change");      // Botón para cambiar los idiomas seleccionados
const reades = document.querySelectorAll(".read");     // Botones para leer el texto en voz alta
const listen = document.querySelector(".listen");      // Botón para iniciar el reconocimiento de voz
const language1 = "es-ES";  // Idioma predeterminado para el primer selector (español)
const language2 = "en-GB";  // Idioma predeterminado para el segundo selector (inglés)

// Rellena los selectores de idiomas con las opciones disponibles en el archivo 'languages.js'
for(const i in languages){
    const key = Object.keys(languages[i]).toString(); // Extrae el código del idioma
    const value = Object.values(languages[i]).toString(); // Extrae el nombre del idioma
    // Agrega las opciones de idioma en ambos selectores
    selectFirst.innerHTML += `<option value=${key}>${value}</option>`;
    selectSecond.innerHTML += `<option value=${key}>${value}</option>`;
}

// Establece los valores predeterminados de los selectores de idiomas
selectFirst.value = language1;
selectSecond.value = language2;

// Funcionalidad para intercambiar los idiomas seleccionados
change.addEventListener("click", _ => {
    // Intercambia los valores de los selectores de idiomas
    const selectFirstValue = selectFirst.value;
    selectFirst.value = selectSecond.value;
    selectSecond.value = selectFirstValue;

    // Si no hay texto traducido, no realiza nada
    if (!toText.value) return;

    // Intercambia los textos entre las áreas de texto
    const fromTextValue = fromText.value;
    fromText.value = toText.value;
    toText.value = fromTextValue;
});

// Funcionalidad para traducir el texto
translate.addEventListener("click", async _ => {
    // Verifica que haya texto en el campo 'fromText' para traducir
    if (!fromText.value) return;

    // Realiza la solicitud a la API de traducción (MyMemory)
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${selectFirst.value}|${selectSecond.value}`);
    const data = await res.json(); // Parsea la respuesta JSON

    // Inserta el texto traducido en el campo 'toText'
    toText.value = data.responseData.translatedText;
});

// Añade un evento de clic a los botones de lectura de texto (tanto el texto de origen como el de destino)
reades.forEach((read, index) => {
    read.addEventListener("click", _ => {
        // Selecciona el texto que se debe leer en voz alta (dependiendo del índice)
        const textToRead = index == 0 ? fromText.value : toText.value;

        // Si no hay texto para leer, no hace nada
        if (!textToRead) return;

        // Usamos la API de SpeechSynthesis para leer el texto en voz alta
        speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead));
    });
});

// Inicia el reconocimiento de voz cuando el usuario hace clic en el botón "listen (escuchar)"
listen.addEventListener("click", _ => {
    recognition.start(); // Comienza el reconocimiento de voz
});
