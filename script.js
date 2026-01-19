document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HERO SLIDER (Transición Fade)
    ========================================= */
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos por imagen

    function nextSlide() {
        // Quitamos clase 'active' de la actual
        slides[currentSlide].classList.remove('active');
        
        // Calculamos la siguiente (con bucle infinito)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ponemos clase 'active' a la siguiente
        slides[currentSlide].classList.add('active');
    }

    // Iniciar si hay más de una foto
    if(slides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }


    /* =========================================
       2. SCROLL ANIMATION (Aparición elegante)
    ========================================= */
    // Configuramos el observador
    const observerOptions = {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hacemos visible el elemento y lo movemos a su sitio
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Dejamos de observar para ahorrar recursos
            }
        });
    }, observerOptions);

    // Aplicamos la animación a los proyectos
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        // Estado inicial (oculto y desplazado abajo)
        item.style.opacity = 0;
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'all 1s ease-out'; // Animación suave
        
        observer.observe(item);
    });


    /* =========================================
       3. VALIDACIÓN FORMULARIO
    ========================================= */
    const form = document.getElementById('contactForm');
    if(form) { // Solo si existe el formulario
        const inputs = form.querySelectorAll('input');

        const patterns = {
            name: /^[a-zA-Z\u00C0-\u017F\s]{3,50}$/, // Letras, espacios y acentos
            email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        };

        function validate(field, regex) {
            if (regex.test(field.value)) {
                field.className = 'valid';
            } else {
                field.className = 'invalid';
            }
        }

        inputs.forEach((input) => {
            input.addEventListener('keyup', (e) => {
                if (patterns[e.target.id]) {
                    validate(e.target, patterns[e.target.id]);
                }
            });
        });
    }

    /* =========================================
       4. SMOOTH SCROLL PARA EL MENÚ
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});