const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const heartContainer = document.getElementById('heartContainer');
const heartEmojis = ["💖", "💘", "💕", "💞", "💓", "💝"];

let historyVisible = false;
let heartInterval;
let videoElement;

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 90 + 'vw';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

magicButton.addEventListener('click', () => {
  historyVisible = !historyVisible;

  if (historyVisible) {
    // Mostrar timeline com animação
    timeline.classList.add('show');

    // Criar e mostrar vídeo do link externo
    if (!videoElement) {
      videoElement = document.createElement('iframe');
      videoElement.src = "https://memoryiit.com/720db29c-Beatriz-e-Carlos-s2"; // <-- coloque o link do vídeo
      videoElement.width = "90%";
      videoElement.height = "400";
      videoElement.style.maxWidth = '700px';
      videoElement.style.margin = '30px auto';
      videoElement.style.display = 'block';
      videoElement.style.borderRadius = '20px';
      videoElement.style.boxShadow = '0 10px 30px rgba(255,0,80,0.6)';
      videoElement.allow = "autoplay; encrypted-media";
      magicButton.insertAdjacentElement('afterend', videoElement);
    }

    // Iniciar corações
    heartInterval = setInterval(createFloatingHeart, 400);
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
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  // Posição horizontal aleatória
  heart.style.left = Math.random() * 100 + 'vw';

  // Tamanho aleatório
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';

  // Animação com duração aleatória para suavidade
  const duration = Math.random() * 2 + 3; // entre 3s e 5s
  heart.style.animationDuration = duration + 's';

  heartContainer.appendChild(heart);

  // Remover após animação
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}
