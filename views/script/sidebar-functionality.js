document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-button');
    
    // Check if the viewport width is below a certain threshold or it's a mobile device
    if (window.innerWidth <= 801 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Check if the clicked element is a link
        if (event.target.closest('a')) {
            return; // If it's a link, do nothing and return early
        }
        
        // Check if the click is outside the sidebar and menu button
        if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
            hideSidebar();
        }
    }
});
