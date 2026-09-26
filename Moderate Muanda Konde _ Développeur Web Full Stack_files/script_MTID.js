/* =========================================================
   PORTFOLIO
   SCRIPT PRINCIPAL - VERSION DYNAMIQUE
========================================================= */


/* =========================================================
   1. INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("js-ready");

    initMobileMenu();
    initDynamicAnimations();
    initHeroAnimation();
    initSmoothNavigation();
    initRippleButtons();
    initAboutButton();
    initProjectModal();
    initActiveNavigation();
    initCounters();
    initTechnologyImages();
    initProjectImages();
    initHeroImage();
    initExternalLinks();
    initCVButton();
    initFooterYear();
    initScrollProgress();

});


/* =========================================================
   2. MENU MOBILE
========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");

    if (!menuToggle || !siteNav) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = siteNav.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Fermer le menu après un clic */

    const navLinks = siteNav.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            siteNav.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================================
   3. ANIMATIONS DYNAMIQUES
========================================================= */

/*
    Ici nous ne dépendons plus uniquement
    de la classe CSS ".reveal".

    JavaScript va réellement contrôler
    l'apparition des éléments.
*/

function initDynamicAnimations() {

    const elements = document.querySelectorAll(`
        section,
        .hero-content > *,
        .hero-image-wrapper,
        .stat-card,
        .about-card,
        .project-card,
        .skill-card,
        .timeline-item,
        .contact-card,
        .social-link,
        .footer
    `);


    if (!elements.length) {
        return;
    }


    /*
        On évite d'animer certains éléments
        qui sont déjà contenus dans une animation.
    */

    const uniqueElements = [...new Set(elements)];


    /*
        On prépare chaque élément.
    */

    uniqueElements.forEach((element, index) => {

        element.dataset.dynamicAnimation = "true";

        element.style.opacity = "0";

        element.style.transform =
            "translateY(45px) scale(0.97)";

        element.style.transition =
            "opacity 700ms cubic-bezier(.22,1,.36,1), " +
            "transform 700ms cubic-bezier(.22,1,.36,1)";

        element.style.transitionDelay =
            `${Math.min(index * 45, 350)}ms`;

    });


    /*
        IntersectionObserver regarde
        quand l'élément entre dans l'écran.
    */

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const element = entry.target;


                /*
                    Petite animation différente
                    pour donner plus de vie.
                */

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0) scale(1)";


                /*
                    On arrête de surveiller
                    l'élément une fois apparu.
                */

                observerInstance.unobserve(element);

            });

        },
        {
            threshold: 0.10,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    uniqueElements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================================================
   4. ANIMATION DU HERO
========================================================= */

function initHeroAnimation() {

    const hero = document.querySelector(".hero");

    if (!hero) {
        return;
    }


    const heroElements = hero.querySelectorAll(
        ".hero-content > *, .hero-image-wrapper, .hero-badge, .floating-badge"
    );


    heroElements.forEach((element, index) => {

        element.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(35px) scale(.96)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration: 800,
                delay: 150 + index * 130,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "forwards"
            }
        );

    });

}


/* =========================================================
   5. NAVIGATION FLUIDE
========================================================= */

function initSmoothNavigation() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");


            if (!href || href === "#") {
                return;
            }


            const target = document.querySelector(href);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   6. EFFET RIPPLE DES BOUTONS
========================================================= */

function initRippleButtons() {

    const buttons = document.querySelectorAll(
        ".btn, .cv-button, .project-button, button"
    );


    buttons.forEach((button) => {

        button.addEventListener("click", function (event) {

            const rect =
                button.getBoundingClientRect();


            const ripple =
                document.createElement("span");


            ripple.className = "ripple";


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;


            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;


            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });

}


/* =========================================================
   7. BOUTON "EN SAVOIR PLUS"
========================================================= */

function initAboutButton() {

    const button =
        document.getElementById("aboutMoreButton");

    const extra =
        document.getElementById("aboutExtra");


    if (!button || !extra) {
        return;
    }


    button.addEventListener("click", () => {

        const isOpen =
            extra.classList.toggle("open");


        const icon =
            button.querySelector("i");


        /*
            Nous cherchons le texte
            du bouton sans dépendre
            de firstChild.
        */

        let textElement =
            button.querySelector(".about-button-text");


        /*
            Si le HTML n'a pas encore
            de span, on le crée.
        */

        if (!textElement) {

            textElement =
                document.createElement("span");


            textElement.className =
                "about-button-text";


            const textNodes =
                [...button.childNodes]
                    .filter(
                        node =>
                            node.nodeType === Node.TEXT_NODE &&
                            node.textContent.trim()
                    );


            if (textNodes.length) {

                textElement.textContent =
                    textNodes[0].textContent.trim();


                textNodes[0].replaceWith(
                    textElement
                );

            } else {

                button.prepend(
                    textElement
                );

            }

        }


        if (isOpen) {

            textElement.textContent =
                "Voir moins";


            if (icon) {

                icon.className =
                    "bi bi-arrow-up";

            }

        } else {

            textElement.textContent =
                "En savoir plus";


            if (icon) {

                icon.className =
                    "bi bi-arrow-right";

            }

        }

    });

}


/* =========================================================
   8. DONNÉES DES PROJETS
========================================================= */

const projects = {

    ecommerce: {

        title: "Plateforme E-Commerce",

        description:
            "Une plateforme moderne de commerce en ligne permettant de présenter des produits, rechercher des articles, gérer les utilisateurs et construire progressivement un système complet de commandes.",

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Bootstrap",
            "Python",
            "Django",
            "PostgreSQL"
        ],

        url: ""

    },


    webapp: {

        title: "Application Web",

        description:
            "Une application web moderne avec une interface responsive, des interactions JavaScript et une expérience utilisateur fluide sur ordinateur, tablette et téléphone.",

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Bootstrap",
            "Python",
            "Django",
            "Django REST Framework",
            "PostgreSQL",
        ],

        url: ""

    },


    api: {

        title: "API REST avec Django",

        description:
            "Une API REST construite avec Python et Django REST Framework permettant au frontend et à d'autres applications de communiquer avec le serveur.",

        technologies: [
            "Python",
            "Django",
            "Django REST Framework",

        ],

        url: ""

    },


    realtime: {

        title: "Application Temps Réel",

        description:
            "Une application utilisant les communications en temps réel afin de permettre aux utilisateurs d'échanger des informations sans devoir actualiser constamment la page.",

        technologies: [
            "Python",
            "Django",
            "Django Channels",
            "WebSocket",
            "JavaScript",
            "html5",
            "Css3"
        ],

        url: ""

    }

};


/* =========================================================
   9. MODALE DES PROJETS
========================================================= */

function initProjectModal() {

    const modal =
        document.getElementById("projectModal");

    const title =
        document.getElementById("modalTitle");

    const description =
        document.getElementById("modalDescription");

    const technologies =
        document.getElementById("modalTechnologies");

    const projectLink =
        document.getElementById("modalProjectLink");

    const close =
        document.getElementById("modalClose");

    const closeButton =
        document.getElementById("modalCloseButton");

    const overlay =
        document.getElementById("modalOverlay");


    if (!modal) {
        return;
    }


    const projectButtons =
        document.querySelectorAll(
            ".project-button"
        );


    projectButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const projectId =
                button.dataset.project;


            const project =
                projects[projectId];


            if (!project) {
                return;
            }


            /*
                Titre.
            */

            if (title) {

                title.textContent =
                    project.title;

            }


            /*
                Description.
            */

            if (description) {

                description.textContent =
                    project.description;

            }


            /*
                Technologies.
            */

            if (technologies) {

                technologies.innerHTML = "";


                project.technologies.forEach(
                    (technology, index) => {

                        const tag =
                            document.createElement("span");


                        tag.textContent =
                            technology;


                        tag.style.opacity = "0";

                        tag.style.transform =
                            "translateY(10px)";


                        technologies.appendChild(tag);


                        /*
                            Les technologies
                            apparaissent une par une.
                        */

                        setTimeout(() => {

                            tag.style.transition =
                                "all 350ms ease";

                            tag.style.opacity =
                                "1";

                            tag.style.transform =
                                "translateY(0)";

                        }, 100 + index * 70);

                    }
                );

            }


            /*
                Lien du projet.
            */

            if (projectLink) {

                if (project.url) {

                    projectLink.href =
                        project.url;

                    projectLink.style.display =
                        "inline-flex";

                } else {

                    projectLink.style.display =
                        "none";

                }

            }


            /*
                Affichage.
            */

            modal.classList.add("open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            /*
                Animation de la fenêtre.
            */

            const modalContent =
                modal.querySelector(
                    ".modal-content"
                );


            if (modalContent) {

                modalContent.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translateY(40px) scale(.94)"
                        },
                        {
                            opacity: 1,
                            transform:
                                "translateY(0) scale(1)"
                        }
                    ],
                    {
                        duration: 450,
                        easing:
                            "cubic-bezier(.22,1,.36,1)"
                    }
                );

            }

        });

    });


    function closeModal() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    if (close) {

        close.addEventListener(
            "click",
            closeModal
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   10. NAVIGATION ACTIVE
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!sections.length || !links.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.id;


                    links.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            href ===
                            `#${currentId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach((section) => {

        observer.observe(section);

    });

}


/* =========================================================
   11. COMPTEURS ANIMÉS
========================================================= */

/*
    Exemple :

    1+
    3+
    100%
    ∞

    Les nombres apparaissent
    progressivement.
*/

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".stat-card"
        );


    if (!counters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const card =
                        entry.target;


                    const numberElement =
                        card.querySelector(
                            ".stat-number"
                        );


                    if (!numberElement) {

                        observerInstance.unobserve(
                            card
                        );

                        return;

                    }


                    const original =
                        numberElement.textContent.trim();


                    /*
                        On ne transforme
                        que les vrais nombres.
                    */

                    const match =
                        original.match(
                            /^(\d+)(.*)$/
                        );


                    if (!match) {

                        numberElement.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "scale(.6)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "scale(1)"
                                }
                            ],
                            {
                                duration: 1700,
                                easing:
                                    "cubic-bezier(.22,1,.36,1)"
                            }
                        );


                        observerInstance.unobserve(
                            card
                        );

                        return;

                    }


                    const finalNumber =
                        Number(match[1]);


                    const suffix =
                        match[2];


                    let startTime = null;


                    function animateCounter(timestamp) {

                        if (!startTime) {
                            startTime = timestamp;
                        }


                        const progress =
                            Math.min(
                                (timestamp - startTime) / 3200,
                                1
                            );


                        /*
                            Ease-out.
                        */

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const current =
                            Math.floor(
                                eased * finalNumber
                            );


                        numberElement.textContent =
                            current + suffix;


                        if (progress < 1) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            numberElement.textContent =
                                original;

                        }

                    }


                    requestAnimationFrame(
                        animateCounter
                    );


                    observerInstance.unobserve(
                        card
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        observer.observe(counter);

    });

}


/* =========================================================
   12. IMAGES DES TECHNOLOGIES
========================================================= */

function initTechnologyImages() {

    const images =
        document.querySelectorAll(
            ".skill-logo img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "load",
            () => {

                image.style.opacity = "0";

                image.style.transform =
                    "scale(.7) rotate(-5deg)";


                requestAnimationFrame(() => {

                    image.style.transition =
                        "all 500ms cubic-bezier(.22,1,.36,1)";

                    image.style.opacity =
                        "1";

                    image.style.transform =
                        "scale(1) rotate(0)";

                });

            }
        );


        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";


                const parent =
                    image.parentElement;


                if (!parent) {
                    return;
                }


                parent.classList.add(
                    "skill-icon-fallback"
                );


                if (!parent.querySelector("i")) {

                    const icon =
                        document.createElement("i");


                    icon.className =
                        "bi bi-code-square";


                    parent.appendChild(icon);

                }

            }
        );


        /*
            Cas où l'image était déjà chargée
            avant JavaScript.
        */

        if (image.complete && image.naturalWidth) {

            image.style.opacity = "1";

        }

    });

}


/* =========================================================
   13. IMAGES DES PROJETS
========================================================= */

function initProjectImages() {

    const images =
        document.querySelectorAll(
            ".project-image img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "load",
            () => {

                image.style.opacity = "0";


                requestAnimationFrame(() => {

                    image.style.transition =
                        "opacity 700ms ease";

                    image.style.opacity =
                        "1";

                });

            }
        );


        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";


                if (image.parentElement) {

                    image.parentElement.classList.add(
                        "no-image"
                    );

                }

            }
        );

    });

}


/* =========================================================
   14. IMAGE HERO
========================================================= */

function initHeroImage() {

    const image =
        document.getElementById(
            "heroImage"
        );


    const fallback =
        document.getElementById(
            "heroFallback"
        );


    if (!image || !fallback) {
        return;
    }


    image.addEventListener(
        "load",
        () => {

            image.style.display =
                "block";


            fallback.style.display =
                "none";


            image.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "scale(.9)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 1000,
                    easing:
                        "cubic-bezier(.22,1,.36,1)",
                    fill: "forwards"
                }
            );

        }
    );


    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";


            fallback.style.display =
                "block";

        }
    );


    if (
        image.complete &&
        image.naturalWidth === 0
    ) {

        image.style.display =
            "none";


        fallback.style.display =
            "block";

    }

}


/* =========================================================
   15. LIENS EXTERNES
========================================================= */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    links.forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =========================================================
   16. BOUTON CV
========================================================= */

function initCVButton() {

    const cvButton =
        document.querySelector(
            ".cv-button"
        );


    if (!cvButton) {
        return;
    }


    cvButton.addEventListener(
        "click",
        () => {

            showToast(
                "Téléchargement du CV..."
            );

        }
    );

}


/* =========================================================
   17. TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   18. ANNÉE AUTOMATIQUE
========================================================= */

function initFooterYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   19. BARRE DE PROGRESSION DU SCROLL
========================================================= */

function initScrollProgress() {

    /*
        On crée automatiquement
        la barre sans modifier HTML.
    */

    const progress =
        document.createElement("div");


    progress.id =
        "scrollProgress";


    progress.style.position =
        "fixed";


    progress.style.top =
        "0";


    progress.style.left =
        "0";


    progress.style.width =
        "0%";


    progress.style.height =
        "3px";


    progress.style.background =
        "linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899)";


    progress.style.zIndex =
        "99999";


    progress.style.pointerEvents =
        "none";


    progress.style.transition =
        "width 80ms linear";


    document.body.appendChild(
        progress
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width =
                "0%";

            return;

        }


        const percentage =
            (scrollTop / documentHeight) *
            100;


        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();

}


/* =========================================================
   20. PETIT EFFET DE PARALLAXE DU HERO
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const heroImage =
            document.querySelector(
                ".hero-image-wrapper"
            );


        if (!heroImage) {
            return;
        }


        /*
            On désactive sur petit écran
            pour garder de bonnes performances.
        */

        if (window.innerWidth < 768) {
            heroImage.style.transform = "";
            return;
        }


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroImage.style.transform =
                `translateY(${scroll * 0.08}px)`;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   21. EFFET HOVER DYNAMIQUE SUR LES CARTES
========================================================= */

function initCardEffects() {

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .stat-card, .about-card"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-8px) scale(1.015)";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/*
    On attend un petit moment avant
    de lancer les effets des cartes.
*/

setTimeout(() => {

    initCardEffects();

}, 500);


/* =========================================================
   22. APPARITION DU FOOTER
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );


        /*
            Petit message dans la console
            uniquement pour le développeur.
        */

        console.log(
            "Portfolio chargé avec succès."
        );

    }
);