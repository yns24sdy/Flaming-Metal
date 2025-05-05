// Dynamically load JSON data
        
        
async function loadBandData() {
    try {
        const response = await fetch('./JavaScript/bands.json'); // Point to a separate JSON file
        const bandData = await response.json();
        renderBands(bandData);
    } catch (error) {
        console.error('Failed to load the band data:', error);
    }
}

// Dynamic rendering function
function renderBands(data) {
    const newsSection = document.querySelector('.news1');
    newsSection.innerHTML = ''; // Clear the original content

    data.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item1';
        
        const newsPic = document.createElement('div');
        newsPic.className = 'news-pic1';
        const img = document.createElement('img');
        img.src = item.image;
        newsPic.appendChild(img);

        const newsText = document.createElement('div');
        newsText.className = 'news-text1';
        newsText.textContent = item.text;

        newsItem.appendChild(newsPic);
        newsItem.appendChild(newsText);
        newsSection.appendChild(newsItem);
        newsItem.addEventListener('click', () => {
            // Store the current band data in localStorage
            localStorage.setItem('selectedBand', JSON.stringify(item));
            // Navigate to the details page
            window.location.href = './BANDS Detail.html';
        });
    });

    // Generate a "MORE" button
    // const moreLink = document.createElement('a');
    // moreLink.className = 'more more1';
    // moreLink.href = '#';
    // moreLink.textContent = 'MORE';
    // newsSection.appendChild(moreLink);
}

// Perform data loading and rendering after the page is loaded
document.addEventListener('DOMContentLoaded', loadBandData);