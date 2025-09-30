// ===== CONFIGURAÇÕES GLOBAIS =====
class OurStoryApp {
  constructor() {
    this.init();
  }

  init() {
    this.cacheElements();
    this.initLoading();
    this.initCarousel();
    this.initTimeline();
    this.initFloatingHearts();
    this.initScrollEffects();
    this.bindEvents();
  }

  // ===== CACHE DE ELEMENTOS =====
  cacheElements() {
    this.elements = {
      loadingScreen: document.getElementById('loadingScreen'),
      hero: document.getElementById('hero'),
      magicButton: document.getElementById('magicButton'),
      timeline: document.getElementById('timeline'),
      backToTop: document.getElementById('backToTop'),
      heartContainer: document.getElementById('heartContainer')
    };

    // Carousel elements
    this.carousel = {
      track: document.querySelector('.carousel-track'),
      slides: document.querySelectorAll('.carousel-slide'),
      prevBtn: document.querySelector('.carousel-btn.prev'),
      nextBtn: document.querySelector('.carousel-btn.next'),
      indicators: document.querySelectorAll('.indicator')
    };

    this.currentSlide = 0;
    this.isAnimating = false;
    this.autoPlayInterval = null;
  }

  // ===== LOADING SCREEN =====
  initLoading() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.elements.loadingScreen.classList.add('hidden');
        
        // Remove loading screen após animação
        setTimeout(() => {
          this.elements.loadingScreen.remove();
        }, 500);
      }, 2000);
    });
  }

  // ===== CAROUSEL =====
  initCarousel() {
    this.startAutoPlay();
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.carousel.slides.length;
    this.updateCarousel();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  prevSlide() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide - 1 + this.carousel.slides.length) % this.carousel.slides.length;
    this.updateCarousel();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;
    
    this.isAnimating = true;
    this.currentSlide = index;
    this.updateCarousel();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  updateCarousel() {
    // Move track
    this.carousel.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    
    // Update active states
    this.carousel.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
    
    // Update indicators
    this.carousel.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  // ===== TIMELINE =====
  initTimeline() {
    // Timeline será revelada pelo botão mágico
  }

  revealTimeline() {
    this.elements.timeline.classList.add('show');
    
    // Scroll suave para a timeline
    setTimeout(() => {
      this.elements.timeline.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  }

  // ===== FLOATING HEARTS =====
  initFloatingHearts() {
    this.heartEmojis = ["💖", "💘", "💕", "💞", "💓", "💝"];
  }

  createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
    
    // Posicionamento aleatório
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
    
    this.elements.heartContainer.appendChild(heart);
    
    // Remove após animação
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, parseFloat(heart.style.animationDuration) * 1000);
  }

  startHeartAnimation(duration = 5000) {
    const heartInterval = setInterval(() => {
      this.createFloatingHeart();
    }, 200);
    
    setTimeout(() => {
      clearInterval(heartInterval);
    }, duration);
  }

  // ===== SCROLL EFFECTS =====
  initScrollEffects() {
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrollY = window.scrollY;
    
    // Back to top button
    if (scrollY > 300) {
      this.elements.backToTop.classList.add('visible');
    } else {
      this.elements.backToTop.classList.remove('visible');
    }
    
    // Efeito parallax no hero
    if (this.elements.hero) {
      this.elements.hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===== EVENT BINDING =====
  bindEvents() {
    // Carousel controls
    this.carousel.nextBtn.addEventListener('click', () => {
      this.stopAutoPlay();
      this.nextSlide();
      this.startAutoPlay();
    });
    
    this.carousel.prevBtn.addEventListener('click', () => {
      this.stopAutoPlay();
      this.prevSlide();
      this.startAutoPlay();
    });
    
    // Carousel indicators
    this.carousel.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.stopAutoPlay();
        this.goToSlide(index);
        this.startAutoPlay();
      });
    });
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
    carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Magic button
    this.elements.magicButton.addEventListener('click', () => {
      this.handleMagicButtonClick();
    });
    
    // Back to top
    this.elements.backToTop.addEventListener('click', () => {
      this.scrollToTop();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.stopAutoPlay();
        this.prevSlide();
        this.startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      }
    });
  }

  handleMagicButtonClick() {
    // Efeito visual no botão
    this.elements.magicButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.elements.magicButton.style.transform = 'scale(1)';
    }, 150);
    
    // Revela timeline
    this.revealTimeline();
    
    // Efeito de corações
    this.startHeartAnimation(3000);
    
    // Desabilita o botão após o clique
    this.elements.magicButton.disabled = true;
    this.elements.magicButton.style.opacity = '0.6';
    this.elements.magicButton.style.cursor = 'default';
  }
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  new OurStoryApp();
});

// ===== SERVICE WORKER PARA CACHE (OPCIONAL) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}