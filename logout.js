
document.getElementById('logout-button').addEventListener('click', function (event) {
    event.preventDefault();
    // Clear session storage or local storage
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to the home page
    window.location.href = 'index.html';
});

// Prevent back navigation to the page
window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.href = 'index.html';
    }
});

