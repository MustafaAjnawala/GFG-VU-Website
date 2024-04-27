document.addEventListener("DOMContentLoaded", function() {
    // Get all the sections and navigation links
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    // Function to check if a section is in view
    function isInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to highlight the active navigation link
    function highlightNavLink() {
        let found = false;
        sections.forEach(section => {
            if (!found && isInView(section)) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").slice(1) === section.id) {
                        link.classList.add("active");
                    }
                });
                found = true;
            }
        });
    }

    // Highlight the active navigation link on page load
    highlightNavLink();

    // Highlight the active navigation link when scrolling
    window.addEventListener("scroll", highlightNavLink);
});
