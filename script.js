window.onload = () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const magicButton = document.getElementById('magicButton');
  const heartContainer = document.getElementById('heartContainer');
  const messages = document.querySelectorAll('.message');

  // Configura os slides
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  };

  // Carrossel
  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    let nextSlide = currentSlide.nextElementSibling || slides[0];
    currentSlide.classList.remove('current-slide');
    nextSlide.classList.add('current-slide');
    moveToSlide(track, currentSlide, nextSlide);
  });

  prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    let prevSlide = currentSlide.previousElementSibling || slides[slides.length-1];
    currentSlide.classList.remove('current-slide');
    prevSlide.classList.add('current-slide');
    moveToSlide(track, currentSlide, prevSlide);
  });

  slides[0].classList.add('current-slide');

  // Corações flutuantes
  const heartEmojis = ["💖","💘","💕","💞","💓","💝"];
  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
    heart.style.left = Math.random()*window.innerWidth + 'px';
    heart.style.fontSize = (Math.random()*30 + 20) + 'px';
    heart.style.animationDuration = (Math.random()*5 + 5) + 's';
    heartContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, parseFloat(heart.style.animationDuration)*1000);
  }

  // Botão "Nossa História"
  magicButton.addEventListener('click', () => {
    for(let i=0;i<20;i++){ createFloatingHeart(); }

    // Mostrar mensagens uma a uma
    messages.forEach((msg, index) => {
      setTimeout(() => {
        msg.style.display = 'block';
        msg.style.animation = 'fadeIn 0.8s ease forwards';
        msg.scrollIntoView({behavior: "smooth"});
      }, index * 1200);
    });
  });
};
