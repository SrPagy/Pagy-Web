const contenido = document.getElementById("contenido");


// Cargar secciones
async function cargarSeccion(seccion) {
    try {
        const res = await fetch(`secciones/${seccion}.html`);
        const html = await res.text();

        contenido.innerHTML = html;

        // Si cargamos la sección de redes
        if (seccion === "redes") {
            iniciarBurbujas();
        }

    } catch (e) {
        contenido.innerHTML = "<p>Error al cargar la sección 😢</p>";
    }
}

// 🚀 Navegación por hash
const textoSeccion = document.getElementById("seccion-texto");

function navegar() {
    const hash = window.location.hash.substring(1) || "inicio";

    // Actualizar texto del span según la sección
    const nombres = {
        inicio: "Inicio.html",
        descargas: "Descargas.html",
        redes: "Redes.html",
        preguntas: "Preguntas.html",
        animes:"Animes.html",
    };

    textoSeccion.textContent = nombres[hash] || "sin nombre";

    cargarSeccion(hash);
}


window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);


// Llamar al cargar la página
window.addEventListener("load", playMusic);

const btnTop = document.getElementById("btn-top");

btnTop.addEventListener("click", function() {
    
    // 1. Identificamos todos los contenedores que podrían estar haciendo scroll
    const cajaContenido = document.getElementById("contenido");
    const cajaMedio = document.querySelector(".medio");
    const cajaContenedor = document.querySelector(".contenedor");

    // 2. Le ordenamos a todos que suban suavemente (el que no tenga scroll simplemente ignorará la orden)
    if (cajaContenido) {
        cajaContenido.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    if (cajaMedio) {
        cajaMedio.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    if (cajaContenedor) {
        cajaContenedor.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 3. Y por si acaso, también se lo ordenamos a la ventana principal
    window.scrollTo({ top: 0, behavior: "smooth" });
});


function iniciarBurbujas() {

    document.querySelectorAll(".vita-bubble").forEach(bubble => {

        bubble.addEventListener("mousemove", e => {

            const rect = bubble.getBoundingClientRect();

            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const rotateY = (x - 50) / 4;
            const rotateX = (50 - y) / 4;

            bubble.style.transform =
            `perspective(600px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

            // Mover el brillo
            bubble.style.setProperty("--shine-x", `${x}%`);
            bubble.style.setProperty("--shine-y", `${y}%`);
        });

        bubble.addEventListener("mouseleave", () => {

            bubble.style.transform =
            "perspective(600px) rotateX(0deg) rotateY(0deg)";

            bubble.style.setProperty("--shine-x", "30%");
            bubble.style.setProperty("--shine-y", "25%");
        });

    });

}