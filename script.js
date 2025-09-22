// Dados das fotos da galeria
const galleryPhotos = [
    {
        id: 1,
        title: "Dia na Praia",
        description: "Um dia maravilhoso na praia aproveitando o sol",
        image: "https://images.unsplash.com/photo-1526662092590-e314cbeaf8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        date: "15/05/2023",
        category: "Viagens"
    },
    {
        id: 2,
        title: "Jantar Romântico",
        description: "Celebrando nosso aniversário de namoro",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80",
        date: "22/06/2023",
        category: "Especiais"
    },
    {
        id: 3,
        title: "Piquenique no Parque",
        description: "Domingo relaxante no parque da cidade",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        date: "10/07/2023",
        category: "Dia a Dia"
    },
    {
        id: 4,
        title: "Viagem às Montanhas",
        description: "Fim de semana nas montanhas",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        date: "05/08/2023",
        category: "Viagens"
    },
    {
        id: 5,
        title: "Noite de Filme",
        description: "Sessão de cinema em casa",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        date: "18/08/2023",
        category: "Dia a Dia"
    },
    {
        id: 6,
        title: "Celebração de Noivado",
        description: "Momento especial com família e amigos",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        date: "02/09/2023",
        category: "Especiais"
    },
    {
        id: 7,
        title: "Café da Manhã",
        description: "Início de dia juntos",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        date: "20/09/2023",
        category: "Dia a Dia"
    },
    {
        id: 8,
        title: "Pôr do Sol",
        description: "Fim de tarde na varanda",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        date: "28/09/2023",
        category: "Dia a Dia"
    }
];

// Elementos do DOM
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const imageTitle = document.getElementById('imageTitle');
const imageDate = document.getElementById('imageDate');

// Função para renderizar as fotos na galeria
function renderGallery(photos) {
    galleryGrid.innerHTML = '';
    
    photos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="gallery-item-overlay">
                <h3>${photo.title}</h3>
                <p>${photo.date}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openModal(photo);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Função para abrir o modal com a imagem
function openModal(photo) {
    modalImage.src = photo.image;
    imageTitle.textContent = photo.title;
    imageDate.textContent = photo.date;
    imageModal.style.display = 'flex';
}

// Função para fechar o modal
function closeModalFunc() {
    imageModal.style.display = 'none';
}

// Filtros da galeria
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe active ao botão clicado
        button.classList.add('active');
        
        // Filtra as fotos
        const filter = button.textContent;
        let filteredPhotos;
        
        if (filter === 'Todos') {
            filteredPhotos = galleryPhotos;
        } else {
            filteredPhotos = galleryPhotos.filter(photo => photo.category === filter);
        }
        
        renderGallery(filteredPhotos);
    });
});

// Event Listeners
closeModal.addEventListener('click', closeModalFunc);

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeModalFunc();
    }
});

// Inicializar a galeria quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(galleryPhotos);
    
    // Adiciona smooth scrolling para os links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});