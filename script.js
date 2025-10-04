// Variáveis globais
let currentIndex = 0;
let slideInterval;
let isScrolling = false;

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      initializeAnimations();
    }, 1000);
  }, 1500);
});

// Inicialização
function initializeAnimations() {
  initializeCarousel();
  initializeTypeWriter();
  createFloatingElements();
  initializeScrollAnimations();
}

// Observador de scroll para animações da timeline
function initializeScrollAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 200);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Carrossel Corrigido
function initializeCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Pré-carrega TODAS as imagens
  preloadCarouselImages();

  // Configura slides
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  // Move para slide
  const moveToSlide = (index) => {
    if (isScrolling) return;
    isScrolling = true;
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Animação de entrada para o slide atual
    slides.forEach(slide => slide.style.opacity = '0.7');
    slides[currentIndex].style.opacity = '1';
    
    setTimeout(() => {
      isScrolling = false;
    }, 600);
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

  // Auto slide - 3 segundos
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (!isScrolling && document.visibilityState === 'visible') {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
      }
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Controles de hover
  let hoverTimeout;
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
    // Aumenta um pouco a legenda no hover
    const currentCaption = slides[currentIndex].querySelector('.carousel-caption');
    if (currentCaption) {
      currentCaption.style.transform = 'translateY(0) scale(1.05)';
    }
  });

  track.addEventListener('mouseleave', () => {
    const currentCaption = slides[currentIndex].querySelector('.carousel-caption');
    if (currentCaption) {
      currentCaption.style.transform = 'translateY(0)';
    }
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(startAutoSlide, 500);
  });

  // Inicia com primeira slide ativa
  slides[0].style.opacity = '1';
  startAutoSlide();
}

// Pré-carrega imagens do carrossel
function preloadCarouselImages() {
  const imageUrls = [
    'img/noisdoiscomcoração.jpg',
    'img/DateMphoto1.jpg',
    'img/DateMphoto2.jpg',
    'img/DateMphoto3.jpg',
    'img/DateMphoto4.jpg',
    'img/nosdois.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Efeito de digitação melhorado
function initializeTypeWriter() {
  const title = document.querySelector('h1');
  const originalText = title.textContent;
  let typedText = '';
  let typeIndex = 0;

  function typeWriter() {
    if (typeIndex < originalText.length) {
      // Adiciona efeito de cursor piscante
      title.textContent = typedText + originalText.charAt(typeIndex) + '|';
      typedText += originalText.charAt(typeIndex);
      typeIndex++;
      
      // Velocidade variável para efeito mais natural
      const speed = Math.random() * 50 + 50;
      setTimeout(typeWriter, speed);
    } else {
      // Remove o cursor no final
      title.textContent = typedText;
    }
  }
  
  // Delay antes de começar
  setTimeout(typeWriter, 500);
}

// Magic Button com mais feedback
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIndicator = document.getElementById('musicIndicator');

let isProcessing = false;

magicButton.addEventListener('click', () => {
  if (isProcessing) return;
  isProcessing = true;
  
  // Efeito de clique no botão
  magicButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    magicButton.style.transform = 'scale(1)';
  }, 150);
  
  playBackgroundMusic();
  showTimeline();
  
  setTimeout(() => {
    isProcessing = false;
  }, 1000);
});

function playBackgroundMusic() {
  backgroundMusic.volume = 0.7;
  
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicIndicator.classList.add('playing');
      musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
      // Efeito visual quando a música começa
      musicIndicator.style.animation = 'popIn 0.6s ease, pulse 2s infinite 0.6s';
    }).catch(error => {
      setTimeout(() => {
        backgroundMusic.play().then(() => {
          musicIndicator.classList.add('playing');
          musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
      }, 1000);
    });
  }
}

function showTimeline() {
  timeline.classList.add('show');
  
  // Animação de entrada da timeline
  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 300);
    });
  }, 500);
  
  setTimeout(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      timeline.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      const timelineTop = timeline.offsetTop;
      window.scrollTo({ top: timelineTop, behavior: 'smooth' });
    }
  }, 800);
}

// Music Indicator com mais interatividade
musicIndicator.addEventListener('click', () => {
  // Efeito de clique
  musicIndicator.style.transform = 'scale(0.9)';
  setTimeout(() => {
    musicIndicator.style.transform = 'scale(1)';
  }, 150);
  
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

// Floating Elements melhorados
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  const elements = ['❤️', '💕', '✨', '🌹', '💘', '🌟', '💫', '🌸'];
  
  container.innerHTML = '';
  
  for (let i = 0; i < 12; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 20 + 's';
    element.style.animationDuration = (Math.random() * 10 + 15) + 's';
    element.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
    element.style.opacity = Math.random() * 0.15 + 0.05;
    
    // Efeito de flutuação mais orgânico
    element.style.animation = `float ${element.style.animationDuration} infinite linear`;
    
    container.appendChild(element);
  }
}

// Parallax suave
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const rate = scrolled * 0.3;
      hero.style.transform = `translateY(${rate}px)`;
      scrollTimeout = null;
    }, 10);
  }
});

// Preload de todas as imagens
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

setTimeout(preloadImages, 2000);

// Efeito de confete no clique do botão mágico
function createCelebration() {
  const container = document.getElementById('floatingElements');
  const confettiElements = ['🎉', '🎊', '💖', '✨', '🌟', '💫'];
  
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'floating-element';
    confetti.textContent = confettiElements[Math.floor(Math.random() * confettiElements.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
    confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    confetti.style.opacity = '0.8';
    confetti.style.zIndex = '1000';
    
    container.appendChild(confetti);
    
    // Remove após animação
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Adiciona confete ao clique do botão mágico
magicButton.addEventListener('click', createCelebration);