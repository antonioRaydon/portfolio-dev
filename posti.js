document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cover-card');
    const prevBtn = document.getElementById('cover-left');
    const nextBtn = document.getElementById('cover-right');

    if (!cards.length) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        cards.forEach((card, index) => {
            // Calcula o offset relativo considerando a rotação infinita
            let offset = index - currentIndex;

            if (offset < -Math.floor(totalCards / 2)) {
                offset += totalCards;
            } else if (offset > Math.floor(totalCards / 2)) {
                offset -= totalCards;
            }

            const absOffset = Math.abs(offset);

            if (absOffset > 2) {
                // Oculta cards fora da visão principal
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'translate(-50%, -50%) scale(0)';
                card.style.zIndex = '0';
            } else {
                // Exibe e aplica os efeitos 3D baseados na posição
                card.style.visibility = 'visible';
                card.style.opacity = offset === 0 ? '1' : '0.6';

                const translateX = offset * 240; // Distância horizontal
                const scale = 1 - absOffset * 0.18; // Escala dos cards laterais
                const rotateY = offset * -25; // Ângulo de rotação 3D
                const zIndex = 10 - absOffset;

                card.style.transform = `translate(calc(-50% + ${translateX}px), -50%) scale(${scale}) rotateY(${rotateY}deg)`;
                card.style.zIndex = zIndex;
                card.style.filter = offset === 0 ? 'none' : 'blur(2px) grayscale(40%)';
            }
        });
    }

    // Navegação para a esquerda (anterior)
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    // Navegação para a direita (próximo)
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    // Suporte a gestos/swipe para dispositivos móveis
    let startX = 0;
    let endX = 0;
    const carouselContainer = document.querySelector('.cover-carousel');

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50; // Distância mínima do deslize
        if (startX - endX > threshold) {
            // Deslizou para a esquerda -> próximo
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        } else if (endX - startX > threshold) {
            // Deslizou para a direita -> anterior
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }
    }

    // Inicializa a galeria
    updateCarousel();
});