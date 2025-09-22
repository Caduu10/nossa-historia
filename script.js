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
  let prevSlide = currentSlide.previousElementSibling || slides[slides.length-1];
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
  moveToSlide(track, currentSlide, prevSlide);
});

// Inicializa o primeiro slide
slides[0].classList.add('current-slide');

// Corações flutuantes
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

// Ativa timeline e corações ao clicar no botão
magicButton.addEventListener('click', () => {
  timeline.classList.add('show');

  let heartInterval = setInterval(createFloatingHeart, 300);
  setTimeout(() => clearInterval(heartInterval), 5000);

  timeline.scrollIntoView({ behavior: 'smooth' });
});
const videoLinkContainer = document.getElementById('videoLinkContainer');

magicButton.addEventListener('click', () => {
  // Mostrar corações
  for(let i=0;i<20;i++){ createFloatingHeart(); }

  // Mostrar o link do vídeo
  if(videoLinkContainer.classList.contains('hidden')){
    videoLinkContainer.classList.remove('hidden');
    videoLinkContainer.style.animation = 'fadeIn 0.8s ease forwards';
    videoLinkContainer.scrollIntoView({behavior: "smooth"});
  }
});
