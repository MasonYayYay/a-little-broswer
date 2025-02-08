const tabs = [];
let currentTabIndex = -1;

function addTab(url) {
    const tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    tabButton.innerText = `Tab ${tabs.length + 1}`;
    
    // Add event listener to switch tab
    tabButton.addEventListener('click', () => {
        currentTabIndex = tabs.length - 1;
        displayContent(tabs[currentTabIndex]);
    });

    document.getElementById('navbar').appendChild(tabButton);
    tabs.push(url);
}

function loadContent(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(html => {
            const contentPlaceholder = document.getElementById('content-placeholder');
            contentPlaceholder.innerHTML = html;
        })
        .catch(error => console.error(error));
}

function displayContent(url) {
    loadContent(url);
}

document.getElementById('address-bar').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        const url = document.getElementById('address-bar').value.trim();
        if (!url.startsWith('http')) url = `http://${url}`;
        addTab(url);
        displayContent(url);
    }
});

// Initial tabs for testing
addTab('https://www.example.com');
addTab('https://www.google.com');

document.querySelector('.back-button').addEventListener('click', () => {
    if (currentTabIndex > 0) currentTabIndex--;
    else return;
    displayContent(tabs[currentTabIndex]);
});

document.querySelector('.forward-button').addEventListener('click', () => {
    if (currentTabIndex < tabs.length - 1) currentTabIndex++;
    else return;
    displayContent(tabs[currentTabIndex]);
});
