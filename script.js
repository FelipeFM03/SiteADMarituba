// Espera que todo o conteúdo da página (HTML) seja carregado
document.addEventListener('DOMContentLoaded', function() {

    // 1. Encontrar os elementos no HTML
    // O 'const' cria uma variável que não vai mudar.
    // Usamos 'getElementById' porque demos IDs únicos a estes elementos no HTML.
    
    // O botão de 3 barras (hambúrguer)
    const menuToggleButton = document.getElementById('menu-toggle');
    
    // O menu de navegação em si
    const menu = document.getElementById('menu');

    // 2. Adicionar um "ouvidor de eventos" (EventListener)
    // Dizemos ao botão: "Ouve pelo evento 'click'!"
    menuToggleButton.addEventListener('click', function() {
        
        // 3. A Ação (O que fazer quando houver um clique)
        // 'classList.toggle' é uma função mágica:
        // Se a classe 'ativo' NÃO existir no menu, ele adiciona.
        // Se a classe 'ativo' JÁ existir no menu, ele remove.
        menu.classList.toggle('ativo');

        // (Bónus: Mudar o ícone de barras para um 'X' quando o menu está aberto)
        const icone = menuToggleButton.querySelector('i'); // Apanha o ícone <i> dentro do botão
        if (menu.classList.contains('ativo')) {
            icone.classList.remove('fa-bars'); // Remove ícone de barras
            icone.classList.add('fa-times'); // Adiciona ícone 'X' (fechar)
        } else {
            icone.classList.remove('fa-times'); // Remove ícone 'X'
            icone.classList.add('fa-bars'); // Adiciona ícone de barras
        }
    });
    
    // 4. (Opcional, mas muito bom) Fechar o menu ao clicar num link
    // Seleciona TODOS os links <a> dentro do menu
    const menuLinks = menu.querySelectorAll('a');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Se o menu estiver ativo (visível no móvel), esconde-o
            if (menu.classList.contains('ativo')) {
                menu.classList.toggle('ativo');
                
                // Também garante que o ícone volta a ser 'barras'
                const icone = menuToggleButton.querySelector('i');
                icone.classList.remove('fa-times');
                icone.classList.add('fa-bars');
            }
        });
    });

});