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

// Function to show login form
function showLogin() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(0%)';
}

// Function to show signup form
function showSignup() {
    const formSlide = document.querySelector('.form-slide');
    formSlide.style.transform = 'translateX(-50%)';
}

// Function to validate login form
function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const emailErr = document.getElementById('emailErr');
    const passErr = document.getElementById('passErr');
    const successMessage = document.getElementById('success');
    emailErr.textContent = '';
    passErr.textContent = '';
    successMessage.textContent = '';

    const spinner = document.getElementById('login-spinner');
    spinner.style.display = 'block';
   

    if (!validateEmail(email)) {
        spinner.style.display = 'none';
        emailErr.textContent = 'Enter Valid Email';
        return false;
    }

    if (password.length < 8 || !validatePasswordComplexity(password)) {
        spinner.style.display = 'none';
        passErr.textContent = 'Password must have 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
        return false;
    }

    // Firebase authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            // Check if user is admin
            checkAdmin(user);
        })
        .catch((error) => {
            spinner.style.display = 'none';
            passErr.textContent = 'Incorrect email or password.';
        });
}

// Function to check if user is admin
function checkAdmin(user) {
    if (user) {
        // Fetch user data to verify if admin
        db.collection('users').doc(user.uid).get()
            .then(doc => {
                const userData = doc.data();
                if (userData.isAdmin) {
                    // If admin, redirect to admin.html
                    window.location.href = "html/admin.html";
                } else {
                    // If not admin, redirect to profile.html or any other page for regular users
                    window.location.href = "html/profile.html";
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
}

// Function to validate signup form
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
    const otpErr = document.getElementById('sign-otpErr');
    userErr.textContent = '';
    emailErr.textContent = '';
    passErr.textContent = '';
    phoneErr.textContent = '';
    otpErr.textContent = '';
    

    const spinner = document.getElementById('signup-spinner');
    spinner.style.display = 'block';

    if (username.length < 6) {
        userErr.textContent = 'Username must have at least 6 characters';
        spinner.style.display = 'none';
        return false;
    }

    if (!validateEmail(email)) {
        emailErr.textContent = 'Enter Valid Email';
        spinner.style.display = 'none';
        return false;
    }

    if (password.length < 8 || !validatePasswordComplexity(password)) {
        passErr.textContent = 'Password must have 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
        spinner.style.display = 'none';
        return false;
    }

    if (phone === '' || phone.length < 12) {
        phoneErr.textContent = 'Phone number must have 10 digits + code.';
        spinner.style.display = 'none';
        return false;
    }

    // Firebase authentication and firestore
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            // Add user details to Firestore
            return db.collection('users').doc(user.uid).set({
                username,
                email,
                phone,
                gender,
                isAdmin: false
            });
        })
        .then(() => {
            // User data saved to Firestore
            spinner.style.display = 'none';
            const successMessage = document.getElementById('successs');
            successMessage.textContent = 'Signup Successfully ✅';
            successMessage.classList.add('success-message');

            // Clear input fields
            document.getElementById('signup-username').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
            document.getElementById('signup-phone').value = '';
            document.getElementById('signup-gender').value = '';

            // Show login form after successful signup
            setTimeout(() => {
                successMessage.classList.remove('success-message');
                successMessage.textContent = '';
                window.location.reload();
            }, 3000);
        })
        .catch((error) => {
            spinner.style.display = 'none';
            alert(`Error: ${error.message}`);
        });
}
let appVerifier;

function sendOTP() {
    const phoneNumber = document.getElementById('signup-phone').value;

    if (!appVerifier) {
        appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    } else {
        appVerifier.clear();
        appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }

    document.getElementById('recaptcha-container').style.display = 'block';

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('otp-section').style.display = 'block';
            document.getElementById('recaptcha-container').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again later.');
        });
}

function verifyOTP() {
    const otp = document.getElementById('signup-otp').value;
    const confirmationResult = window.confirmationResult;

    document.getElementById('recaptcha-container').style.display = 'none';

    confirmationResult.confirm(otp)
        .then((result) => {
            const user = result.user;
            document.getElementById('otp-section').style.display = 'none';
            document.getElementById('recaptcha-container').style.display = 'none';
            document.getElementById('sendOT').style.display = 'none';
            alert('Verified successfully');
        })
        .catch((error) => {
            console.error('Error verifying OTP:', error);
            alert('Invalid OTP. Please enter the correct OTP.');
        });
}

function validatePasswordComplexity(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!.@#$%^&*()])[A-Za-z\d!.@#$%^&*()]{8,}$/;
    return re.test(password);
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// // Function to validate phone number format
// function validatePhoneNumber(phone) {
//     const re = /^\d{15}$/;
//     return re.test(phone);
// }

// Timeout function for success messages
// function timeoutSuccessMessage(element) {
//     setTimeout(() => {
//         element.classList.remove('success-message');
//         element.textContent = '';
//     }, 3000);
// }

// Show the forgot password dialog
function showForgotPassword() {
    document.getElementById('forgot-password-dialog').style.display = 'block';
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
    const successMsg = document.getElementById('reset-success');
    emailErr.textContent = '';
    spinner.style.display = 'block';
    successMsg.textContent = '';
    successMsg.style.display='block';

    if (!validateEmail(email)) {
        emailErr.textContent = 'Enter Valid Email';
        spinner.style.display = 'none';
        return false;
    }

    // Send password reset email
    auth.sendPasswordResetEmail(email)
    .then(() => {
        spinner.style.display = 'none';
        successMsg.textContent = 'Password reset email sent successfully.';
        //timeoutSuccessMessage(successMsg);
        
        // Add a timeout before hiding the dialog
        setTimeout(() => {
            document.getElementById('forgot-password-dialog').style.display = 'none';
           successMsg.style.display='none';
        }, 1000); 
        
         
    })
    .catch((error) => {
        spinner.style.display = 'none';
        emailErr.textContent = 'Error: ' + error.message;
    });
  

}
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (input.type === "password") {
        input.type = "text";
        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");
    }
}
var usernam = document.getElementById('signup-username').value;
const passwor = document.getElementById('signup-password').value;

function showSuggestion(id) {
 
    document.getElementById(id).style.display = 'block';

}
function hideSuggestion(id) {
    document.getElementById(id).style.display = 'none';
}
function validateUsername() {
    const usernameInput = document.getElementById('signup-username');
    const usernameSuggestion = document.getElementById('username-suggestion');
    if (usernameInput.value.length >= 6) {
        usernameSuggestion.style.display = 'none';
    } else {
        usernameSuggestion.style.display = 'block';
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('signup-password');
    const passwordSuggestion = document.getElementById('password-suggestion');
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passwordPattern.test(passwordInput.value)) {
        passwordSuggestion.style.display = 'none';
    } else {
        passwordSuggestion.style.display = 'block';
    }
}