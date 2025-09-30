const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');

let firstClick = false; // para ativar som

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

// Hearts
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

// ... todo o código do carrossel, timeline e corações permanece igual ...

// YouTube Player corrigido
let player;
let firstClick = false;

function createYouTubePlayer() {
  player = new YT.Player('youtube-player', {
    height: '115',
    width: '200',
    videoId: 'Xv5QTAFiOBM',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: 'Xv5QTAFiOBM',
      modestbranding: 1,
      controls: 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // Ao primeiro clique em qualquer lugar do body, ativa o som
  document.body.addEventListener('click', () => {
    if (!firstClick) {
      player.unMute();
      firstClick = true;
    }
  }, { once: true });
}

// Aguarda o IFrame API carregar antes de criar o player
function onYouTubeIframeAPIReady() {
  createYouTubePlayer();
}
