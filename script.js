// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const imagens = document.querySelectorAll('.imagem-galeria');
    const header = document.querySelector('.cabeçalho');
    
    // Contador de café
    let contadorCafe = 0;
    
    // Função para scroll suave
    function scrollSuave(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - menu.offsetHeight,
            behavior: 'smooth'
        });
    }

    // Adiciona scroll suave aos links do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', scrollSuave);
    });

    // Efeito de parallax no header
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        header.style.backgroundPositionY = scroll * 0.5 + 'px';
    });

    // Animação das imagens da galeria
    imagens.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Menu responsivo
    const menuResponsivo = () => {
        if (window.innerWidth <= 768) {
            menu.classList.add('menu-mobile');
        } else {
            menu.classList.remove('menu-mobile');
        }
    };

    window.addEventListener('resize', menuResponsivo);
    menuResponsivo();

    // Efeito de digitação no título
    const titulo = document.querySelector('.cabeçalho h1');
    const textoOriginal = titulo.textContent;
    titulo.textContent = '';

    function digitarTexto(elemento, texto, i = 0) {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            setTimeout(() => digitarTexto(elemento, texto, i + 1), 100);
        }
    }

    digitarTexto(titulo, textoOriginal);

    // Contador de café interativo
    const criarContadorCafe = () => {
        const contador = document.createElement('div');
        contador.className = 'contador-cafe';
        contador.innerHTML = `
            <p>Cafés servidos hoje: <span>${contadorCafe}</span></p>
            <button class="btn-cafe">+1 Café</button>
        `;
        document.querySelector('.secao-principal').appendChild(contador);

        const btnCafe = contador.querySelector('.btn-cafe');
        btnCafe.addEventListener('click', () => {
            contadorCafe++;
            contador.querySelector('span').textContent = contadorCafe;
            
            // Efeito de confete ao atingir múltiplos de 10
            if (contadorCafe % 10 === 0) {
                mostrarConfete();
            }
        });
    };

    // Função para mostrar confete
    function mostrarConfete() {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(confete);

        // Criar partículas de confete
        for (let i = 0; i < 50; i++) {
            const particula = document.createElement('div');
            particula.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${getRandomColor()};
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: cair ${Math.random() * 2 + 1}s linear forwards;
            `;
            confete.appendChild(particula);
        }

        // Remover confete após a animação
        setTimeout(() => confete.remove(), 3000);
    }

    // Função para gerar cores aleatórias
    function getRandomColor() {
        const cores = ['#D4A373', '#8B4513', '#4A2C2A', '#FEFAE0'];
        return cores[Math.floor(Math.random() * cores.length)];
    }

    // Adicionar estilos CSS para animação do confete
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cair {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
        
        .contador-cafe {
            text-align: center;
            margin: 2rem 0;
            padding: 1rem;
            background-color: var(--cor-branca);
            border-radius: 8px;
            box-shadow: 0 2px 5px var(--cor-sombra);
        }

        .btn-cafe {
            background-color: var(--cor-secundaria);
            color: var(--cor-branca);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-cafe:hover {
            background-color: var(--cor-destaque);
        }
    `;
    document.head.appendChild(style);

    // Inicializar contador de café
    criarContadorCafe();

    // Adicionar efeito de fade-in aos elementos quando aparecem na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.secao-principal > *, .secao-secundaria > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}); 