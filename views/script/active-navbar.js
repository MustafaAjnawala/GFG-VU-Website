// Function to add active class to navigation items based on scroll position
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navItems.forEach(item => {
                if (item.getAttribute('href').slice(1) === id) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// Add event listener for scroll event
window.addEventListener('scroll', setActiveNavItem);

// Add event listener for page load
window.addEventListener('load', setActiveNavItem);
