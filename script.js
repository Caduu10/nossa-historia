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
};

// Botão next
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide') || slides[0];
  let nextSlide = currentSlide.nextElementSibling || slides[0];
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
  moveToSlide(track, currentSlide, nextSlide);
});

// Botão prev
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide') || slides[0];
  let prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
  moveToSlide(track, currentSlide, prevSlide);
});

// Inicializa o primeiro slide
slides[0].classList.add('current-slide');

// Corações flutuantes
const heartContainer = document.getElementById('heartContainer');
const heartEmojis = ["💖", "💘", "💕", "💞", "💓", "💝"];
let heartInterval;

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

// Botão "Nossa História"
let historyVisible = false;
let videoElement;

magicButton.addEventListener('click', () => {
  historyVisible = !historyVisible;

  if (historyVisible) {
    // Mostrar timeline
    timeline.classList.add('show');

    // Criar e mostrar vídeo
    if (!videoElement) {
      videoElement = document.createElement('video');
      videoElement.src = 'img/nossaHistoria.mp4'; // coloque seu vídeo aqui
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.style.position = 'relative';
      videoElement.style.width = '90%';
      videoElement.style.maxWidth = '700px';
      videoElement.style.margin = '30px auto';
      videoElement.style.borderRadius = '20px';
      videoElement.style.display = 'block';
      videoElement.style.boxShadow = '0 10px 30px rgba(255,0,80,0.6)';
      magicButton.insertAdjacentElement('afterend', videoElement);
    }

    // Iniciar corações
    heartInterval = setInterval(createFloatingHeart, 300);
  } else {
    // Esconder timeline
    timeline.classList.remove('show');

    // Remover vídeo
    if (videoElement) {
      videoElement.remove();
      videoElement = null;
    }

    // Parar corações
    clearInterval(heartInterval);
  }
});
