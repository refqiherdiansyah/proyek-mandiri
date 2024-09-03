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
            button.style.position = 'absolute'; // Ensure proper placement
            button.style.top = '50%'; // Center vertically
            button.style[direction] = '10px'; // 10px from the edge
            button.style.transform = 'translateY(-50%)'; // Center horizontally
            button.style.zIndex = '10'; // Ensure buttons are above carousel content
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

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleLabel = document.getElementById('menu-toggle-label');
    const menu = document.querySelector('.menu');

    let isMenuOpen = false;

    menuToggleLabel.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menu.style.display = isMenuOpen ? 'block' : 'none'; // Toggle menu visibility
        menuToggleLabel.classList.toggle('active', isMenuOpen); // Optionally add an active class
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior (refresh)
            const fullContent = this.previousElementSibling;
            const excerpt = this.previousElementSibling.previousElementSibling;
            if (fullContent.style.display === 'none') {
                fullContent.style.display = 'block';
                excerpt.style.display = 'none';
                this.textContent = 'Read less';
            } else {
                fullContent.style.display = 'none';
                excerpt.style.display = 'block';
                this.textContent = 'Read more';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah halaman untuk refresh
            var fullContent = this.previousElementSibling; // Mendapatkan elemen .full-content

            if (fullContent.style.display === "none" || fullContent.style.display === "") {
                fullContent.style.display = "block";
                this.textContent = "Show Less";
            } else {
                fullContent.style.display = "none";
                this.textContent = "Read more";
            }
        });
    });
});

document.querySelector('.carousel-button-left').addEventListener('click', function() {
    // Fungsi untuk menggeser carousel ke kiri
    moveCarousel(-1); // Misalnya, -1 untuk geser ke kiri
});

document.querySelector('.carousel-button-right').addEventListener('click', function() {
    // Fungsi untuk menggeser carousel ke kanan
    moveCarousel(1); // Misalnya, 1 untuk geser ke kanan
});

function moveCarousel(direction) {
    // Implementasi untuk menggeser carousel
    // Kamu bisa menambahkan logika untuk mengubah posisi slide di sini
    console.log("Carousel bergerak ke arah: " + direction);
}