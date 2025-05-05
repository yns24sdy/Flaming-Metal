// Hamburger menu interaction
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const aboutItem = document.querySelector('.about');
    
    // Switch the main menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('active');
    });

    // Close the menu
    document.addEventListener('click', () => {
        mainNav.classList.remove('active');
        document.querySelectorAll('.sub-nav').forEach(nav => {
            nav.classList.remove('active');
        });
    });

    // Prevent click event bubbling inside the menu
    mainNav.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Sub-menu switching on mobile devices
    aboutItem.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const subNav = aboutItem.querySelector('.sub-nav');
            subNav.classList.toggle('active');
        }
    });

    // Handle the window resize event
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            document.querySelectorAll('.sub-nav').forEach(nav => {
                nav.classList.remove('active');
            });
        }
    });
});

// The original code for the carousel remains unchanged