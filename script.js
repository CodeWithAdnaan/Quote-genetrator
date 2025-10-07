// Array of fallback quotes (in case API fails/offline)
const fallbackQuotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { content: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" }
];

// Elements from HTML
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('newQuote');
const loadingElement = document.getElementById('loading');

// Function to fetch and display a random quote from API
async function getRandomQuote() {
    // Show loading
    loadingElement.style.display = 'block';
    button.disabled = true;
    quoteElement.textContent = '';
    authorElement.textContent = '';

    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('API response not ok');
        }
        const data = await response.json();
        
        // Display the quote and author
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `– ${data.author}`;
    } catch (error) {
        // Fallback to local quote if API fails
        console.error('API error:', error);
        const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        quoteElement.textContent = `"${fallback.content}"`;
        authorElement.textContent = `– ${fallback.author}`;
    } finally {
        // Hide loading
        loadingElement.style.display = 'none';
        button.disabled = false;
    }
}

// Event listener for button click
button.addEventListener('click', getRandomQuote);

// Load initial quote when page loads
document.addEventListener('DOMContentLoaded', getRandomQuote);
