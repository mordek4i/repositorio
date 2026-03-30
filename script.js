// ===== Timer Logic =====
const timerDisplay = document.getElementById('timer');
let timeInSeconds = 15 * 60; // 15 minutos

function updateTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeInSeconds > 0) {
        timeInSeconds--;
    } else {
        // Reinicia o timer para efeito de escassez (comum em low ticket)
        timeInSeconds = 15 * 60; 
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Anima apenas uma vez
        }
    });
}, observerOptions);

// Observa todos os elementos com as classes de animação
document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left, .bounce-in').forEach(el => {
    observer.observe(el);
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha todos
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            let icon = faq.querySelector('.lucide-chevron-down');
            if(icon) icon.style.transform = 'rotate(0deg)';
        });

        // Abre o clicado se não estava aberto
        if (!isActive) {
            item.classList.add('active');
            let icon = item.querySelector('.lucide-chevron-down');
            if(icon) icon.style.transform = 'rotate(180deg)';
        }
    });
});

// ===== Exit Intent Pop-up =====
let hasShownPopup = false;

document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 50 && !hasShownPopup) {
        document.getElementById('exit-popup').style.display = 'flex';
        hasShownPopup = true;
    }
});

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('exit-popup').style.display = 'none';
});

const popupBtn = document.querySelector('.popup-btn');
if(popupBtn) {
    popupBtn.addEventListener('click', () => {
        document.getElementById('exit-popup').style.display = 'none';
    });
}
