// rss-feed.js
document.addEventListener("DOMContentLoaded", function() {
    async function fetchRSS(url) {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
        const data = await response.json();
        return data.items;
    }

    function filterItems(items, keywords) {
        return items.filter(item => {
            return keywords.some(keyword => item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                                             item.description.toLowerCase().includes(keyword.toLowerCase()));
        });
    }

    function displayFeed(items) {
        const feedList = document.getElementById('feed-list');
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
            feedList.appendChild(listItem);
        });
    }

    // BioRxiv neuroscience RSS feed URL
    const rssURL = 'http://connect.biorxiv.org/biorxiv_xml.php?subject=neuroscience';
    const keywords = ['curcuit', 'curcuits', 'microcirucuit', 'microcirucuits', 'neurocircuit', 'neural circuits', 'cortex', 'neural']; 
    
    fetchRSS(rssURL)
        .then(items => filterItems(items, keywords))
        .then(filteredItems => displayFeed(filteredItems));
});
