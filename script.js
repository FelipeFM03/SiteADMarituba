// Espera que todo o conteúdo da página (HTML) seja carregado UMA SÓ VEZ
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MENU HAMBÚRGUER ---

    const menuToggleButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    // Verifica se o botão do menu existe (evita erros em páginas que não o tenham)
    if (menuToggleButton && menu) {
        menuToggleButton.addEventListener('click', function() {
            menu.classList.toggle('ativo');
            
            const icone = menuToggleButton.querySelector('i');
            if (menu.classList.contains('ativo')) {
                icone.classList.remove('fa-bars');
                icone.classList.add('fa-times');
            } else {
                icone.classList.remove('fa-times');
                icone.classList.add('fa-bars');
            }
        });

        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (menu.classList.contains('ativo')) {
                    menu.classList.toggle('ativo');
                    
                    const icone = menuToggleButton.querySelector('i');
                    icone.classList.remove('fa-times');
                    icone.classList.add('fa-bars');
                }
            });
        });
    }

    // --- FIM DA LÓGICA DO MENU ---

    // --- INÍCIO DA LÓGICA DO CAROUSEZ DE TEMPLOS (V5 - Correção do "Piscar") ---

    // --- PASSO 1: O "ARMAZÉM" DE DADOS ---
    const templosData = [
        {
            nome: "Templo Central",
            morada: "R. da Assembléia 1 de Maio, 15, Marituba-PA",
            imagem: "imagens/FAIXADA-TC-MARITUBA.jpeg",
            linkMapa: "http://googleusercontent.com/maps/google.com/0"
        },
        {
            nome: "Templo AD. Bella Cittá",
            morada: "Bairro Parque Verde, Marituba - PA",
            imagem: "imagens/FAIXADA-AD-BELLA-CITTÁ.jpeg",
            linkMapa: "http://googleusercontent.com/maps/google.com/1"
        },
        {
            nome: "Templo Exemplo 3",
            morada: "Morada do Templo 3",
            imagem: "imagens/templo-generico.jpg",
            linkMapa: "#"
        },
        {
            nome: "Templo Exemplo 4",
            morada: "Morada do Templo 4",
            imagem: "imagens/templo-generico.jpg",
            linkMapa: "#"
        },
        {
            nome: "Templo Exemplo 5",
            morada: "Morada do Templo 5",
            imagem: "imagens/templo-generico.jpg",
            linkMapa: "#"
        }
        // 📌 ADICIONA OS OUTROS 100+ TEMPLOS AQUI
    ];

    const track = document.getElementById('carousel-track');
    
    if (track) { 
        const btnNext = document.getElementById('carousel-next');
        const btnPrev = document.getElementById('carousel-prev');
        const numClones = 3; 

        if (templosData.length > numClones) {
            
            const clonesFim = templosData.slice(0, numClones);
            const clonesInicio = templosData.slice(-numClones);
            const dadosComClones = [...clonesInicio, ...templosData, ...clonesFim];
            let indiceTemploCentral = numClones;
            let isTransitioning = false; // true = animação a decorrer

            // --- PASSO 2: A "FÁBRICA" ---
            function carregarTemplos() {
                let htmlCards = '';
                dadosComClones.forEach((templo, index) => {
                    let classeClone = (index < numClones || index >= numClones + templosData.length) ? 'clone' : '';
                    htmlCards += `
                        <div class="templo-card ${classeClone}">
                            <img src="${templo.imagem}" alt="Foto de ${templo.nome}">
                            <h3>${templo.nome}</h3>
                            <p>${templo.morada}</p>
                            <a href="${templo.linkMapa}" target="_blank" class="btn-mapa">
                                <i class="fas fa-map-marker-alt"></i> Ver no Mapa
                            </a>
                        </div>
                    `;
                });
                track.innerHTML = htmlCards;

                // Posicionamento inicial
                track.classList.add('no-transition');
                atualizarCarouselVisual();
                track.offsetHeight; 
                track.classList.remove('no-transition');
            }

            // --- PASSO 3: A LÓGICA DO CAROUSEL ---
            function atualizarCarouselVisual() {
                const cards = track.querySelectorAll('.templo-card');
                if (cards.length === 0) return;

                const cardWidth = cards[0].offsetWidth;
                const cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) + parseInt(window.getComputedStyle(cards[0]).marginLeft);
                const cardTotalWidth = cardWidth + cardMargin;
                
                const viewportWidth = track.parentElement.offsetWidth;
                const offset = (viewportWidth / 2) - (indiceTemploCentral * cardTotalWidth) - (cardWidth / 2);

                track.style.transform = `translateX(${offset}px)`;

                cards.forEach((card, index) => {
                    card.classList.remove('ativo', 'lado');
                    if (index === indiceTemploCentral) {
                        card.classList.add('ativo');
                    } else if (index === indiceTemploCentral - 1 || index === indiceTemploCentral + 1) {
                        card.classList.add('lado');
                    }
                });
            }

            // --- PASSO 4: OS BOTÕES ---
            btnNext.addEventListener('click', moverParaProximo);
            btnPrev.addEventListener('click', moverParaAnterior);

            function moverParaProximo() {
                if (isTransitioning) return;
                isTransitioning = true; // Bloqueia novos cliques
                indiceTemploCentral++;
                atualizarCarouselVisual();
            }

            function moverParaAnterior() {
                if (isTransitioning) return;
                isTransitioning = true; // Bloqueia novos cliques
                indiceTemploCentral--;
                atualizarCarouselVisual();
            }

            // --- PASSO 5: A "MÁGICA" (O Salto Instantâneo) ---
            track.addEventListener('transitionend', () => {
                
                let needsJump = false;
                
                if (indiceTemploCentral === numClones + templosData.length) {
                    indiceTemploCentral = numClones;
                    needsJump = true;
                }
                
                if (indiceTemploCentral === numClones - 1) {
                    indiceTemploCentral = numClones + templosData.length - 1;
                    needsJump = true;
                }

                if (needsJump) {
                    // Faz o "salto" sem animação
                    track.classList.add('no-transition');
                    atualizarCarouselVisual();
                    track.offsetHeight; // Força o "salto"
                    track.classList.remove('no-transition');
                }
                
                // ✅ ✅ A CORREÇÃO ESTÁ AQUI ✅ ✅
                // Nós SÓ desbloqueamos os cliques (isTransitioning = false)
                // DEPOIS de a animação ter terminado E o "salto"
                // (se necessário) ter sido concluído.
                isTransitioning = false;
            });
            
            // --- PASSO 6: INICIAR TUDO ---
            carregarTemplos();
            window.addEventListener('resize', () => {
                track.classList.add('no-transition');
                atualizarCarouselVisual();
                track.offsetHeight;
                track.classList.remove('no-transition');
            });

            // --- PASSO 7: FUNCIONALIDADE (SWIPE / TOUCH) ---
            let touchStartX = 0;
            let touchEndX = 0;

            track.addEventListener('touchstart', (e) => {
                if (isTransitioning) return; 
                touchStartX = e.touches[0].clientX;
                touchEndX = 0; 
            }, { passive: true });

            track.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            track.addEventListener('touchend', () => {
                if (isTransitioning) return;
                if (touchEndX === 0) return; 

                const diffX = touchStartX - touchEndX;
                const threshold = 50; // Mínimo de 50px de swipe

                if (diffX > threshold) {
                    moverParaProximo();
                } else if (diffX < -threshold) {
                    moverParaAnterior();
                }
                
                touchStartX = 0;
                touchEndX = 0;
            });

        } else {
            console.warn("Carousel: Não há itens suficientes para ativar o loop infinito.");
        }
    }
    // --- FIM DA LÓGICA DO CAROUSEL ---

});
// --- FIM DO FICHEIRO ---