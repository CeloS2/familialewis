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

    // Cena 3D do Dragão
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
    
    // Carregar modelo 3D do dragão (substitua pelo seu modelo)
    // Esta é uma implementação simplificada - você precisará de um modelo GLTF/GLB real
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
    
    // Animação do dragão
    function animateDragon() {
        requestAnimationFrame(animateDragon);
        
        dragon.rotation.x += 0.005;
        dragon.rotation.y += 0.01;
        
        // Efeito de pulsação
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        dragon.scale.set(scale, scale, scale);
        
        renderer.render(scene, camera);
    }
    
    animateDragon();
    
    // Ajustar ao redimensionar a janela
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Efeito de rastro na navegação
    const navLinks = document.querySelectorAll('.nav-link');
    const navTrail = document.querySelector('.nav-dragon-trail');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const linkRect = this.getBoundingClientRect();
            navTrail.style.width = `${linkRect.width}px`;
            navTrail.style.left = `${linkRect.left}px`;
            navTrail.style.transform = 'scaleX(1)';
        });
        
        link.addEventListener('mouseleave', function() {
            navTrail.style.transform = 'scaleX(0)';
        });
    });
    
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
});