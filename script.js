const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const magicButton = document.getElementById('magicButton');
const videosButton = document.getElementById('videosButton');
const timeline = document.getElementById('timeline');
const videosSection = document.getElementById('videos');

// Função para esconder todas as seções
function hideAllSections() {
  timeline.style.display = 'none';
  videosSection.style.display = 'none';

  // Pausa vídeos ao fechar
  document.getElementById('video1').src = document.getElementById('video1').src;
  document.getElementById('video2').src = document.getElementById('video2').src;
}

// Timeline button
magicButton.addEventListener('click', () => {
  if (timeline.style.display === 'block') {
    hideAllSections();
  } else {
    hideAllSections();
    timeline.style.display = 'block';
    timeline.scrollIntoView({ behavior: 'smooth' });

    // Corações animados
    let heartInterval = setInterval(createFloatingHeart, 300);
    setTimeout(() => clearInterval(heartInterval), 5000);
  }
});

// Videos button
videosButton.addEventListener('click', () => {
  if (videosSection.style.display === 'block') {
    hideAllSections();
  } else {
    hideAllSections();
    videosSection.style.display = 'block';
    videosSection.scrollIntoView({ behavior: 'smooth' });

    // Corações animados
    let heartInterval = setInterval(createFloatingHeart, 300);
    setTimeout(() => clearInterval(heartInterval), 5000);
  }
});

