// Carrossel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');

// Configuração do carrossel
let currentIndex = 0;
const slideWidth = slides[0].getBoundingClientRect().width;

// Posiciona os slides
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

// Função para mover o carrossel
const moveToSlide = (index) => {
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  slides.forEach(slide => slide.classList.remove('current-slide'));
  slides[index].classList.add('current-slide');
  currentIndex = index;
};

// Botão next
nextButton.addEventListener('click', () => {
  const nextIndex = (currentIndex + 1) % slides.length;
  moveToSlide(nextIndex);
});

// Botão prev
prevButton.addEventListener('click', () => {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(prevIndex);
});

// Auto-play do carrossel (opcional)
let autoPlay = setInterval(() => {
  const nextIndex = (currentIndex + 1) % slides.length;
  moveToSlide(nextIndex);
}, 5000);

// Pausa auto-play ao interagir
carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
carousel.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  }, 5000);
});

// Corações flutuantes
const heartContainer = document.getElementById('heartContainer');
const heartEmojis = ["💖","💘","💕","💞","💓","💝"];

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), parseFloat(heart.style.animationDuration) * 1000);
}

// Efeito especial ao clicar no botão
magicButton.addEventListener('click', () => {
  // Revela a timeline
  timeline.classList.add('show');
  
  // Efeito de confete de corações
  let heartCount = 0;
  const heartInterval = setInterval(() => {
    createFloatingHeart();
    heartCount++;
    if (heartCount > 20) clearInterval(heartInterval);
  }, 150);
  
  // Scroll suave para a timeline
  setTimeout(() => {
    timeline.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, 500);
  
  // Efeito visual no botão
  magicButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    magicButton.style.transform = 'scale(1)';
  }, 150);
});

// Inicialização
slides[0].classList.add('current-slide');

// Efeito de digitação no título (opcional)
const title = document.querySelector('.hero h1');
const originalText = title.textContent;
title.textContent = '';

let charIndex = 0;
function typeWriter() {
  if (charIndex < originalText.length) {
    title.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

// Inicia efeito de digitação quando a página carrega
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});