document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const xButton = document.querySelector('.X');

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
});
