document.addEventListener('DOMContentLoaded', () => {

    // ===== Navigation Mobile =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ===== Header qui change au scroll =====
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== Lien Actif dans la Nav au Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // 80px offset for fixed header
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Cas spécial pour la section "hero"
        if (scrollY < 400 && current === 'hero') {
             const heroLink = document.querySelector('.nav-links a[href="#hero"]');
             if(heroLink) heroLink.classList.remove('active'); // Pas de lien "hero" dans la nav, mais si on en ajoutait un
        }
    });


    // ===== Animation Fade-in au Scroll =====
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Se déclenche quand 10% de l'élément est visible
        rootMargin: "0px 0px -50px 0px" // Déclenche un peu plus tôt
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    
    // ===== Logique Dark Mode =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Appliquer le thème sauvegardé au chargement de la page
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // 2. Ajouter l'écouteur d'événement au bouton
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            // Passer en mode sombre
            body.classList.add('dark-mode');
            // Sauvegarder le choix
            localStorage.setItem('theme', 'dark');
        } else {
            // Passer en mode clair
            body.classList.remove('dark-mode');
            // Sauvegarder le choix
            localStorage.setItem('theme', 'light');
        }
    });

});