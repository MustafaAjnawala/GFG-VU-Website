document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-button');
    
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        hideSidebar();
    }
});
