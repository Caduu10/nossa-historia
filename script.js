// ⚡ CARREGAMENTO RÁPIDO
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Iniciando site...');
    
    // Remove loading rápido
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                initializeSite();
            }, 300);
        }
    }, 800);
});

function initializeSite() {
    console.log('Inicializando componentes do site...');
    
    // Inicializa componentes essenciais
    initializeCarousel();
    initializeMagicButton();
    
    // Carrega conteúdo pesado depois
    setTimeout(function() {
        createFloatingElements();
        preloadHeavyContent();
    }, 1000);
}

function preloadHeavyContent() {
    // Pré-carrega imagens pesadas
    const heavyImages = ['img/restaurante.jpg', 'img/viagem.jpg'];
    heavyImages.forEach(function(url) {
        const img = new Image();
        img.src = url;
    });
}

// 🎠 CARROSSEL
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (!track || slides.length === 0) {
        console.log('Carrossel não encontrado');
        return;
    }
    
    let currentIndex = 0;
    let slideInterval;
    
    // Configura slides
    slides.forEach(function(slide, index) {
        slide.style.left = (index * 100) + '%';
    });
    
    function moveToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }
    
    // Event listeners
    nextButton.addEventListener('click', function() {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
        resetAutoSlide();
    });
    
    prevButton.addEventListener('click', function() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
        resetAutoSlide();
    });
    
    function startAutoSlide() {
        slideInterval = setInterval(function() {
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }, 4000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Controles de hover
    track.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
    
    startAutoSlide();
    console.log('Carrossel inicializado');
}

// 💫 ELEMENTOS FLUTUANTES
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elements = ['❤️', '💕', '✨', '🌹', '💘'];
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Menos elementos no mobile
    const elementCount = window.innerWidth <= 768 ? 4 : 8;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDelay = Math.random() * 15 + 's';
        element.style.animationDuration = (Math.random() * 10 + 15) + 's';
        element.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        element.style.opacity = Math.random() * 0.15 + 0.05;
        container.appendChild(element);
    }
}

// 🎵 INDICADOR DE MÚSICA
document.addEventListener('DOMContentLoaded', function() {
    const musicIndicator = document.getElementById('musicIndicator');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (musicIndicator && backgroundMusic) {
        musicIndicator.addEventListener('click', function() {
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
    }
});

// ✨ BOTÃO MÁGICO PRINCIPAL - CORRIGIDO
function initializeMagicButton() {
    const magicButton = document.getElementById('magicButton');
    const timeline = document.getElementById('timeline');
    const loveBoard = document.getElementById('loveBoard');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIndicator = document.getElementById('musicIndicator');

    if (!magicButton) {
        console.log('Botão mágico não encontrado');
        return;
    }

    magicButton.addEventListener('click', function() {
        console.log('🎯 Botão "Nossa História" clicado!');
        
        // 1. Toca a música
        if (backgroundMusic) {
            backgroundMusic.volume = 0.7;
            backgroundMusic.play().then(() => {
                console.log('🎵 Música iniciada');
                if (musicIndicator) {
                    musicIndicator.classList.add('playing');
                    musicIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }).catch(error => {
                console.log('🔇 Autoplay bloqueado:', error);
            });
        }

        // 2. Mostra a timeline
        if (timeline) {
            timeline.classList.add('show');
            console.log('📜 Timeline mostrada');
        }

        // 3. Scroll para timeline primeiro
        setTimeout(() => {
            if (timeline) {
                timeline.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 300);

        // 4. Mostra a Lousa do Amor depois
        setTimeout(() => {
            if (loveBoard) {
                loveBoard.classList.add('show');
                console.log('📝 Lousa do Amor mostrada');
                
                // Inicializa a Lousa do Amor
                initLoveBoard();
                
                // Scroll para a Lousa
                setTimeout(() => {
                    loveBoard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 800);
            } else {
                console.log('❌ Lousa do Amor não encontrada no DOM');
            }
        }, 1500);
    });
    
    console.log('🔮 Botão mágico inicializado');
}

// 🎨 LOUSA DO AMOR - SISTEMA COMPLETO
function initLoveBoard() {
    console.log('📝 Inicializando Lousa do Amor...');
    
    const addNoteBtn = document.getElementById('addNoteBtn');
    const clearBoardBtn = document.getElementById('clearBoardBtn');
    const notesContainer = document.getElementById('notesContainer');

    if (!notesContainer) {
        console.log('❌ Container de anotações não encontrado');
        return;
    }

    // Carrega anotações salvas
    loadSavedNotes();

    // Event Listeners
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function() {
            console.log('➕ Criando anotações de exemplo...');
            createSampleNotes();
        });
    }

    if (clearBoardBtn) {
        clearBoardBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que quer limpar todas as anotações? 💔')) {
                notesContainer.innerHTML = '';
                localStorage.removeItem('loveBoardNotes');
                loadSavedNotes(); // Mostra mensagem de vazio
                
                // Efeito visual
                this.innerHTML = '<i class="fas fa-check"></i> Limpo!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-trash"></i> Limpar';
                }, 1500);
            }
        });
    }

    console.log('✅ Lousa do Amor inicializada!');
}

// 📥 CARREGA ANOTAÇÕES SALVAS
function loadSavedNotes() {
    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) return;
    
    const notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
    console.log(`📂 Carregando ${notes.length} anotações salvas`);
    
    if (notes.length === 0) {
        // Mostra mensagem de lousa vazia
        notesContainer.innerHTML = `
            <div class="empty-board">
                <div class="empty-message">
                    <i class="fas fa-heart"></i>
                    <h3>Nossa Lousa está vazia</h3>
                    <p>Clique em "Nova Anotação" para começar!</p>
                </div>
            </div>
        `;
    } else {
        // Limpa container e carrega anotações
        notesContainer.innerHTML = '';
        notes.forEach(note => createNoteElement(note));
    }
}

// 🎴 CRIA ELEMENTO DE ANOTAÇÃO
function createNoteElement(note) {
    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) return;
    
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.setAttribute('data-color', note.color);
    noteElement.setAttribute('data-id', note.id);
    
    // Rotação aleatória para efeito orgânico
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

    notesContainer.appendChild(noteElement);
    
    // Animação de entrada
    setTimeout(() => {
        noteElement.classList.add('loaded');
    }, 100);
    
    console.log(`📄 Anotação criada: "${note.title}"`);
}

// 🌟 CRIA ANOTAÇÕES DE EXEMPLO
function createSampleNotes() {
    console.log('🎨 Criando anotações de exemplo...');
    
    const sampleNotes = [
        {
            id: Date.now() + 1,
            title: 'Nosso primeiro date 💕',
            content: 'Lembro como se fosse hoje... cada momento especial ao seu lado! Cada sorriso, cada olhar, tudo ficou guardado no meu coração.',
            color: '#ffeb3b',
            emoji: '💕',
            date: new Date().toLocaleDateString('pt-BR')
        },
        {
            id: Date.now() + 2,
            title: 'Lista de sonhos 🌟',
            content: 'Viajar pelo mundo juntos ✈️, construir nossa casa 🏡, criar uma família 👨‍👩‍👧‍👦, crescer velhinhos juntos 💑...',
            color: '#2196f3',
            emoji: '🌟',
            date: new Date().toLocaleDateString('pt-BR')
        },
        {
            id: Date.now() + 3,
            title: 'Coisas que amo em você ❤️',
            content: 'Seu sorriso ilumina meu dia 😊, seu cuidado me aquece o coração 🤗, sua forma de me olhar me faz sentir especial 🥰... Tudo em você é perfeito!',
            color: '#e91e63',
            emoji: '❤️',
            date: new Date().toLocaleDateString('pt-BR')
        }
    ];

    const notesContainer = document.getElementById('notesContainer');
    if (!notesContainer) return;
    
    // Limpa mensagem de vazio
    notesContainer.innerHTML = '';
    
    // Cria anotações de exemplo
    sampleNotes.forEach(note => createNoteElement(note));
    
    // Salva no localStorage
    localStorage.setItem('loveBoardNotes', JSON.stringify(sampleNotes));
    
    console.log('✅ Anotações de exemplo criadas e salvas!');
}

// 🗑️ FUNÇÃO GLOBAL PARA DELETAR ANOTAÇÃO
window.deleteNote = function(noteId) {
    if (confirm('Tem certeza que quer apagar esta linda anotação? 💔')) {
        console.log(`🗑️ Apagando anotação ${noteId}`);
        
        // Remove do DOM com animação
        const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
        if (noteElement) {
            noteElement.style.animation = 'noteEntrance 0.6s ease reverse';
            setTimeout(() => {
                noteElement.remove();
                
                // Atualiza localStorage
                const notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
                const updatedNotes = notes.filter(note => note.id !== noteId);
                localStorage.setItem('loveBoardNotes', JSON.stringify(updatedNotes));
                
                console.log(`✅ Anotação ${noteId} removida`);
                
                // Se não há mais anotações, mostra mensagem
                if (updatedNotes.length === 0) {
                    loadSavedNotes();
                }
            }, 600);
        }
    }
};

// 🖼️ EFEITO PARALLAX SUAVE
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * 0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
            scrollTimeout = null;
        }, 10);
    }
});

// 📱 OTIMIZAÇÃO PARA REDIMENSIONAMENTO
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        createFloatingElements(); // Recalcula elementos flutuantes
    }, 250);
});

console.log('🚀 Script.js carregado com sucesso!');