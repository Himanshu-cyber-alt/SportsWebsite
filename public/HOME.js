document.addEventListener('DOMContentLoaded', () => {
    const bannerContainer = document.querySelector('.banner-container');
    const banners = document.querySelectorAll('.banner');
    const prevButton = document.querySelector('.banner-controls .prev');
    const nextButton = document.querySelector('.banner-controls .next');
    let currentBanner = 0;
    let bannerInterval;
    let isAnimating = false;

    // Set initial positions
    banners.forEach((banner, index) => {
        banner.style.transform = `translateX(${index * 100}%)`;
    });

    // Function to shift banners with animation
    function shiftBanners(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const offset = direction === 'next' ? -100 : 100;
        const newPosition = currentBanner + (direction === 'next' ? 1 : -1);
        const nextIndex = (newPosition + banners.length) % banners.length;

        // Animate all banners
        banners.forEach((banner, index) => {
            const currentPosition = parseInt(banner.style.transform.replace('translateX(', '').replace('%)', ''));
            const newPosition = currentPosition + offset;
            banner.style.transition = 'transform 0.5s ease-in-out';
            banner.style.transform = `translateX(${newPosition}%)`;
        });

        // Reset positions after animation
        setTimeout(() => {
            banners.forEach((banner, index) => {
                banner.style.transition = 'none';
                const position = (index - nextIndex) * 100;
                banner.style.transform = `translateX(${position}%)`;
            });
            currentBanner = nextIndex;
            isAnimating = false;
        }, 500);
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        clearInterval(bannerInterval);
        shiftBanners('next');
        startBannerInterval();
    });

    prevButton.addEventListener('click', () => {
        clearInterval(bannerInterval);
        shiftBanners('prev');
        startBannerInterval();
    });

    // Function to start the automatic banner rotation
    function startBannerInterval() {
        bannerInterval = setInterval(() => {
            shiftBanners('next');
        }, 3000);
    }

    // Start the automatic banner rotation
    startBannerInterval();

    // Pause banner rotation on hover
    bannerContainer.addEventListener('mouseenter', () => {
        clearInterval(bannerInterval);
    });

    bannerContainer.addEventListener('mouseleave', () => {
        startBannerInterval();
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.category-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

const cartIcon = document.querySelector('.fa-shopping-cart');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

cartIcon.addEventListener('click', () => {
  cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
});
