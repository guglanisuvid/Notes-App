const quotesUrl = "https://api.quotable.io/random?minLength=40&maxLength=80"; // API URL to fetch random quotes

// Fetching quotes data from 'quotesUrl'
async function getQuoteData() {
    const res = await fetch(quotesUrl); // Fetching quotes data
    const resData = await res.json();

    getQuote(resData);
}

// Getting author name and quote
function getQuote(data) {
    const author = data.author;
    const content = data.content;
    showQuote(author, content);
}

// Displaying quote and author name
function showQuote(author, content) {
    document.getElementById('quote').innerHTML += `
        <div id="quoteContent">
        <p>
            ${content}
        </p>
        </div>
        <div id="author"><p>${author}</p></div>
    `
}

getQuoteData();