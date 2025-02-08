// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#tabs li a');

    // Initially load the content of the first tab
    loadTabContent(tabs[0].dataset.tab);

    // Add event listeners to switch between tabs
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const activeTab = document.querySelector('#tabs li a.active');
            if (activeTab && activeTab !== this) {
                activeTab.classList.remove('active');
            }
            this.classList.add('active');
            loadTabContent(this.dataset.tab);
        });
    });

    // Function to dynamically load content into the main section
    function loadTabContent(tabId) {
        document.getElementById('content').innerHTML = `
            <h2>${tabId}</h2>
            <p>This is ${tabId} tab's content.</p>
        `;
    }
});
