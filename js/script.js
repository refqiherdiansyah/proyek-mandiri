document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Handle mouse events
        const handleMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.classList.add('active');
        };

        const handleMouseLeave = () => {
            isDown = false;
            carousel.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            carousel.classList.remove('active');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2.5; // Adjust scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        };

        // Handle touch events
        const handleTouchStart = (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.classList.add('active');
        };

        const handleTouchEnd = () => {
            isDown = false;
            carousel.classList.remove('active');
        };

        const handleTouchMove = (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2.5; // Adjust scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        };

        // Event listeners for mouse and touch controls
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mouseleave', handleMouseLeave);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mousemove', handleMouseMove);

        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchend', handleTouchEnd);
        carousel.addEventListener('touchmove', handleTouchMove);

        // Adding navigation buttons
        const createButton = (direction) => {
            const button = document.createElement('button');
            button.className = `carousel-button carousel-button-${direction}`;
            button.textContent = direction === 'left' ? '←' : '→';
            return button;
        };

        const leftButton = createButton('left');
        const rightButton = createButton('right');

        carousel.appendChild(leftButton);
        carousel.appendChild(rightButton);

        leftButton.addEventListener('click', () => {
            carousel.scrollLeft -= carousel.offsetWidth / 2;
        });

        rightButton.addEventListener('click', () => {
            carousel.scrollLeft += carousel.offsetWidth / 2;
        });

        // Auto-scroll functionality
        let scrollInterval;

        const autoScroll = () => {
            if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth)) {
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft += 2; // Adjust auto-scroll speed
            }
        };

        const startAutoScroll = () => {
            scrollInterval = setInterval(autoScroll, 30); // Auto-scroll interval
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);

        // Start auto-scrolling by default
        startAutoScroll();
    });
});
