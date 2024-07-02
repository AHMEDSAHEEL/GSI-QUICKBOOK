function showLogin() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(0%)';
}

function showSignup() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(-50%)';
}

function validateLoginForm() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    return confirm("login successfull");
}
function validateSignupForm() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;

    if (username.length < 6) {
        alert('Username must have at least 6 characters');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid Email address.');
        return false;
    }

    if (password.length < 8) {
        alert('Password must have at least 8 characters');
        return false;
    }

    if (!validatePhoneNumber(phone)) {
        alert('Phone number must have 10 digits.');
        return false;
    }

    return confirm("Signup successfull");
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhoneNumber(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}