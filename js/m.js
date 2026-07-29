
const muteBtn = document.getElementById("mute-btn");
const musicIframe = document.getElementById("bg-music");

let paused = localStorage.getItem("paused") === "true";

// Cambiar ícono según estado
muteBtn.textContent = paused ? "🔇" : "🔊";

// Función para enviar mensaje al iframe de SoundCloud
function postSCMessage(cmd) {
    musicIframe.contentWindow.postMessage(JSON.stringify({ method: cmd }), '*');
}

// Botón pausa/reanudar
muteBtn.addEventListener('click', () => {
    paused = !paused;
    postSCMessage(paused ? 'pause' : 'play');
    muteBtn.textContent = paused ? "🔇" : "🔊";
    localStorage.setItem("paused", paused);
});

// Intentar autoplay al cargar (requiere interacción si navegador bloquea)
window.addEventListener('load', () => {
    if (!paused) {
        postSCMessage('play');
        document.body.addEventListener('click', () => postSCMessage('play'), { once: true });
    }
});
