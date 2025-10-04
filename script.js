// ⚡ CARREGAMENTO RÁPIDO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Carregado - Iniciando site...');
    
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
    console.log('🎯 Inicializando componentes do site...');
    
    // Inicializa componentes essenciais
    initializeCarousel();
    initializeMagicButton();
    initializeMusicIndicator();
    
    // Carrega conteúdo pesado depois
    setTimeout(function() {
        createFloatingElements();
    }, 1000);
}

// 🎠 CARROSSEL
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (!track || slides.length === 0) {
        console.log('❌ Carrossel não encontrado');
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
    console.log('✅ Carrossel inicializado');
}

// 💫 ELEMENTOS FLUTUANTES
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elements = ['❤️', '💕', '✨', '🌹', '💘'];
    
    if (!container) {
        console.log('❌ Container de elementos flutuantes não encontrado');
        return;
    }
    
    container.innerHTML = '';
    
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
    
    console.log('✅ Elementos flutuantes criados');
}

// 🎵 INDICADOR DE MÚSICA
function initializeMusicIndicator() {
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
        console.log('✅ Indicador de música inicializado');
    }
}

// ✨ BOTÃO MÁGICO PRINCIPAL
function initializeMagicButton() {
    const magicButton = document.getElementById('magicButton');
    const timeline = document.getElementById('timeline');
    const loveBoard = document.getElementById('loveBoard');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIndicator = document.getElementById('musicIndicator');

    if (!magicButton) {
        console.log('❌ Botão mágico não encontrado');
        return;
    }

    console.log('✅ Botão mágico encontrado, adicionando evento...');

    magicButton.addEventListener('click', function() {
        console.log('🎯 BOTÃO "NOSSA HISTÓRIA" CLICADO!');
        
        // 1. Toca a música
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5;
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
            
            // Scroll para timeline
            setTimeout(function() {
                timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('📜 Scroll para timeline executado');
            }, 300);
        }

        // 3. Inicializa animações da timeline
        setTimeout(function() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 300);
            });
        }, 500);

        // 4. Mostra a Lousa do Amor
        setTimeout(function() {
            if (loveBoard) {
                loveBoard.classList.add('show');
                console.log('📝 Lousa do Amor mostrada');
                
                // Inicializa a Lousa
                initLoveBoard();
                
                // Scroll para a Lousa
                setTimeout(function() {
                    loveBoard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log('📝 Scroll para Lousa executado');
                }, 1000);
                
            } else {
                console.log('❌ Lousa do Amor não encontrada!');
            }
        }, 2000);
    });
    
    console.log('✅ Evento do botão mágico adicionado');
}

// 🎨 LOUSA DO AMOR - SISTEMA COMPLETO
function initLoveBoard() {
    console.log('📝 INICIANDO LOUSA DO AMOR...');
    
    const addNoteBtn = document.getElementById('addNoteBtn');
    const clearBoardBtn = document.getElementById('clearBoardBtn');
    const notesContainer = document.getElementById('notesContainer');
    const noteModal = document.getElementById('noteModal');
    const closeModal = document.getElementById('closeModal');
    const saveNoteBtn = document.getElementById('saveNoteBtn');

    // Verifica se os elementos existem
    console.log('🔍 Elementos da Lousa:');
    console.log('- addNoteBtn:', addNoteBtn);
    console.log('- clearBoardBtn:', clearBoardBtn);
    console.log('- notesContainer:', notesContainer);
    console.log('- noteModal:', noteModal);

    if (!notesContainer) {
        console.log('❌ Container de anotações não encontrado!');
        return;
    }

    // Carrega anotações salvas
    loadSavedNotes();

    // Event Listeners
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function() {
            console.log('➕ Botão Nova Anotação clicado');
            openNoteModal();
        });
    }

    if (clearBoardBtn) {
        clearBoardBtn.addEventListener('click', function() {
            console.log('🗑️ Botão Limpar clicado');
            if (confirm('Tem certeza que quer limpar todas as anotações? 💔')) {
                notesContainer.innerHTML = '';
                localStorage.removeItem('loveBoardNotes');
                loadSavedNotes();
                
                // Efeito visual
                this.innerHTML = '<i class="fas fa-check"></i> Limpo!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-trash"></i> Limpar';
                }, 1500);
            }
        });
    }

    // Modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeNoteModal);
    }

    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', saveNote);
    }

    // Fecha modal ao clicar fora
    if (noteModal) {
        noteModal.addEventListener('click', function(e) {
            if (e.target === noteModal) {
                closeNoteModal();
            }
        });
    }

    // Color Picker
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Emoji Picker
    const emojiOptions = document.querySelectorAll('.emoji-option');
    emojiOptions.forEach(option => {
        option.addEventListener('click', function() {
            emojiOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    console.log('✅ LOUSA DO AMOR INICIALIZADA COM SUCESSO!');
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
        console.log('📝 Mensagem de lousa vazia exibida');
    } else {
        // Limpa container e carrega anotações
        notesContainer.innerHTML = '';
        notes.forEach(note => createNoteElement(note));
        console.log(`📝 ${notes.length} anotações carregadas`);
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
    
    // Rotação aleatória
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

// 🔓 ABRE MODAL DE NOVA ANOTAÇÃO
function openNoteModal() {
    const noteModal = document.getElementById('noteModal');
    if (!noteModal) return;
    
    noteModal.style.display = 'block';
    
    // Limpa campos
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    
    // Reseta seleções
    const colorOptions = document.querySelectorAll('.color-option');
    const emojiOptions = document.querySelectorAll('.emoji-option');
    
    colorOptions.forEach(opt => opt.classList.remove('active'));
    emojiOptions.forEach(opt => opt.classList.remove('active'));
    
    // Seleciona padrões
    document.querySelector('.color-option[data-color="#ffeb3b"]').classList.add('active');
    document.querySelector('.emoji-option[data-emoji="💕"]').classList.add('active');
    
    console.log('📝 Modal de nova anotação aberto');
}

// 🔒 FECHA MODAL
function closeNoteModal() {
    const noteModal = document.getElementById('noteModal');
    if (noteModal) {
        noteModal.style.display = 'none';
        console.log('📝 Modal fechado');
    }
}

// 💾 SALVA NOVA ANOTAÇÃO
function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const activeColor = document.querySelector('.color-option.active');
    const activeEmoji = document.querySelector('.emoji-option.active');

    if (!title || !content) {
        alert('Por favor, preencha o título e a mensagem! 💖');
        return;
    }

    if (!activeColor || !activeEmoji) {
        alert('Por favor, selecione uma cor e um emoji! 🎨');
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content,
        color: activeColor.getAttribute('data-color'),
        emoji: activeEmoji.getAttribute('data-emoji'),
        date: new Date().toLocaleDateString('pt-BR')
    };

    createNoteElement(note);
    saveNoteToLocalStorage(note);
    closeNoteModal();

    // Efeito visual de confirmação
    const saveBtn = document.getElementById('saveNoteBtn');
    const originalHTML = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    saveBtn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
    
    setTimeout(() => {
        saveBtn.innerHTML = originalHTML;
        saveBtn.style.background = '';
    }, 2000);

    console.log('✅ Nova anotação salva:', note.title);
}

// 💾 SALVA NO LOCALSTORAGE
function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('loveBoardNotes')) || [];
    notes.push(note);
    localStorage.setItem('loveBoardNotes', JSON.stringify(notes));
    console.log('💾 Anotação salva no localStorage');
}

// 🗑️ FUNÇÃO GLOBAL PARA DELETAR ANOTAÇÃO
window.deleteNote = function(noteId) {
    if (confirm('Tem certeza que quer apagar esta linda anotação? 💔')) {
        console.log(`🗑️ Apagando anotação ${noteId}`);
        
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

// 🖼️ EFEITO PARALLAX
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

// 🎪 EFEITO DE DIGITAÇÃO NO TÍTULO
function initializeTypeWriter() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    const originalText = title.textContent;
    let typedText = '';
    let typeIndex = 0;

    title.textContent = '';

    function typeWriter() {
        if (typeIndex < originalText.length) {
            typedText += originalText.charAt(typeIndex);
            title.textContent = typedText + '|';
            typeIndex++;
            setTimeout(typeWriter, 80);
        } else {
            title.textContent = typedText;
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Inicializa efeito de digitação
setTimeout(initializeTypeWriter, 1500);

console.log('🎉 SCRIPT.JS CARREGADO COM SUCESSO!');
console.log('✨ Site pronto para uso!');
console.log('💫 Funcionalidades:');
console.log('   - 🎠 Carrossel automático');
console.log('   - 📜 Timeline animada');
console.log('   - 📝 Lousa do Amor interativa');
console.log('   - 🎵 Player de música');
console.log('   - 💫 Elementos flutuantes');
console.log('   - 📱 Totalmente responsivo');