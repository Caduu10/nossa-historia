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
}

// Carrossel Rápido e Simples
function initializeCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Pré-carrega imagens
  preloadCarouselImages();

  // Configura slides
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  // Move para slide - MUITO MAIS RÁPIDO
  const moveToSlide = (index) => {
    if (isScrolling) return;
    isScrolling = true;
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    setTimeout(() => {
      isScrolling = false;
    }, 400); // MUITO MAIS RÁPIDO
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

  // Auto slide MAIS RÁPIDO - 2.5 segundos
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (!isScrolling && document.visibilityState === 'visible') {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
      }
    }, 2500); // MAIS RÁPIDO: 2.5 segundos
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
    hoverTimeout = setTimeout(startAutoSlide, 500);
  });

  // Inicia auto slide
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

// Efeito de digitação
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
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}

// Magic Button
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIndicator = document.getElementById('musicIndicator');

let isProcessing = false;

magicButton.addEventListener('click', () => {
  if (isProcessing) return;
  isProcessing = true;
  
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

// Floating Elements
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  const elements = ['❤️', '💕', '✨', '🌹', '💘'];
  
  container.innerHTML = '';
  
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

// Parallax
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