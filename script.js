// Variáveis globais
let currentIndex = 0;
let slideInterval;
let isScrolling = false;

// Loading Screen Otimizado
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Inicia animações após o loading
      initializeAnimations();
    }, 1000);
  }, 1500); // Reduzido para melhor experiência
});

// Inicialização otimizada
function initializeAnimations() {
  initializeCarousel();
  initializeTypeWriter();
  createFloatingElements(); // Menos elementos para performance
}

// Carrossel Otimizado
// Carrossel Otimizado e Mais Rápido
function initializeCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Configura slides
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
    
    // Adiciona atributo para ajustes específicos se necessário
    if (index === 0 || index === 5) { // Ajusta slides específicos
      slide.setAttribute('data-adjust', 'true');
    }
  });

  // Move para slide (MAIS RÁPIDO - 0.5s)
  const moveToSlide = (index) => {
    if (isScrolling) return;
    isScrolling = true;
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Reset mais rápido
    setTimeout(() => {
      isScrolling = false;
    }, 500); // Reduzido de 800ms para 500ms
  };

  // Event listeners
  nextButton.addEventListener('click', () => {
    if (isScrolling) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
    resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    if (isScrolling) return;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
    resetAutoSlide();
  });

  // Auto slide MAIS RÁPIDO - 3 segundos (era 5)
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (!isScrolling && document.visibilityState === 'visible') {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
      }
    }, 3000); // REDUZIDO: 3000ms = 3 segundos
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Controles de hover
  let hoverTimeout;
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  track.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(startAutoSlide, 800);
  });

  // Pausa quando a página não está visível
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(slideInterval);
    } else {
      startAutoSlide();
    }
  });

  // Inicia auto slide
  startAutoSlide();
}

// Resto do código mantido igual...


// Efeito de digitação otimizado
function initializeTypeWriter() {
  const title = document.querySelector('h1');
  const originalText = title.textContent;
  let typedText = '';
  let typeIndex = 0;

  function typeWriter() {
    if (typeIndex < originalText.length) {
      typedText += originalText.charAt(typeIndex);
      title.textContent = typedText;
      typeIndex++;
      
      // Usa requestAnimationFrame para melhor performance
      requestAnimationFrame(() => {
        setTimeout(typeWriter, 80); // Velocidade ajustada
      });
    }
  }

  typeWriter();
}

// Magic Button Otimizado
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIndicator = document.getElementById('musicIndicator');

// Debounce para evitar múltiplos cliques
let isProcessing = false;

magicButton.addEventListener('click', () => {
  if (isProcessing) return;
  isProcessing = true;
  
  // Toca música
  playBackgroundMusic();
  
  // Mostra timeline
  showTimeline();
  
  // Reset do flag após um tempo
  setTimeout(() => {
    isProcessing = false;
  }, 1000);
});

// Função separada para tocar música
function playBackgroundMusic() {
  backgroundMusic.volume = 0.7;
  
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicIndicator.classList.add('playing');
      musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
    }).catch(error => {
      console.log('Autoplay bloqueado:', error);
      // Fallback mais suave
      setTimeout(() => {
        backgroundMusic.play().then(() => {
          musicIndicator.classList.add('playing');
          musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
      }, 1000);
    });
  }
}

// Função separada para mostrar timeline
function showTimeline() {
  timeline.classList.add('show');
  
  // Scroll suave com verificação
  setTimeout(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      timeline.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // Fallback para browsers antigos
      const timelineTop = timeline.offsetTop;
      window.scrollTo({ top: timelineTop, behavior: 'smooth' });
    }
  }, 300);
}

// Music Indicator
musicIndicator.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicIndicator.classList.add('playing');
    musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    backgroundMusic.pause();
    musicIndicator.classList.remove('playing');
    musicIndicator.innerHTML = '<i class="fas fa-music"></i>';
  }
});

// Floating Elements Otimizado
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  const elements = ['❤️', '💕', '✨', '🌹', '💘'];
  
  // Limpa elementos existentes
  container.innerHTML = '';
  
  // Menos elementos para melhor performance
  for (let i = 0; i < 8; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 15 + 's';
    element.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    element.style.opacity = Math.random() * 0.2 + 0.1;
    container.appendChild(element);
  }
}

// Parallax suave otimizado
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const rate = scrolled * 0.3;
      
      hero.style.transform = `translateY(${rate}px)`;
      scrollTimeout = null;
    }, 10); // Throttle para melhor performance
  }
});

// Preload de imagens para melhor performance
function preloadImages() {
  const imageUrls = [
    'img/noisdoiscomcoração.jpg',
    'img/DateMphoto1.jpg',
    'img/DateMphoto2.jpg',
    'img/DateMphoto3.jpg',
    'img/DateMphoto4.jpg',
    'img/nosdois.jpg',
    'img/restaurante.jpg',
    'img/viagem.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Inicia preload após o loading
setTimeout(preloadImages, 2000);