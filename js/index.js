document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const xButton = document.querySelector('.X');

    function handleResize() {
        if (window.innerWidth < 810) {
            hamburger.style.display = "block";
            xButton.style.display = "none";
            hamburger.addEventListener('click', function () {
                navLinks.classList.add('active');
                hamburger.style.display = "none";
                xButton.style.display = "block";
            });

            xButton.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.style.display = "block";
                xButton.style.display = "none";
            });
        } else {
            hamburger.style.display = "none";
            xButton.style.display = "none";
            navLinks.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the correct display
});

