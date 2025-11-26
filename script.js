// Registro del plugin ScrollTrigger de GSAP para usar animaciones basadas en el scroll
gsap.registerPlugin(ScrollTrigger);

/* ---------- Scroll suave + restaurar intro al hacer clic en el logo ---------- */
document.querySelector('.logo').addEventListener('click', function (e) {
    e.preventDefault(); // Evita el comportamiento por defecto del enlace (salto inmediato al ancla)
    const target = document.querySelector('#inicio'); // Selecciona la sección de inicio

    // Scroll suave hacia el inicio de la página
    target.scrollIntoView({
        behavior: 'smooth'
    });

    // Restaura la visibilidad del título y recuadro de la introducción
    gsap.to(".intro-title, .intro-box", {
        autoAlpha: 1, // Hace los elementos visibles (combina visibilidad y opacidad)
        y: 0, // Restablece su posición vertical original
        ease: "power2.out", // Transición suave de desaceleración
        duration: 0.8 // Duración de la animación en segundos
    });
});

/* ---------- INTRO fade al hacer scroll ---------- */
const introTl = gsap.timeline({
    scrollTrigger: { // Crea una animación vinculada al desplazamiento (scroll)
        trigger: "#inicio", // Elemento que activa el efecto: la sección de inicio
        start: "top top", // Comienza cuando la parte superior del panel toca la parte superior de la ventana
        end: "bottom top", // Termina cuando la parte inferior del panel toca la parte superior de la ventana
        scrub: 1.2, // Sincroniza la animación con el desplazamiento (1.2 suaviza la transición)
    }
});

// Desaparece el título y el recuadro de introducción al hacer scroll hacia abajo
introTl.to(".intro-title, .intro-box", {
    autoAlpha: 0, // Reduce la opacidad a 0 y oculta los elementos
    y: -100, // Desplaza los elementos hacia arriba
    ease: "power2.inOut" // Animación con aceleración y desaceleración suave
}, 0.1); // Inicia ligeramente después del comienzo del timeline

/* ---------- ANIMACIÓN GENERAL DE CADA PANEL ---------- */
gsap.utils.toArray(".panel").forEach((panel, i) => {
    if (i === 0) return; // Omite el primer panel (intro) para no repetir animaciones innecesarias

    // 🔹 Animación del panel (fondo)
    gsap.fromTo(panel, {
        scale: 1.15, // Comienza ligeramente ampliado
        autoAlpha: 0 // Comienza invisible
    }, {
        scale: 1, // Termina en su tamaño normal
        autoAlpha: 1, // Se hace visible gradualmente
        ease: "power4.out", // Movimiento suave y natural
        scrollTrigger: { // Configuración de ScrollTrigger
            trigger: panel, // El panel actual activa la animación
            start: "top 85%", // Empieza cuando el panel entra al 85% del viewport
            end: "center 45%", // Termina cuando el centro del panel llega al 45% de la pantalla
            scrub: 1.5, // Hace que la animación siga el scroll con suavizado
        }
    });

    // 🔹 Animación del recuadro de contenido dentro de cada panel
    const contentBox = panel.querySelector(".content-box"); // Busca el recuadro dentro del panel
    if (contentBox) { // Si existe, aplica animación
        gsap.fromTo(contentBox, {
            y: 100, // Empieza desplazado hacia abajo
            autoAlpha: 0 // Empieza invisible
        }, {
            y: 0, // Se mueve a su posición original
            autoAlpha: 1, // Aparece gradualmente
            ease: "power4.out", // Movimiento fluido
            scrollTrigger: {
                trigger: panel, // Se activa al entrar el panel
                start: "top 80%", // Comienza cuando el panel está visible al 80%
                end: "center 45%", // Termina a mitad del desplazamiento
                scrub: 1.5, // Sincronización suave con el scroll
            }
        });
    }
});