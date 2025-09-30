// Configuração do carrossel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');

// Configura os slides
const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

// Função para mover o carrossel
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

// Botão next
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  moveToSlide(track, currentSlide, nextSlide);
});

// Botão prev
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  moveToSlide(track, currentSlide, prevSlide);
});

// Auto-play do carrossel (opcional)
setInterval(() => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  moveToSlide(track, currentSlide, nextSlide);
}, 4000);

// Corações flutuantes
const heartContainer = document.getElementById('heartContainer');
const heartEmojis = ["💖", "💘", "💕", "💞", "💓", "💝"];

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
  heartContainer.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, parseFloat(heart.style.animationDuration) * 1000);
}

// FUNÇÃO PRINCIPAL: Revela a timeline ao clicar no botão
magicButton.addEventListener('click', function() {
  // Remove a classe hidden para mostrar a timeline
  timeline.classList.remove('hidden');
  
  // Efeito de corações
  let heartCount = 0;
  const heartInterval = setInterval(() => {
    createFloatingHeart();
    heartCount++;
    if (heartCount > 15) {
      clearInterval(heartInterval);
    }
  }, 200);
  
  // Scroll suave até a timeline
  setTimeout(() => {
    timeline.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, 300);
  
  // Efeito visual no botão
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 150);
  
  // Opcional: Desabilita o botão após o clique
  this.disabled = true;
  this.innerHTML = 'História Revelada 💝';
  this.style.background = 'linear-gradient(45deg, #666, #999)';
  this.style.cursor = 'default';
});

// Inicializa o primeiro slide
slides[0].classList.add('current-slide');

// Efeito de digitação no título (opcional)
const title = document.querySelector('.hero h1');
const originalText = title.innerHTML;
title.innerHTML = '';

let charIndex = 0;
function typeWriter() {
  if (charIndex < originalText.length) {
    title.innerHTML += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50);
  }
}

// Inicia o efeito de digitação quando a página carrega
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});