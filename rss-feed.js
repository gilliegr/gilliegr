// RSS feed URLs
const feeds = [
    {
        url: 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1b5VuYnHtAIWGInET_V2UvYIeGrMZqoa8loXd--yWn5XYlrQ89/?limit=15&utm_campaign=pubmed-2&fc=20240723195126',
        title: 'PubMed Feed'
    },
    {
        url: 'https://www.biorxiv.org/rss/content',
        title: 'bioRxiv Feed'
    }
];

// Keywords for filtering
const keywords = [
    'circuit', 'circuits', 'microcircuit', 'microcircuits',
    'neurocircuit', 'neural circuits', 'cortex', 'sensorimotor',
    'optogenetics'
];

// Function to check if any keyword is present in a text
function containsKeyword(text) {
    return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
}

// Function to fetch and parse RSS feed
async function fetchFeed(feed) {
    const response = await fetch(feed.url);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    return xml;
}

// Function to filter feed items based on keywords
function filterItems(items) {
    return Array.from(items).filter(item => {
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        return containsKeyword(title) || containsKeyword(description);
    });
}

// Function to display feed items
function displayFeedItems(xml, feedTitle) {
    const items = xml.querySelectorAll('item');
    const filteredItems = filterItems(items);
    const container = document.getElementById('rss-feeds');
    const feedContainer = document.createElement('div');
    feedContainer.classList.add('feed-container');

    const title = document.createElement('h2');
    title.textContent = feedTitle;
    feedContainer.appendChild(title);

    filteredItems.forEach(item => {
        const link = item.querySelector('link').textContent;
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('feed-item');

        const itemTitle = document.createElement('h3');
        const itemLink = document.createElement('a');
        itemLink.href = link;
        itemLink.textContent = title;
        itemLink.target = '_blank'; // Open link in new tab
        itemTitle.appendChild(itemLink);
        itemContainer.appendChild(itemTitle);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = description;
        itemContainer.appendChild(itemDescription);

        feedContainer.appendChild(itemContainer);
    });

    container.appendChild(feedContainer);
}

// Function to initialize feeds
async function initFeeds() {
    for (const feed of feeds) {
        const xml = await fetchFeed(feed);
        displayFeedItems(xml, feed.title);
    }
}

// Run the function to initialize feeds
initFeeds();
