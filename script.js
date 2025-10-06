// 🌟 INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', function() {
    // Configurações iniciais
    initializeSystem();
    initializeParticles();
    startLoveCounter();
    initializeCarousel();
    initializeMusicPlayer();
    initializeModals();
    initializeQuiz();
    initializeFloatingElements();
    
    // Event Listeners
    setupEventListeners();
    
    // Mostrar conteúdo após loading
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
        document.querySelector('.love-board').classList.add('show');
    }, 2000);
});

// 🎪 CONFIGURAÇÕES INICIAIS
function initializeSystem() {
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Configurar data do primeiro date
    const firstDate = new Date('2025-07-18');
    document.getElementById('firstDate').textContent = formatDate(firstDate);
}

// 🌌 SISTEMA DE PARTÍCULAS
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff4d6d" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff8fa3",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// ❤️ CONTADOR DE TEMPO JUNTOS
function startLoveCounter() {
    const firstDate = new Date('2025-07-18');
    
    function updateCounter() {
        const now = new Date();
        const diff = now - firstDate;
        
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        
        document.getElementById('monthsTogether').textContent = months;
        document.getElementById('daysTogether').textContent = days;
        document.getElementById('hoursTogether').textContent = hours;
        document.getElementById('minutesTogether').textContent = minutes;
    }
    
    updateCounter();
    setInterval(updateCounter, 60000); // Atualizar a cada minuto
}

// 🎠 SISTEMA DE CARROSSEL
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play
    let autoPlay = setInterval(nextSlide, 5000);
    
    // Pausar auto-play no hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
    
    // Swipe para mobile
    let startX = 0;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
}

// 🎵 SISTEMA DE MÚSICA
function initializeMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentTrack = document.querySelector('.current-track');
    
    const playlist = [
        { title: 'Coming Together', artist: 'Chris Brown' },
        { title: 'No Guidance', artist: 'Chris Brown ft. Drake' },
        { title: 'Under The Influence', artist: 'Chris Brown' }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    function loadTrack(index) {
        const track = playlist[index];
        currentTrack.textContent = `${track.title} - ${track.artist}`;
        // Aqui você carregaria o arquivo de áudio real
    }
    
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play().catch(e => console.log('Autoplay prevented:', e));
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }
    
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }
    
    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    // Carregar primeira música
    loadTrack(currentTrackIndex);
}

// 💌 SISTEMA DE MODAIS
function initializeModals() {
    const messageModal = document.getElementById('messageModal');
    const musicModal = document.getElementById('musicModal');
    const newMessageBtn = document.getElementById('newMessageBtn');
    const addTrackBtn = document.querySelector('.add-track-btn');
    const closeButtons = document.querySelectorAll('.close');
    
    // Abrir modais
    newMessageBtn.addEventListener('click', () => openModal(messageModal));
    addTrackBtn.addEventListener('click', () => openModal(musicModal));
    
    // Fechar modais
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });
    
    // Fechar modal clicando fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Formulários
    document.getElementById('messageForm').addEventListener('submit', handleMessageSubmit);
    document.getElementById('musicForm').addEventListener('submit', handleMusicSubmit);
}

function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleMessageSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('messageType').value;
    const text = document.getElementById('messageText').value;
    
    if (text.trim()) {
        createMessageCard(type, text);
        closeModal(document.getElementById('messageModal'));
        document.getElementById('messageForm').reset();
        showNotification('Mensagem enviada com sucesso! 💝');
    }
}

function handleMusicSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('musicTitle').value;
    const artist = document.getElementById('musicArtist').value;
    
    if (title.trim() && artist.trim()) {
        addTrackToPlaylist(title, artist);
        closeModal(document.getElementById('musicModal'));
        document.getElementById('musicForm').reset();
        showNotification('Música adicionada à playlist! 🎵');
    }
}

// 🎮 SISTEMA DE QUIZ
function initializeQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.textContent === '18 de Julho de 2025';
            
            // Resetar outras opções
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });
            
            // Marcar resposta
            this.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {
                updateQuizScore(100);
                showNotification('Resposta correta! 🎉 +100 pontos');
            } else {
                showNotification('Tente novamente! 💕');
            }
        });
    });
}

function updateQuizScore(points) {
    const scoreDisplay = document.querySelector('.score');
    const currentScore = parseInt(scoreDisplay.textContent);
    scoreDisplay.textContent = currentScore + points;
    
    // Animação de pontos
    scoreDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreDisplay.style.transform = 'scale(1)';
    }, 300);
}

// ✨ ELEMENTOS FLUTUANTES
function initializeFloatingElements() {
    const container = document.getElementById('floatingElements');
    const emojis = ['💖', '💕', '💗', '💓', '💞', '💝', '✨', '🌟'];
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posição aleatória
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        
        // Animação única
        element.style.animationDuration = (Math.random() * 20 + 10) + 's';
        element.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(element);
        
        // Remover após animação
        setTimeout(() => {
            element.remove();
        }, 30000);
    }
    
    // Criar elementos periodicamente
    setInterval(createFloatingElement, 2000);
    
    // Criar alguns elementos iniciais
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingElement, i * 500);
    }
}

// 🎭 SISTEMA DE TEMA
function setupEventListeners() {
    // Toggle de tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Botões especiais
    document.getElementById('magicButton').addEventListener('click', triggerMagicEffect);
    document.getElementById('surpriseButton').addEventListener('click', showSpecialSurprise);
    document.getElementById('floatingSurprise').addEventListener('click', triggerSurprise);
    
    // Sistema de notas (lousa do amor)
    document.getElementById('addNoteBtn').addEventListener('click', addNewNote);
    document.getElementById('addPhotoBtn').addEventListener('click', addPhotoNote);
    document.getElementById('searchNotesBtn').addEventListener('click', searchNotes);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ✨ EFEITOS ESPECIAIS
function triggerMagicEffect() {
    const button = document.getElementById('magicButton');
    const hearts = ['💖', '💕', '💗', '💓', '💞'];
    
    // Animação do botão
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Criar corações flutuantes
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(hearts[Math.floor(Math.random() * hearts.length)]);
    }
    
    showNotification('Magia do amor ativada! ✨💝');
}

function createFloatingHeart(heart) {
    const element = document.createElement('div');
    element.textContent = heart;
    element.style.position = 'fixed';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '100vh';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1000';
    element.style.animation = `floatHeart ${Math.random() * 2 + 3}s ease-in forwards`;
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 5000);
}

// Adicionar CSS para a animação dos corações
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function showSpecialSurprise() {
    const surprises = [
        "Você é a pessoa mais incrível do mundo! 🌟",
        "Cada momento contigo é especial! 💕",
        "Te amo mais que tudo! 💝",
        "Você faz meus dias melhores! ✨",
        "Nossa história é meu conto favorito! 📖💖"
    ];
    
    const surprise = surprises[Math.floor(Math.random() * surprises.length)];
    showNotification(surprise);
    
    // Efeito visual adicional
    document.body.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 20%, var(--primary) 70%);
        opacity: 0;
        animation: surpriseGlow 2s ease;
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }, 2000);
}

// Adicionar CSS para o efeito de surpresa
const surpriseStyle = document.createElement('style');
surpriseStyle.textContent = `
    @keyframes surpriseGlow {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.5); }
    }
`;
document.head.appendChild(surpriseStyle);

function triggerSurprise() {
    const surpriseBtn = document.getElementById('floatingSurprise');
    
    // Animação do botão
    surpriseBtn.style.animation = 'none';
    surpriseBtn.style.transform = 'scale(1.5) rotate(360deg)';
    
    setTimeout(() => {
        surpriseBtn.style.animation = 'float 3s ease-in-out infinite';
        surpriseBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
    
    // Surpresa aleatória
    const surprises = [
        () => showNotification('Surpresa! Você é amazing! 💝'),
        () => triggerMagicEffect(),
        () => createFireworks(),
        () => showLoveMessage()
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    randomSurprise();
}

function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 100);
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: fireworkExplosion 1s ease-out forwards;
    `;
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// Adicionar CSS para fogos de artifício
const fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
    @keyframes fireworkExplosion {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(3);
            opacity: 0.5;
        }
        100% {
            transform: scale(5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fireworkStyle);

function showLoveMessage() {
    const messages = [
        "Amo cada momento ao teu lado!",
        "Você é meu sonho realizado!",
        "Nossa conexão é única!",
        "Cada dia contigo é especial!",
        "Te amo mais a cada dia!"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
        z-index: 10000;
        animation: loveMessage 3s ease-in-out forwards;
        box-shadow: 0 10px 30px rgba(255, 77, 109, 0.5);
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Adicionar CSS para mensagem de amor
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes loveMessage {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        40% {
            transform: translate(-50%, -50%) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(messageStyle);

// 📝 SISTEMA DE NOTAS (LOUSA DO AMOR)
function addNewNote() {
    const noteText = prompt('Digite sua memória especial:');
    if (noteText && noteText.trim()) {
        createNoteElement('text', noteText);
        showNotification('Memória adicionada com sucesso! 💕');
    }
}

function addPhotoNote() {
    const photoUrl = prompt('Cole a URL da foto:');
    if (photoUrl && photoUrl.trim()) {
        createNoteElement('photo', photoUrl);
        showNotification('Foto adicionada com sucesso! 📸');
    }
}

function createNoteElement(type, content) {
    const notesContainer = document.getElementById('notesContainer');
    const noteElement = document.createElement('div');
    noteElement.className = 'message-card';
    
    const date = new Date().toLocaleDateString('pt-BR');
    
    if (type === 'text') {
        noteElement.innerHTML = `
            <div class="message-header">
                <span class="message-emoji">📝</span>
                <span class="message-date">${date}</span>
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
    } else {
        noteElement.innerHTML = `
            <div class="message-header">
                <span class="message-emoji">📸</span>
                <span class="message-date">${date}</span>
            </div>
            <div class="message-content">
                <img src="${content}" alt="Nossa memória" style="width: 100%; border-radius: 10px; margin-top: 10px;">
            </div>
        `;
    }
    
    noteElement.style.animation = 'slideInUp 0.6s ease';
    notesContainer.prepend(noteElement);
}

function searchNotes() {
    const searchTerm = prompt('Digite o termo para buscar:');
    if (searchTerm) {
        showNotification(`Buscando por: "${searchTerm}" 🔍`);
        // Implementar lógica de busca aqui
    }
}

// 💌 SISTEMA DE MENSAGENS
function createMessageCard(type, text) {
    const messagesContainer = document.querySelector('.messages-container');
    const messageCard = document.createElement('div');
    messageCard.className = `message-card ${type}`;
    
    const emojis = {
        love: '💝',
        surprise: '🎁',
        memory: '📸',
        future: '🌟'
    };
    
    messageCard.innerHTML = `
        <div class="message-header">
            <span class="message-emoji">${emojis[type]}</span>
            <span class="message-date">Agora</span>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="message-footer">
            <span class="message-author">Com amor</span>
        </div>
    `;
    
    messageCard.style.animation = 'slideInUp 0.6s ease';
    messagesContainer.prepend(messageCard);
}

// 🎵 SISTEMA DE PLAYLIST
function addTrackToPlaylist(title, artist) {
    const playlistTracks = document.querySelector('.playlist-tracks');
    const trackCount = playlistTracks.children.length + 1;
    
    const trackElement = document.createElement('div');
    trackElement.className = 'track';
    trackElement.innerHTML = `
        <span class="track-number">${trackCount}</span>
        <span class="track-title">${title}</span>
        <span class="track-artist">${artist}</span>
        <span class="track-duration">3:00</span>
    `;
    
    trackElement.style.animation = 'slideInUp 0.6s ease';
    playlistTracks.appendChild(trackElement);
    
    // Adicionar evento de clique
    trackElement.addEventListener('click', function() {
        document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Atualizar player
        document.querySelector('.track-title').textContent = title;
        document.querySelector('.track-artist').textContent = artist;
        document.querySelector('.current-track').textContent = `${title} - ${artist}`;
    });
}

// 🔔 SISTEMA DE NOTIFICAÇÕES
function showNotification(message) {
    // Tocar som de notificação se disponível
    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
        notificationSound.play().catch(e => console.log('Audio play prevented'));
    }
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(255, 77, 109, 0.5);
        animation: notificationSlide 3s ease-in-out forwards;
        max-width: 300px;
        font-family: 'Playfair Display', serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Adicionar CSS para notificações
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notificationSlide {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        20% {
            transform: translateX(0);
            opacity: 1;
        }
        80% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// 🛠️ FUNÇÕES UTILITÁRIAS
function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

function getTimeTogether() {
    const firstDate = new Date('2025-07-18');
    const now = new Date();
    const diff = now - firstDate;
    
    return {
        months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)),
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor(diff / (1000 * 60))
    };
}

// 🌟 INICIALIZAR ANIMAÇÕES DE SCROLL
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.timeline-item, .message-card, .track').forEach(el => {
        observer.observe(el);
    });
}

// Inicializar animações de scroll quando a página carregar
window.addEventListener('load', initializeScrollAnimations);

// 🎉 CONFIGURAÇÃO DE PERFORMANCE
// Debounce para eventos de scroll e resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar redimensionamento
window.addEventListener('resize', debounce(() => {
    // Recálculos necessários aqui
}, 250));

console.log('💝 Sistema de Amor inicializado com sucesso!');
console.log('✨ Desenvolvido com muito carinho para Beatriz & [Carlos]');
// ✨ SISTEMA DE NOTIFICAÇÕES PREMIUM
function showNotification(message) {
    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
        notificationSound.play().catch(e => console.log('Audio play prevented'));
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.4rem;">💝</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3500);
}

// 📝 SISTEMA DE NOTAS PREMIUM
function createNoteElement(type, content) {
    const notesContainer = document.getElementById('notesContainer');
    const noteElement = document.createElement('div');
    noteElement.className = 'note-card';
    
    const date = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const emojis = {
        text: '📝',
        photo: '📸',
        love: '💝',
        memory: '🌟'
    };
    
    if (type === 'text') {
        noteElement.innerHTML = `
            <div class="note-header">
                <span class="note-emoji">${emojis.text}</span>
                <span class="note-date">${date}</span>
            </div>
            <div class="note-content">
                <p>${content}</p>
            </div>
            <div class="note-footer">
                <span class="note-author">Nossa História</span>
                <div class="note-actions">
                    <button class="note-action-btn" onclick="this.closest('.note-card').style.transform = 'scale(0.9)'; setTimeout(() => this.closest('.note-card').remove(), 300)">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    } else {
        noteElement.innerHTML = `
            <div class="note-header">
                <span class="note-emoji">${emojis.photo}</span>
                <span class="note-date">${date}</span>
            </div>
            <div class="note-content">
                <p>Memória especial 💕</p>
                <img src="${content}" alt="Nossa memória" loading="lazy">
            </div>
            <div class="note-footer">
                <span class="note-author">Nosso Momento</span>
                <div class="note-actions">
                    <button class="note-action-btn" onclick="this.closest('.note-card').style.transform = 'scale(0.9)'; setTimeout(() => this.closest('.note-card').remove(), 300)">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    noteElement.style.animation = 'slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    notesContainer.prepend(noteElement);
    
    // Efeito de entrada
    setTimeout(() => {
        noteElement.style.transform = 'translateY(0) scale(1)';
        noteElement.style.opacity = '1';
    }, 100);
}

// 🎵 SISTEMA DE MÚSICA PREMIUM
function initializeMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentTrack = document.querySelector('.current-track');
    
    const playlist = [
        { title: 'Coming Together', artist: 'Chris Brown', duration: '3:45' },
        { title: 'No Guidance', artist: 'Chris Brown ft. Drake', duration: '4:20' },
        { title: 'Under The Influence', artist: 'Chris Brown', duration: '3:04' },
        { title: 'No Air', artist: 'Chris Brown ft. Jordin Sparks', duration: '4:20' },
        { title: 'Forever', artist: 'Chris Brown', duration: '4:38' }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    function loadTrack(index) {
        const track = playlist[index];
        currentTrack.textContent = `${track.title} - ${track.artist}`;
        
        // Atualizar progresso visual
        const progress = document.querySelector('.progress');
        progress.style.width = '0%';
        
        // Simular progresso da música
        if (isPlaying) {
            let progressWidth = 0;
            const progressInterval = setInterval(() => {
                if (!isPlaying) {
                    clearInterval(progressInterval);
                    return;
                }
                progressWidth += 0.5;
                progress.style.width = `${progressWidth}%`;
                
                if (progressWidth >= 100) {
                    clearInterval(progressInterval);
                    nextTrack();
                }
            }, 1000);
        }
    }
    
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
        } else {
            audio.play().catch(e => console.log('Autoplay prevented:', e));
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        }
        isPlaying = !isPlaying;
        loadTrack(currentTrackIndex);
    }
    
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        updateActiveTrack();
        if (isPlaying) audio.play();
    }
    
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        updateActiveTrack();
        if (isPlaying) audio.play();
    }
    
    function updateActiveTrack() {
        document.querySelectorAll('.track').forEach((track, index) => {
            track.classList.toggle('active', index === currentTrackIndex);
        });
    }
    
    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    // Clique nas tracks da playlist
    document.querySelectorAll('.track').forEach((track, index) => {
        track.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            updateActiveTrack();
            if (!isPlaying) togglePlay();
        });
    });
    
    // Carregar primeira música
    loadTrack(currentTrackIndex);
    updateActiveTrack();
}

// ✨ EFEITOS ESPECIAIS PREMIUM
function createFloatingHeart(heart) {
    const element = document.createElement('div');
    element.className = 'floating-heart';
    element.textContent = heart;
    element.style.left = Math.random() * 100 + 'vw';
    element.style.fontSize = (Math.random() * 25 + 20) + 'px';
    element.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 5000);
}

// 🎮 QUIZ PREMIUM
function initializeQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    let score = 0;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('correct') || this.classList.contains('incorrect')) {
                return; // Não permitir múltiplos cliques
            }
            
            const isCorrect = this.textContent === '18 de Julho de 2025';
            
            // Resetar outras opções
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.style.pointerEvents = 'none';
            });
            
            // Marcar resposta
            this.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {
                score += 100;
                updateQuizScore(score);
                showNotification('🎉 Resposta correta! +100 pontos de amor!');
                
                // Efeito visual
                createFloatingHeart('💝');
                createFloatingHeart('✨');
                createFloatingHeart('🌟');
            } else {
                showNotification('💕 Quase lá! Tente novamente com o coração!');
            }
            
            // Mostrar próxima pergunta após delay
            setTimeout(() => {
                showNotification('📝 Próxima pergunta: Qual nossa música especial?');
            }, 2000);
        });
    });
}

function updateQuizScore(points) {
    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.textContent = points;
    
    // Animação de pontos
    scoreDisplay.style.transform = 'scale(1.3)';
    scoreDisplay.style.color = 'var(--accent)';
    
    setTimeout(() => {
        scoreDisplay.style.transform = 'scale(1)';
        scoreDisplay.style.color = 'var(--primary)';
    }, 300);
}