gsap.registerPlugin(ScrollTrigger);

/* ---------- Helpers ---------- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

ScrollTrigger.config({
    ignoreMobileResize: true,
    fastScrollEnd: true
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

/* ---------- Animaciones responsive con matchMedia ---------- */
ScrollTrigger.matchMedia({

    // ====== Desktop/Tablet ======
    "(min-width: 769px)": function () {
        if (prefersReducedMotion) return;

        gsap.timeline({
            scrollTrigger: {
                id: "introFade",
                trigger: "#inicio",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true
            }
        }).to(".intro-title, .intro-box", {
            autoAlpha: 0,
            y: -100,
            ease: "power2.inOut"
        }, 0.1);

        gsap.utils.toArray(".panel").forEach((panel, i) => {
            if (i === 0) return;

            gsap.fromTo(panel, {
                scale: 1.06,
                autoAlpha: 0
            }, {
                scale: 1,
                autoAlpha: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 85%",
                    end: "center 45%",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            const contentBox = panel.querySelector(".content-box");
            if (contentBox) {
                gsap.fromTo(contentBox, {
                    y: 90,
                    autoAlpha: 0
                }, {
                    y: 0,
                    autoAlpha: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 80%",
                        end: "center 45%",
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            }
        });
    },

    // ====== Mobile ======
    "(max-width: 768px)": function () {

        gsap.to(".intro-title, .intro-box", {
            autoAlpha: 0,
            y: -60,
            ease: "power2.out",
            scrollTrigger: {
                id: "introFade",
                trigger: "#inicio",
                start: "top top",
                end: "bottom top",
                scrub: prefersReducedMotion ? false : 0.5,
                invalidateOnRefresh: true
            }
        });

        gsap.utils.toArray(".panel").forEach((panel, i) => {
            if (i === 0) return;

            gsap.fromTo(panel, {
                autoAlpha: 0,
                scale: 1.03
            }, {
                autoAlpha: 1,
                scale: 1,
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: "power2.out",
                overwrite: "auto",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 90%",
                    toggleActions: prefersReducedMotion ? "play none none none" : "play none none reverse",
                    invalidateOnRefresh: true
                }
            });

            const contentBox = panel.querySelector(".content-box");
            if (contentBox) {
                gsap.fromTo(contentBox, {
                    y: 40,
                    autoAlpha: 0
                }, {
                    y: 0,
                    autoAlpha: 1,
                    duration: prefersReducedMotion ? 0 : 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 88%",
                        toggleActions: prefersReducedMotion ? "play none none none" : "play none none reverse",
                        invalidateOnRefresh: true
                    }
                });
            }
        });
    }
});

/* ---------- Click del logo: volver al inicio + resetear intro ---------- */
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("click", (e) => {
        e.preventDefault();

        const inicio = document.querySelector("#inicio");
        if (!inicio) return;

        inicio.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });

        // Espera a que el smooth scroll se complete y resetea intro
        window.setTimeout(() => {
            gsap.set(".intro-title, .intro-box", {
                autoAlpha: 1,
                y: 0
            });

            const st = ScrollTrigger.getById("introFade");
            if (st) st.progress(0);

            ScrollTrigger.refresh();
            ScrollTrigger.update();
        }, prefersReducedMotion ? 0 : 850);
    });
}