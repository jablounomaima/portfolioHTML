// --- Scroll animations ---
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// --- Modal global ---
// Création unique de la fenêtre modale
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = '<span id="modal-close">&times;</span><div class="modal-inner"></div>';
document.body.appendChild(modal);

const modalInner = modal.querySelector('.modal-inner');
const modalClose = modal.querySelector('#modal-close');

// Fonction générique pour afficher des médias dans la fenêtre modale
function showModalContent(type, srcs) {
    modalInner.innerHTML = ''; // Effacer le contenu précédent
    srcs.forEach(src => {
        if (type === 'video') {
            // Vérifie si le fichier est une vidéo valide
            if (src.endsWith('.mp4') || src.endsWith('.webm')) {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.onerror = () => console.error(`Erreur lors du chargement de la vidéo : ${src}`);
                modalInner.appendChild(video);
            }
        } else if (type === 'images') {
            // Vérifie si le fichier est une image valide
            if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
                const img = document.createElement('img');
                img.src = src;
                img.onerror = () => console.error(`Erreur lors du chargement de l'image : ${src}`);
                modalInner.appendChild(img);
            }
        }
    });
    modal.style.display = 'flex'; // Afficher la fenêtre modale
}

// Gestion des clics sur les boutons "open-modal"
document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const srcs = btn.dataset.src.split(',');
        showModalContent(type, srcs);
    });
});

// Fermer la fenêtre modale
modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 60;
        if (scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// --- Dark mode toggle ---
const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});