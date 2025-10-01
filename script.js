// Carrossel e timeline
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');

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

// Magic button
magicButton.addEventListener('click', () => {
  timeline.classList.add('show');
  let heartInterval = setInterval(createFloatingHeart, 300);
  setTimeout(() => clearInterval(heartInterval), 5000);
  timeline.scrollIntoView({ behavior: 'smooth' });
});

// YouTube Player - tocar automaticamente
let player;
let playerCreated = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player-container', {
    height: '140',
    width: '250',
    videoId: 'Xv5QTAFiOBM',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      mute: 0, // Alterado para 0 para não iniciar mudo
      loop: 1,
      playlist: 'Xv5QTAFiOBM'
    },
    events: {
      'onReady': (event) => {
        event.target.playVideo();
        playerCreated = true;
      },
      'onStateChange': (event) => {
        // Garante que o vídeo continue tocando
        if (event.data === YT.PlayerState.ENDED) {
          event.target.playVideo();
        }
      }
    }
  });
}

// Controle de visibilidade do player
const ytIcon = document.getElementById('youtube-icon');
const ytContainer = document.getElementById('youtube-player-container');

ytIcon.addEventListener('click', () => {
  ytContainer.style.display = ytContainer.style.display === 'none' ? 'block' : 'none';
});

// Inicia o player automaticamente quando a página carrega
window.addEventListener('load', () => {
  // O player já será criado automaticamente pela API do YouTube
  ytContainer.style.display = 'none'; // Esconde o player inicialmente, mas o áudio toca
});