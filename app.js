document.addEventListener('DOMContentLoaded', () => {

    // ===== Navigation Mobile =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu mobile en cliquant sur un lien (sauf le toggle du dropdown)
    document.querySelectorAll('.nav-links a:not(.nav-dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // NOUVEAU: Logique pour Dropdown sur mobile
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            // Empêche le clic de fermer le menu mobile si on est déjà en mode mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = dropdownToggle.parentElement;
                dropdown.classList.toggle('open');
            }
        });
    }

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

    
    // *************************************************
    // NOUVEAU: Logique Lightbox Dynamique
    // *************************************************
        
    // 1. Créer les éléments de la lightbox en JS
    const lightbox = document.createElement('div');
    lightbox.id = 'myLightbox';
    lightbox.className = 'lightbox';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-lightbox';
    closeBtn.innerHTML = '&times;';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-content';
    lightboxImg.id = 'lightboxImg';
    
    const captionText = document.createElement('div');
    captionText.id = 'lightboxCaption';
    
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(captionText);
    
    document.body.appendChild(lightbox);

    // 2. Ajouter les écouteurs d'événements
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(e) {
        // Empêche le clic si l'image est dans un lien (comme les cartes de projet)
        if (e.target.closest('a')) {
            return;
        }
        lightbox.style.display = "block";
        lightboxImg.src = e.target.src; 
        captionText.innerHTML = e.target.alt;
    }
    
    // Sélectionne TOUTES les images de galerie ET de projet sur N'IMPORTE QUELLE page
    const galleryImages = document.querySelectorAll('.gallery-multi img, .gallery-single img, .projet-image img');
    galleryImages.forEach(img => {
        img.addEventListener('click', openLightbox);
    });

    // Fonction pour fermer
    function closeLightbox() {
        lightbox.style.display = "none";
    }

    // Clic sur le 'X' pour fermer
    closeBtn.addEventListener('click', closeLightbox);
    
    // Clic sur le fond pour fermer
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Clic sur le fond (pas l'image)
             closeLightbox();
        }
    });
    
    // ===== Fin Logique Lightbox =====

}); // Fin de DOMContentLoaded