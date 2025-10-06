// 🌟 INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    initializeParticles();
    startLoveCounter();
    initializeCarousel();
    initializeMusicPlayer();
    initializeModals();
    initializeQuiz();
    initializeFloatingElements();
    setupEventListeners();
    
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
    }, 2000);
});

// 🎪 CONFIGURAÇÕES INICIAIS
function initializeSystem() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
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
    setInterval(updateCounter, 60000);
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
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    let autoPlay = setInterval(nextSlide, 5000);
    
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
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
    
    playPauseBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    loadTrack(currentTrackIndex);
}

// 💌 SISTEMA DE MODAIS
function initializeModals() {
    const messageModal = document.getElementById('messageModal');
    const musicModal = document.getElementById('musicModal');
    const newMessageBtn = document.getElementById('newMessageBtn');
    const addTrackBtn = document.querySelector('.add-track-btn');
    const closeButtons = document.querySelectorAll('.close');
    
    newMessageBtn.addEventListener('click', () => openModal(messageModal));
    addTrackBtn.addEventListener('click', () => openModal(musicModal));
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal'));
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
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
            
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });
            
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
        
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        element.style.animationDuration = (Math.random() * 20 + 10) + 's';
        element.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 30000);
    }
    
    setInterval(createFloatingElement, 2000);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingElement, i * 500);
    }
}

// 🎭 SISTEMA DE TEMA
function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('magicButton').addEventListener('click', triggerMagicEffect);
    document.getElementById('surpriseButton').addEventListener('click', showSpecialSurprise);
    document.getElementById('floatingSurprise').addEventListener('click', triggerSurprise);
    document.getElementById('addNoteBtn').addEventListener('click', addNewNote);
    document.getElementById('addPhotoBtn').addEventListener('click', addPhotoNote);
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
    
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(hearts[Math.floor(Math.random() * hearts.length)]);
    }
    
    showNotification('Magia do amor ativada! ✨💝');
}

function createFloatingHeart(heart) {
    const element = document.createElement('div');
    element.className = 'floating-heart';
    element.textContent = heart;
    element.style.left = Math.random() * 100 + 'vw';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 5000);
}

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
}

function triggerSurprise() {
    const surpriseBtn = document.getElementById('floatingSurprise');
    
    surpriseBtn.style.animation = 'none';
    surpriseBtn.style.transform = 'scale(1.5) rotate(360deg)';
    
    setTimeout(() => {
        surpriseBtn.style.animation = 'float 3s ease-in-out infinite';
        surpriseBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
    
    showNotification('Surpresa! Você é amazing! 💝');
}

// 📝 SISTEMA DE NOTAS
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
    noteElement.className = 'note-card';
    
    const date = new Date().toLocaleDateString('pt-BR');
    
    if (type === 'text') {
        noteElement.innerHTML = `
            <div class="note-header">
                <span class="note-emoji">📝</span>
                <span class="note-date">${date}</span>
            </div>
            <div class="note-content">
                <p>${content}</p>
            </div>
            <div class="note-footer">
                <span class="note-author">Nossa História</span>
                <div class="note-actions">
                    <button class="note-action-btn" onclick="this.closest('.note-card').remove()">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    } else {
        noteElement.innerHTML = `
            <div class="note-header">
                <span class="note-emoji">📸</span>
                <span class="note-date">${date}</span>
            </div>
            <div class="note-content">
                <p>Memória especial 💕</p>
                <img src="${content}" alt="Nossa memória" loading="lazy">
            </div>
            <div class="note-footer">
                <span class="note-author">Nosso Momento</span>
                <div class="note-actions">
                    <button class="note-action-btn" onclick="this.closest('.note-card').remove()">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    notesContainer.prepend(noteElement);
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
    
    playlistTracks.appendChild(trackElement);
}

// 🔔 SISTEMA DE NOTIFICAÇÕES
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
        notification.remove();
    }, 3000);
}

// 🛠️ FUNÇÕES UTILITÁRIAS
function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

console.log('💝 Sistema de Amor inicializado com sucesso!');