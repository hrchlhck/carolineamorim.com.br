// Ativa a animação quando a página carrega
window.addEventListener('load', () => {
setTimeout(() => {
    document.getElementById('navbar').classList.add('show');
    document.getElementById('content').classList.add('show');
}, 200);
});

window.addEventListener('load', () => {
const elements = document.querySelectorAll('.fade-in-up');

// Adiciona delay escalonado automaticamente
elements.forEach((el, index) => {
    el.classList.add(`stagger-${Math.min(index + 1, 5)}`);
    
    setTimeout(() => {
    el.classList.add('visible');
    }, 200 + (index * 100)); // 200ms base + 100ms por elemento
});
});

// Opcional: animar elementos quando rolar até eles
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target); // Anima apenas uma vez
    }
});
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
observer.observe(el);
});