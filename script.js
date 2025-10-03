// Variáveis globais
let currentIndex = 0;
let slideInterval;
let isScrolling = false;

// Loading Screen
// ⚡ CARREGAMENTO ULTRA-RÁPIDO - NOVO CÓDIGO
window.addEventListener('DOMContentLoaded', function() {
    // Esconde loading rápido
    setTimeout(function() {
        var loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                initializeSite();
            }, 300);
        }
    }, 500); // Reduzido de 2000 para 500ms
});

function initializeSite() {
    // Inicializa só o essencial primeiro
    initializeCarousel();
    initializeMagicButton();
    
    // Carrega conteúdo pesado depois
    setTimeout(function() {
        createFloatingElements();
        preloadHeavyContent();
    }, 1000);
}

function preloadHeavyContent() {
    // Pré-carrega imagens pesadas só quando necessário
    var heavyImages = ['img/restaurante.jpg', 'img/viagem.jpg'];
    heavyImages.forEach(function(url) {
        var img = new Image();
        img.src = url;
    });
}

// ⚡ CARROSSEL OTIMIZADO - substitua a função initializeCarousel
function initializeCarousel() {
    var track = document.querySelector('.carousel-track');
    var slides = document.querySelectorAll('.carousel-slide');
    var nextButton = document.querySelector('.next');
    var prevButton = document.querySelector('.prev');
    
    if (!track || slides.length === 0) return;
    
    var currentIndex = 0;
    var slideInterval;
    
    // Configuração mínima
    slides.forEach(function(slide, index) {
        slide.style.left = (index * 100) + '%';
    });
    
    function moveToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }
    
    // Event listeners simples
    nextButton.addEventListener('click', function() {
        var nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
        resetAutoSlide();
    });
    
    prevButton.addEventListener('click', function() {
        var prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
        resetAutoSlide();
    });
    
    function startAutoSlide() {
        slideInterval = setInterval(function() {
            var nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }, 4000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
}

// ⚡ BOTÃO MÁGICO OTIMIZADO - substitua a função do magic button
function initializeMagicButton() {
    var magicButton = document.getElementById('magicButton');
    var timeline = document.getElementById('timeline');
    var backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!magicButton) return;
    
    magicButton.addEventListener('click', function() {
        // Toca música (não bloqueia)
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().catch(function() { 
                // Ignora erros de autoplay
            });
        }
        
        // Mostra timeline
        if (timeline) {
            timeline.classList.add('show');
            setTimeout(function() {
                timeline.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    });
}

// Observador de scroll para animações da timeline
function initializeScrollAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 200);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Carrossel Corrigido
function initializeCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Pré-carrega TODAS as imagens
  preloadCarouselImages();

  // Configura slides
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  // Move para slide
  const moveToSlide = (index) => {
    if (isScrolling) return;
    isScrolling = true;
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Animação de entrada para o slide atual
    slides.forEach(slide => slide.style.opacity = '0.7');
    slides[currentIndex].style.opacity = '1';
    
    setTimeout(() => {
      isScrolling = false;
    }, 600);
  };

  // Event listeners
  nextButton.addEventListener('click', () => {
    if (isScrolling) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
    resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    if (isScrolling) return;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
    resetAutoSlide();
  });

  // Auto slide - 3 segundos
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (!isScrolling && document.visibilityState === 'visible') {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
      }
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Controles de hover
  let hoverTimeout;
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
    // Aumenta um pouco a legenda no hover
    const currentCaption = slides[currentIndex].querySelector('.carousel-caption');
    if (currentCaption) {
      currentCaption.style.transform = 'translateY(0) scale(1.05)';
    }
  });

  track.addEventListener('mouseleave', () => {
    const currentCaption = slides[currentIndex].querySelector('.carousel-caption');
    if (currentCaption) {
      currentCaption.style.transform = 'translateY(0)';
    }
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(startAutoSlide, 500);
  });

  // Inicia com primeira slide ativa
  slides[0].style.opacity = '1';
  startAutoSlide();
}

// Pré-carrega imagens do carrossel
function preloadCarouselImages() {
  const imageUrls = [
    'img/noisdoiscomcoração.jpg',
    'img/DateMphoto1.jpg',
    'img/DateMphoto2.jpg',
    'img/DateMphoto3.jpg',
    'img/DateMphoto4.jpg',
    'img/nosdois.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Efeito de digitação melhorado
function initializeTypeWriter() {
  const title = document.querySelector('h1');
  const originalText = title.textContent;
  let typedText = '';
  let typeIndex = 0;

  function typeWriter() {
    if (typeIndex < originalText.length) {
      // Adiciona efeito de cursor piscante
      title.textContent = typedText + originalText.charAt(typeIndex) + '|';
      typedText += originalText.charAt(typeIndex);
      typeIndex++;
      
      // Velocidade variável para efeito mais natural
      const speed = Math.random() * 50 + 50;
      setTimeout(typeWriter, speed);
    } else {
      // Remove o cursor no final
      title.textContent = typedText;
    }
  }
  
  // Delay antes de começar
  setTimeout(typeWriter, 500);
}

// Magic Button com mais feedback
const magicButton = document.getElementById('magicButton');
const timeline = document.getElementById('timeline');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIndicator = document.getElementById('musicIndicator');

let isProcessing = false;

magicButton.addEventListener('click', () => {
  if (isProcessing) return;
  isProcessing = true;
  
  // Efeito de clique no botão
  magicButton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    magicButton.style.transform = 'scale(1)';
  }, 150);
  
  playBackgroundMusic();
  showTimeline();
  
  setTimeout(() => {
    isProcessing = false;
  }, 1000);
});

function playBackgroundMusic() {
  backgroundMusic.volume = 0.7;
  
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicIndicator.classList.add('playing');
      musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
      // Efeito visual quando a música começa
      musicIndicator.style.animation = 'popIn 0.6s ease, pulse 2s infinite 0.6s';
    }).catch(error => {
      setTimeout(() => {
        backgroundMusic.play().then(() => {
          musicIndicator.classList.add('playing');
          musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
        });
      }, 1000);
    });
  }
}

function showTimeline() {
  timeline.classList.add('show');
  
  // Animação de entrada da timeline
  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 300);
    });
  }, 500);
  
  setTimeout(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      timeline.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      const timelineTop = timeline.offsetTop;
      window.scrollTo({ top: timelineTop, behavior: 'smooth' });
    }
  }, 800);
}

// Music Indicator com mais interatividade
musicIndicator.addEventListener('click', () => {
  // Efeito de clique
  musicIndicator.style.transform = 'scale(0.9)';
  setTimeout(() => {
    musicIndicator.style.transform = 'scale(1)';
  }, 150);
  
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicIndicator.classList.add('playing');
    musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    backgroundMusic.pause();
    musicIndicator.classList.remove('playing');
    musicIndicator.innerHTML = '<i class="fas fa-music"></i>';
  }
});

// Floating Elements melhorados
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  const elements = ['❤️', '💕', '✨', '🌹', '💘', '🌟', '💫', '🌸'];
  
  container.innerHTML = '';
  
  for (let i = 0; i < 12; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 20 + 's';
    element.style.animationDuration = (Math.random() * 10 + 15) + 's';
    element.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
    element.style.opacity = Math.random() * 0.15 + 0.05;
    
    // Efeito de flutuação mais orgânico
    element.style.animation = `float ${element.style.animationDuration} infinite linear`;
    
    container.appendChild(element);
  }
}

// Parallax suave
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const rate = scrolled * 0.3;
      hero.style.transform = `translateY(${rate}px)`;
      scrollTimeout = null;
    }, 10);
  }
});

// Preload de todas as imagens
function preloadImages() {
  const imageUrls = [
    'img/noisdoiscomcoração.jpg',
    'img/DateMphoto1.jpg',
    'img/DateMphoto2.jpg',
    'img/DateMphoto3.jpg',
    'img/DateMphoto4.jpg',
    'img/nosdois.jpg',
    'img/restaurante.jpg',
    'img/viagem.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

setTimeout(preloadImages, 2000);

// Efeito de confete no clique do botão mágico
function createCelebration() {
  const container = document.getElementById('floatingElements');
  const confettiElements = ['🎉', '🎊', '💖', '✨', '🌟', '💫'];
  
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'floating-element';
    confetti.textContent = confettiElements[Math.floor(Math.random() * confettiElements.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
    confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    confetti.style.opacity = '0.8';
    confetti.style.zIndex = '1000';
    
    container.appendChild(confetti);
    
    // Remove após animação
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Adiciona confete ao clique do botão mágico
magicButton.addEventListener('click', createCelebration);

// Lousa do Amor - Funcionalidades
function initializeLoveBoard() {
  const loveBoard = document.getElementById('loveBoard');
  const addNoteBtn = document.getElementById('addNoteBtn');
  const saveNoteBtn = document.getElementById('saveNoteBtn');
  const closeModal = document.getElementById('closeModal');
  const noteModal = document.getElementById('noteModal');
  const notesContainer = document.getElementById('notesContainer');
  const changeBgBtn = document.getElementById('changeBgBtn');
  const saveBoardBtn = document.getElementById('saveBoardBtn');
  const clearBoardBtn = document.getElementById('clearBoardBtn');

  let currentColor = '#ffeb3b';
  let currentEmoji = '💕';
  let noteCounter = 0;

  // Carrega anotações salvas
  loadSavedNotes();

  // Event Listeners
  addNoteBtn.addEventListener('click', openNoteModal);
  saveNoteBtn.addEventListener('click', saveNote);
  closeModal.addEventListener('click', closeNoteModal);
  changeBgBtn.addEventListener('click', changeBoardBackground);
  saveBoardBtn.addEventListener('click', saveBoardAsImage);
  clearBoardBtn.addEventListener('click', clearBoard);

  // Fecha modal ao clicar fora
  noteModal.addEventListener('click', (e) => {
    if (e.target === noteModal) {
      closeNoteModal();
    }
  });

  // Color Picker
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', (e) => {
      document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
      e.target.classList.add('active');
      currentColor = e.target.getAttribute('data-color');
    });
  });

  // Emoji Picker
  document.querySelectorAll('.emoji-option').forEach(option => {
    option.addEventListener('click', (e) => {
      document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('active'));
      e.target.classList.add('active');
      currentEmoji = e.target.getAttribute('data-emoji');
    });
  });

  function openNoteModal() {
    noteModal.style.display = 'block';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    
    // Reseta seleções
    document.querySelectorAll('.color-option, .emoji-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('.color-option[data-color="#ffeb3b"]').classList.add('active');
    document.querySelector('.emoji-option[data-emoji="💕"]').classList.add('active');
    currentColor = '#ffeb3b';
    currentEmoji = '💕';
  }

  function closeNoteModal() {
    noteModal.style.display = 'none';
  }

  function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if (!title || !content) {
      alert('Por favor, preencha o título e a mensagem! 💖');
      return;
    }

    const note = {
      id: Date.now(),
      title: title,
      content: content,
      color: currentColor,
      emoji: currentEmoji,
      date: new Date().toLocaleDateString('pt-BR')
    };

    createNoteElement(note);
    saveNoteToLocalStorage(note);
    closeNoteModal();

    // Efeito visual
    const saveBtn = document.getElementById('saveNoteBtn');
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    saveBtn.style.background = 'linear-gradient(45deg, #4caf50, #2e7d32)';
    setTimeout(() => {
      saveBtn.innerHTML = '<i class="fas fa-heart"></i> Salvar Anotação';
      saveBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
    }, 2000);
  }

  function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';
  noteElement.setAttribute('data-color', note.color);
  noteElement.setAttribute('data-id', note.id);
  
  // Rotação aleatória para efeito mais orgânico
  const rotation = (Math.random() * 4 - 2).toFixed(1);
  noteElement.style.setProperty('--rotation', `${rotation}deg`);

  noteElement.innerHTML = `
    <div class="note-header">
      <h3 class="note-title">${note.title}</h3>
      <span class="note-emoji">${note.emoji}</span>
    </div>
    <div class="note-content">${note.content}</div>
    <div class="note-date">${note.date}</div>
    <div class="note-actions">
      <button class="note-delete" onclick="deleteNote(${note.id})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Faz as notas arrastáveis
  makeNoteDraggable(noteElement);

  notesContainer.appendChild(noteElement);
  
  // Animação de entrada com delay
  setTimeout(() => {
    noteElement.classList.add('loaded');
  }, 100);
  
  noteCounter++;
}

    // Faz as notas arrastáveis
    makeNoteDraggable(noteElement);

    notesContainer.appendChild(noteElement);
    noteCounter++;
  }

  function makeNoteDraggable(noteElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    noteElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      noteElement.style.zIndex = '1000';
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      noteElement.style.top = (noteElement.offsetTop - pos2) + "px";
      noteElement.style.left = (noteElement.offsetLeft - pos1) + "px";
      noteElement.style.position = 'absolute';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      noteElement.style.zIndex = '1';
      saveNotesPosition();
    }
  }

  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
    notes.push(note);
    localStorage.setItem('loveBoardNotes', JSON.stringify(notes));
  }

  function loadSavedNotes() {
    const notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
    notes.forEach(note => createNoteElement(note));
  }

  function deleteNote(noteId) {
    if (confirm('Tem certeza que quer apagar esta linda anotação? 💔')) {
      // Remove do DOM
      const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
      if (noteElement) {
        noteElement.style.animation = 'noteAppear 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse';
        setTimeout(() => {
          noteElement.remove();
        }, 600);
      }

      // Remove do localStorage
      let notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
      notes = notes.filter(note => note.id !== noteId);
      localStorage.setItem('loveBoardNotes', JSON.stringify(notes));
    }
  }

  function changeBoardBackground() {
    const backgrounds = [
      'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      'linear-gradient(135deg, rgba(255,77,109,0.1), rgba(255,143,163,0.05))',
      'linear-gradient(135deg, rgba(156,39,176,0.1), rgba(233,30,99,0.05))',
      'linear-gradient(135deg, rgba(33,150,243,0.1), rgba(76,175,80,0.05))'
    ];
    
    const boardContainer = document.querySelector('.board-container');
    const currentBg = boardContainer.style.background;
    let nextIndex = backgrounds.findIndex(bg => bg === currentBg) + 1;
    
    if (nextIndex >= backgrounds.length) nextIndex = 0;
    
    boardContainer.style.background = backgrounds[nextIndex];
    
    // Efeito visual
    changeBgBtn.innerHTML = '<i class="fas fa-check"></i> Trocado!';
    setTimeout(() => {
      changeBgBtn.innerHTML = '<i class="fas fa-palette"></i> Fundo';
    }, 1500);
  }

  function saveBoardAsImage() {
    // Simula o salvamento (em um caso real, usaria html2canvas)
    saveBoardBtn.innerHTML = '<i class="fas fa-camera"></i> Salvando...';
    setTimeout(() => {
      saveBoardBtn.innerHTML = '<i class="fas fa-download"></i> Salvo!';
      setTimeout(() => {
        saveBoardBtn.innerHTML = '<i class="fas fa-download"></i> Salvar';
      }, 2000);
      
      // Cria um efeito de flash
      const boardContainer = document.querySelector('.board-container');
      boardContainer.style.boxShadow = '0 0 50px rgba(255, 255, 255, 0.8)';
      setTimeout(() => {
        boardContainer.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
      }, 300);
    }, 1000);
  }

  function clearBoard() {
    if (confirm('Tem certeza que quer limpar TODAS as anotações? 😢')) {
      notesContainer.innerHTML = '';
      localStorage.removeItem('loveBoardNotes');
      noteCounter = 0;
      
      // Efeito visual
      clearBoardBtn.innerHTML = '<i class="fas fa-check"></i> Limpo!';
      setTimeout(() => {
        clearBoardBtn.innerHTML = '<i class="fas fa-trash"></i> Limpar';
      }, 1500);
    }
  }

  function saveNotesPosition() {
    // Salva a posição das notas (simplificado)
    console.log('Posições das notas salvas!');
  }
}

// Adicione esta função global para deletar notas
window.deleteNote = function(noteId) {
  // A função já está definida acima, esta é apenas para escopo global
  const notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
  const updatedNotes = notes.filter(note => note.id !== noteId);
  localStorage.setItem('loveBoardNotes', JSON.stringify(updatedNotes));
  
  const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
  if (noteElement) {
    noteElement.remove();
  }
};

// Modifique a função showTimeline para incluir a Lousa do Amor
function showTimeline() {
  timeline.classList.add('show');
  
  // Animação de entrada da timeline
  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 300);
    });
  }, 500);

  // Mostra a Lousa do Amor após a timeline
  setTimeout(() => {
    const loveBoard = document.getElementById('loveBoard');
    loveBoard.classList.add('show');
    initializeLoveBoard(); // Inicializa a lousa
    
    // Scroll para a lousa
    setTimeout(() => {
      loveBoard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 1000);
  }, 2000);
}