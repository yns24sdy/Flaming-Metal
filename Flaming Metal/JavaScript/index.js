// The data of the carousel is read from JSON
let currentIndex = 0;
let timer;
const carouselContent = document.querySelector('.carousel-content');
const indicators = document.querySelector('.carousel-indicators');
const slides = [];
const dots = [];

// Load JSON data
fetch('./JavaScript/carousel-data.json') // Suppose the path of the JSON file is "carousel-data.json"
    .then(response => response.json())
    .then(data => {
        // Render the content of the carousel
        data.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.innerHTML = `
                <img src="${item.image}" />
                <h3>${item.title}</h3>
            `;
            slide.classList.add('carousel-item');
            carouselContent.appendChild(slide);
            slides.push(slide);

            // Render the indicator dots
            const dot = document.createElement('span');
            dot.classList.add('dot');
            indicators.appendChild(dot);
            dots.push(dot);
        });

        // Initialize to display the first slide
        showSlide(0);
        startTimer();

        // Move the event binding to after the data loading is completed. (Important!)
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                resetTimer(); // Add a timer reset
            });
        });
    })
    .catch(error => console.error('Failed to load the carousel data:', error));

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetTimer(); // New addition: Reset the timer after each manual switch
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    resetTimer(); // New addition: Reset the timer after each manual switch
}

function startTimer() {
    timer = setInterval(nextSlide, 3000);
}

// Event binding - Modify the mouse event handling
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(timer);
    timer = null; // Clear the timer reference
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
    if (!timer) { // Restart the timer only when it doesn't exist
        startTimer();
    }
});
document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

// The updated timer reset function
function resetTimer() {
    clearInterval(timer);
    // If it is currently the last slide, return to the starting point and restart the timing
    if(currentIndex === slides.length - 1) {
        currentIndex = -1; // Make nextSlide automatically increment by 1 and then become 0
    }
    startTimer();
}