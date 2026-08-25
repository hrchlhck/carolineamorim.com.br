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

})();