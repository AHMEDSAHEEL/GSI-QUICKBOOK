// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS1H8GgHeXxprx2yro5dIxFA0O_0wyl70",
    authDomain: "loginsignupgsi.firebaseapp.com",
    projectId: "loginsignupgsi",
    storageBucket: "loginsignupgsi.appspot.com",
    messagingSenderId: "70847031831",
    appId: "1:70847031831:web:163cb409e13163040a0a52"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Your existing functions...


function showLogin() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(0%)';
}

function showSignup() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(-50%)';
}

function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    document.getElementById('emailErr').textContent = '';
    document.getElementById('passErr').textContent = '';
    document.getElementById('success').textContent = '';

    const spinner = document.getElementById('login-spinner');
    spinner.style.display = 'block';

    if (!validateEmail(email)) {
        spinner.style.display = 'none';
        document.getElementById('emailErr').textContent = 'Enter Valid Email';
        return false;
    }

    if (password.length < 8 || !validatePasswordComplexity(password)) {
        spinner.style.display = 'none';
        document.getElementById('passErr').textContent = 'Password must have 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
        return false;
    }

    // Firebase authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            spinner.style.display = 'none';
            const successMessage = document.getElementById('success');
            successMessage.textContent = 'Login Successfully ✅';
            window.location.href = "../html/dashBoard.html";
            successMessage.classList.add('success-message');

            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';

            setTimeout(() => {
                successMessage.classList.remove('success-message');
                successMessage.textContent = '';
            }, 3000);
        })
        .catch((error) => {
            spinner.style.display = 'none';
            document.getElementById('passErr').textContent = 'Incorrect email or password.';
        });
}

function validateSignupForm(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
    const gender = document.getElementById('signup-gender').value;

    const userErr = document.getElementById('sign-userErr');
    const emailErr = document.getElementById('sign-emailErr');
    const passErr = document.getElementById('sign-passErr');
    const phoneErr = document.getElementById('sign-phoneErr');
    userErr.textContent = '';
    emailErr.textContent = '';
    passErr.textContent = '';
    phoneErr.textContent = '';

    const spinner = document.getElementById('signup-spinner');
    spinner.style.display = 'block';

    if (username.length < 6) {
        userErr.textContent = 'Username must have at least 6 characters';
        spinner.style.display = 'none';
        document.querySelector('.error-1').style.marginTop = '-0.2rem';
        return false;
    }

    if (!validateEmail(email)) {
        emailErr.textContent = 'Enter Valid Email';
        spinner.style.display = 'none';
        document.querySelector('.error-2').style.marginTop = '-0.2rem';
        return false;
    }

    if (password.length < 8 || !validatePasswordComplexity(password)) {
        passErr.textContent = 'Password must have 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
        spinner.style.display = 'none';
        document.querySelector('.error-3').style.marginTop = '-1rem';
        return false;
    }

    if (!validatePhoneNumber(phone)) {
        phoneErr.textContent = 'Phone number must have 10 digits.';
        spinner.style.display = 'none';
        document.querySelector('.error-4').style.marginTop = '-0.2rem';
        return false;
    }

    // Firebase authentication and firestore
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                username,
                email,
                phone,
                gender
            });
        })
        .then(() => {
            // User data saved to Firestore
            spinner.style.display = 'none';
            const successMessage = document.getElementById('successs');
            successMessage.textContent = 'Signup Successfully ✅';
            successMessage.classList.add('success-message');

            document.getElementById('signup-username').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
            document.getElementById('signup-phone').value = '';
            document.getElementById('signup-gender').value = '';

            setTimeout(() => {
                successMessage.classList.remove('success-message');
                successMessage.textContent = '';
                showLogin();
            }, 3000);
        })
        .catch((error) => {
            spinner.style.display = 'none';
            alert(`Error: ${error.message}`);
        });
}



function validatePasswordComplexity(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*()])[A-Za-z\d!.@#$%^&*()]{8,}$/;
    return re.test(password);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhoneNumber(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

// Show the forgot password dialog
function showForgotPassword() {
    document.getElementById('forgot-password-dialog').style.display = 'block';
    document.getElementById('showSuccessMsg').style.display="none";
}

// Hide the forgot password dialog
function hideForgotPassword() {
    document.getElementById('forgot-password-dialog').style.display = 'none';
}

// Handle the password reset
function resetPassword(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;
    const emailErr = document.getElementById('reset-emailErr');
    const spinner = document.getElementById('reset-spinner');
    const success= document.getElementById('showSuccessMsg');
    success.style.display="none";
    emailErr.textContent = '';
    spinner.style.display = 'block';
    
    if (!validateEmail(email)) {
        emailErr.textContent = 'Enter Valid Email';
        spinner.style.display = 'none';
        return false;
    }

    // Send password reset email
    auth.sendPasswordResetEmail(email)
        .then(() => {
            spinner.style.display = 'none';
            
            success.style.display="block";
            setTimeout(()=>{
                success.style.display="none";
        },2000);
           
        })
        .catch((error) => {
            spinner.style.display = 'none';
            emailErr.textContent = 'Error: ' + error.message;
        });
}

// Validate email function (existing)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

