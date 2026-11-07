document.addEventListener("DOMContentLoaded", () => {
    // Variables de pantallas
    const screenIntro = document.getElementById("screen-intro");
    const screenEnvelope = document.getElementById("screen-envelope");
    const screenLetter = document.getElementById("screen-letter");

    // Variables de elementos interactivos
    const btnContinue = document.getElementById("btn-continue");
    const envelope = document.getElementById("envelope");
    const starsBg = document.getElementById("stars-bg");
    
    // Variables del Modal
    const modal = document.getElementById("photo-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-btn");
    const bigStars = document.querySelectorAll(".big-star");

    // 1. De Introducción a Sobre
    btnContinue.addEventListener("click", () => {
        screenIntro.classList.remove("active");
        setTimeout(() => {
            screenEnvelope.classList.add("active");
        }, 1000); // Espera a que termine el fade out
    });

    // 2. Abrir el Sobre y pasar a la Carta
    envelope.addEventListener("click", () => {
        // Añade la clase para voltear la solapa
        envelope.classList.add("open");
        
        // Espera 1.5 segundos para que se vea la animación y luego cambia de pantalla
        setTimeout(() => {
            screenEnvelope.classList.remove("active");
            
            setTimeout(() => {
                screenLetter.classList.add("active");
                generateStars(); // Crea el fondo estrellado al entrar
            }, 1000);
        }, 1500);
    });

    // 3. Generador de estrellas de fondo para la pantalla final
    function generateStars() {
        starsBg.innerHTML = ""; // Limpiar por si acaso
        const numStars = 80; // Cantidad de estrellitas pequeñas
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star-bg");
            
            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Tamaño aleatorio (entre 1px y 3px)
            const size = Math.random() * 2 + 1;
            
            // Duración de la animación aleatoria para que no parpadeen juntas
            const duration = Math.random() * 2 + 1.5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            
            starsBg.appendChild(star);
        }
    }

    // 4. Lógica de las Estrellas Grandes (Fotografías)
    bigStars.forEach(star => {
        star.addEventListener("click", () => {
            // Toma la ruta de la imagen desde el atributo data-src
            const imageSrc = star.getAttribute("data-src");
            modalImg.src = imageSrc;
            modal.classList.add("active");
        });
    });

    // Cerrar el Modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Cerrar el modal tocando fuera de la imagen
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});