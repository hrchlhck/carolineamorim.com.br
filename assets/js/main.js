document.addEventListener('DOMContentLoaded', function() {
  
  // Configurações centralizadas
  const CONFIG = {
    BASE_DELAY: 200,
    STAGGER_DELAY: 100,
    MAX_STAGGER: 5,
    OBSERVER_THRESHOLD: 0.1,
    OBSERVER_MARGIN: '0px 0px -100px 0px'
  };


  window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach((el, index) => {
      // Aplica delay escalonado via CSS
      const staggerClass = `stagger-${Math.min(index + 1, CONFIG.MAX_STAGGER)}`;
      el.classList.add(staggerClass);
      
      // Marca como já processado para evitar duplicação
      el.dataset.processed = 'true';
      
      // Adiciona delay antes de tornar visível
      setTimeout(() => {
        el.classList.add('visible');
      }, CONFIG.BASE_DELAY + (index * CONFIG.STAGGER_DELAY));
    });
  });

  const observerOptions = {
    root: null,
    threshold: CONFIG.OBSERVER_THRESHOLD,
    rootMargin: CONFIG.OBSERVER_MARGIN
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Evita re-animação se já foi ativado
        if (target.dataset.scrollAnimated !== 'true') {
          target.classList.add('visible');
          target.dataset.scrollAnimated = 'true';
          
          // Para de observar após animar (performance)
        //   observer.unobserve(target);
        }
      }
    });
  }, observerOptions);

  // Observa todos os elementos com classe .animate-on-scroll
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });

  window.retriggerAnimations = function(selector) {
    const elements = document.querySelectorAll(selector || '.fade-inpup');
    
    elements.forEach(el => {
      el.classList.remove('visible');
      el.dataset.scrollAnimated = 'false';
      observer.observe(el);
    });
  };
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Fecha os outros itens
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Alterna o item clicado
    item.classList.toggle("active");
  });
});

const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');

    navbarLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
      })
    });

    document.documentElement.style.scrollBehavior = "auto";
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if(target){
        const targetY = target.getBoundingClientRect().top + window.scrollY - 115;
        smoothScroll(targetY);
      }
    });
});

});
const duration = 1500;
const easing = t => t < 0.5 
  ? 4 * t * t * t 
  : 1 - Math.pow(-2 * t + 2, 3) / 2;

function smoothScroll(targetY) {
  let start = window.scrollY;
  let distance = targetY - start;
  let startTime = null;
  
  function step(currentTime) {
    if (startTime === null) startTime = currentTime;
    let elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / duration, 1);
    let eased = easing(progress);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}