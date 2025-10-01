// Carrossel e timeline
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');

// Configura slides
const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

// Move slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
};

// Next
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide') || slides[0];
  let nextSlide = currentSlide.nextElementSibling || slides[0];
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
  moveToSlide(track, currentSlide, nextSlide);
});

// Prev
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide') || slides[0];
  let prevSlide = currentSlide.previousElementSibling || slides[slides.length-1];
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
  moveToSlide(track, currentSlide, prevSlide);
});

// Inicializa
slides[0].classList.add('current-slide');

// Corações
const heartContainer = document.getElementById('heartContainer');
const heartEmojis = ["💖","💘","💕","💞","💓","💝"];
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  heart.style.left = Math.random()*window.innerWidth + 'px';
  heart.style.fontSize = (Math.random()*30 + 20) + 'px';
  heart.style.animationDuration = (Math.random()*5 + 5) + 's';
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), (parseFloat(heart.style.animationDuration)*1000));
}

// Magic button - AGORA TOCA MÚSICA TAMBÉM
magicButton.addEventListener('click', (e) => {
  // Para qualquer áudio que possa estar tocando
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  
  // Inicia a música
  backgroundMusic.volume = 0.7;
  backgroundMusic.play().then(() => {
    console.log('Música iniciada com sucesso!');
  }).catch(error => {
    console.log('Erro ao tocar música:', error);
    // Mostra alerta amigável
    alert('Clique em "OK" para ativar a música! 🎵');
    backgroundMusic.play();
  });
  
  // Mostra timeline
  timeline.classList.add('show');
  
  // Cria corações
  let heartInterval = setInterval(createFloatingHeart, 300);
  setTimeout(() => clearInterval(heartInterval), 5000);
  
  // Scroll suave
  setTimeout(() => {
    timeline.scrollIntoView({ behavior: 'smooth' });
  }, 500);
});

// Fallback para autoplay
let audioStarted = false;
document.addEventListener('click', function startAudio() {
  if (!audioStarted && backgroundMusic.paused) {
    backgroundMusic.play().catch(e => {
      console.log('Aguardando interação...');
    });
    audioStarted = true;
  }
});