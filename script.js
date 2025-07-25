document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas douradas
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#d4af37"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#d4af37",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Cena 3D do Dragão com efeito de fogo
    const dragonContainer = document.getElementById('dragon-container');
    
    // Configuração da cena Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    dragonContainer.appendChild(renderer.domElement);
    
    // Luzes
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xd4af37, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xd4af37, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Posição da câmera
    camera.position.z = 5;
    
    // Criar dragão com efeito de fogo
    createDragon();
    function createDragon() {
    // Corpo do dragão
    const dragonGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const dragonMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xd4af37,
        emissiveIntensity: 0.2
    });
    
    const dragon = new THREE.Mesh(dragonGeometry, dragonMaterial);
    scene.add(dragon);
    
    // Animação do dragão (sem fogo)
    function animate() {
        requestAnimationFrame(animate);
        
        dragon.rotation.x += 0.005;
        dragon.rotation.y += 0.01;
        
        // Efeito de pulsação suave
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05; // Reduzi a intensidade
        dragon.scale.set(scale, scale, scale);
        
        renderer.render(scene, camera);
    }
    
    animate();
}
    
    // Efeito de rolagem nas seções históricas
    const historyItems = document.querySelectorAll('.history-item');
    
    historyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(212, 175, 55, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Efeito de digitação no título
    const title = document.querySelector('.header-content h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 150);

    // Sistema de Eventos
    const eventsContainer = document.getElementById('events-container');
    const addEventBtn = document.getElementById('add-event-btn');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.querySelector('.close-modal');
    const eventForm = document.getElementById('event-form');

    // Exemplo de eventos iniciais
    const initialEvents = [
        {
            title: "Festa no Palácio Lewis",
            date: "2025-08-15",
            description: "Celebração dos 3 meses da família Lewis no Avakin Life. Traje dourado obrigatório.",
            image: "https://via.placeholder.com/600x400/000000/d4af37?text=Festa+Pal%C3%A1cio+Lewis"
        },
        {
            title: "Torneio de Dragões",
            date: "2025-09-20",
            description: "Competição exclusiva para membros da família Lewis no Avakin Life.",
            image: "https://via.placeholder.com/600x400/000000/d4af37?text=Torneio+Drag%C3%B5es"
        }
    ];

    // Carregar eventos iniciais
    initialEvents.forEach(event => addEventToDOM(event));

    // Abrir modal para adicionar evento
    addEventBtn.addEventListener('click', () => {
        eventModal.style.display = 'flex';
    });

    // Fechar modal
    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });

    // Adicionar novo evento
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;
        const imageInput = document.getElementById('event-image');
        
        let imageUrl = "https://via.placeholder.com/600x400/000000/d4af37?text=" + encodeURIComponent(title);
        
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUrl = e.target.result;
                addEvent({ title, date, description, image: imageUrl });
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            addEvent({ title, date, description, image: imageUrl });
        }
    });

    function addEvent(event) {
        addEventToDOM(event);
        eventModal.style.display = 'none';
        eventForm.reset();
    }

    function addEventToDOM(event) {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <span class="event-date">${formatDate(event.date)}</span>
            <p>${event.description}</p>
        `;
        eventsContainer.appendChild(eventElement);
    }

    // Sistema de Galeria
    const galleryContainer = document.getElementById('gallery-container');
    const imageUpload = document.getElementById('image-upload');

    // Exemplo de imagens iniciais
    const initialImages = [
        "https://via.placeholder.com/600x600/000000/d4af37?text=Pal%C3%A1cio+Lewis",
        "https://via.placeholder.com/600x600/000000/d4af37?text=Fam%C3%ADlia+Lewis",
        "https://via.placeholder.com/600x600/000000/d4af37?text=Evento+Dourado"
    ];

    // Carregar imagens iniciais
    initialImages.forEach(imageUrl => addImageToGallery(imageUrl));

    // Adicionar novas imagens
    imageUpload.addEventListener('change', (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 10); // Limitar a 10 arquivos
            files.forEach(file => {
                if (file.size > 20 * 1024 * 1024) { // Limitar a 20MB
                    alert(`A imagem ${file.name} é muito grande. Tamanho máximo: 20MB`);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    addImageToGallery(event.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
    });

    function addImageToGallery(imageUrl) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${imageUrl}" alt="Imagem da galeria">`;
        galleryContainer.appendChild(galleryItem);
    }

    // Função auxiliar para formatar data
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    // Criar dragão com efeito de fogo
    function createDragonWithFire() {
        // Corpo do dragão
        const dragonGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
        const dragonMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xd4af37,
            emissiveIntensity: 0.2
        });
        
        const dragon = new THREE.Mesh(dragonGeometry, dragonMaterial);
        scene.add(dragon);
        
        // Efeito de fogo
        createFireEffect(dragon);
        
        // Animação do dragão
        function animate() {
            requestAnimationFrame(animate);
            
            dragon.rotation.x += 0.005;
            dragon.rotation.y += 0.01;
            
            // Efeito de pulsação
            const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
            dragon.scale.set(scale, scale, scale);
            
            renderer.render(scene, camera);
        }
        
        animate();
    }
    
    // Criar efeito de fogo saindo da boca do dragão
    function createFireEffect(dragon) {
        // Criar partículas para o fogo
        const fireParticles = new THREE.BufferGeometry();
        const particleCount = 500;
        
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);
        const sizeArray = new Float32Array(particleCount);
        
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 2;
            colorArray[i] = Math.random();
        }
        
        for(let i = 0; i < particleCount; i++) {
            sizeArray[i] = Math.random() * 2;
        }
        
        fireParticles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        fireParticles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        fireParticles.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
        
        // Material das partículas
        const fireMaterial = new THREE.PointsMaterial({
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        // Gradiente de cores para o fogo (dourado/laranja)
        fireMaterial.color = new THREE.Color(0xd4af37);
        
        // Sistema de partículas
        const fire = new THREE.Points(fireParticles, fireMaterial);
        fire.position.set(0, 0, -1); // Posicionar na "boca" do dragão
        dragon.add(fire);
        
        // Animação do fogo
        function animateFire() {
            const positions = fire.geometry.attributes.position.array;
            const colors = fire.geometry.attributes.color.array;
            
            for(let i = 0; i < particleCount; i++) {
                // Mover partículas para cima (simulando fogo)
                positions[i * 3 + 1] += 0.02 + Math.random() * 0.02;
                
                // Resetar partículas que saíram muito
                if(positions[i * 3 + 1] > 2) {
                    positions[i * 3] = (Math.random() - 0.5) * 0.5;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
                }
                
                // Mudar cores para efeito de fogo
                colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
                colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
                colors[i * 3 + 2] = 0.1 + Math.random() * 0.1; // B
            }
            
            fire.geometry.attributes.position.needsUpdate = true;
            fire.geometry.attributes.color.needsUpdate = true;
            
            requestAnimationFrame(animateFire);
        }
        
        animateFire();
    }
});

// ---------------- LOGIN DO ADMINISTRADOR -----------------
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminModal = document.getElementById('admin-login-modal');
const closeAdminModal = document.querySelector('.close-admin-modal');
const passwordInput = document.getElementById('admin-password-input');
const submitPasswordBtn = document.getElementById('submit-admin-password');

const addEventBtn = document.getElementById('add-event-btn');
const imageUploadInput = document.getElementById('image-upload');

// SHA-256 da senha 'lewis2025'
const ADMIN_HASH = 'b8cb6f51e71e4079d5b7a91f32fa01720db7be4433f3770ec582a2e75d2fa429';
let isAdmin = false;
let sessionTimeout;

// Ocultar controles admin inicialmente
function lockAdminControls() {
    addEventBtn.style.display = 'none';
    imageUploadInput.disabled = true;
}
function unlockAdminControls() {
    addEventBtn.style.display = 'inline-block';
    imageUploadInput.disabled = false;
}

// Função de hash SHA-256
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Login
adminLoginBtn.addEventListener('click', () => {
    adminModal.style.display = 'flex';
    passwordInput.value = '';
});
closeAdminModal.addEventListener('click', () => {
    adminModal.style.display = 'none';
});
submitPasswordBtn.addEventListener('click', async () => {
    const typed = passwordInput.value.trim();
    const hash = await hashString(typed);
    if (hash === ADMIN_HASH) {
        isAdmin = true;
        unlockAdminControls();
        adminModal.style.display = 'none';
        startSessionTimeout();
    } else {
        alert('Senha incorreta!');
    }
});
window.addEventListener('click', (e) => {
    if (e.target === adminModal) adminModal.style.display = 'none';
});

// Sessão com timeout (5 minutos)
function startSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        isAdmin = false;
        lockAdminControls();
        alert('Sessão encerrada. Faça login novamente.');
    }, 5 * 60 * 1000);
}

// Iniciar com proteção ativa
lockAdminControls();
 });
