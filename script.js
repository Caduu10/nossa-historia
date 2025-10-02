// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loading-screen').style.display = 'none';
    }, 1000);
  }, 2000);
});

// Carrossel Premium
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;

// Configura slides
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Move para slide
const moveToSlide = (index) => {
  track.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
};

// Event listeners
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});

// Auto slide
let slideInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
}, 5000);

// Pausa auto slide no hover
track.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

track.addEventListener('mouseleave', () => {
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }, 5000);
});

// Magic Button
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIndicator = document.getElementById('musicIndicator');

magicButton.addEventListener('click', () => {
  // Toca música
  backgroundMusic.volume = 0.7;
  backgroundMusic.play().then(() => {
    musicIndicator.classList.add('playing');
    musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
  }).catch(error => {
    console.log('Autoplay bloqueado:', error);
    alert('Clique em OK para ativar a música do nosso amor! 🎵');
    backgroundMusic.play();
    musicIndicator.classList.add('playing');
    musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
  });

  // Mostra timeline
  timeline.classList.add('show');
  setTimeout(() => {
    timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);

  // Cria elementos flutuantes
  createFloatingElements();
});

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
  const elements = ['❤️', '💕', '✨', '🌹', '💘', '💝', '💖'];
  
  // Limpa elementos existentes
  container.innerHTML = '';
  
  for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 20 + 's';
    element.style.fontSize = (Math.random() * 2 + 1) + 'rem';
    element.style.opacity = Math.random() * 0.3 + 0.1;
    container.appendChild(element);
  }
}

// Efeito de digitação no título
const title = document.querySelector('h1');
const originalText = title.textContent;
let typedText = '';

function typeWriter() {
  if (typedText.length < originalText.length) {
    typedText += originalText.charAt(typedText.length);
    title.textContent = typedText;
    setTimeout(typeWriter, 100);
  }
}

// Inicia efeito de digitação após o loading
setTimeout(() => {
  if (document.querySelector('.loading-screen').style.display !== 'none') {
    setTimeout(typeWriter, 500);
  } else {
    typeWriter();
  }
}, 2500);

// Adiciona efeito de parallax suave
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Inicialização de elementos flutuantes menores
createFloatingElements();