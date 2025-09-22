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

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
 
::contentReference[oaicite:4]{index=4}
}
const videosButton = document.getElementById('videosButton');
const videosSection = document.getElementById('videos');

videosButton.addEventListener('click', () => {
  videosSection.scrollIntoView({ behavior: 'smooth' });
});
