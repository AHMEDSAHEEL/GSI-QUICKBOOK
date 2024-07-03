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
    document.getElementById('emailErr').textContent='';
    document.getElementById('passErr').textContent='';
    document.getElementById('success').textContent='';


    const spinner = document.getElementById('login-spinner');
    spinner.style.display = 'block'; 

    if (!validateEmail(email)) {
        spinner.style.display = 'none'; 
        document.getElementById('emailErr').textContent='Enter Valid Email';
        return false;
    }

    if (password.length < 8 || !validatePasswordComplexity(password)) {
        spinner.style.display = 'none'; 
      document.getElementById('passErr').textContent='`Password must have 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
      return false;

    }

    
    setTimeout(() => {
        spinner.style.display = 'none';
    
        const successMessage = document.getElementById('success');
        successMessage.textContent = 'Login Successfully ✅';
        successMessage.classList.add('success-message');
    
        setTimeout(() => {
            successMessage.classList.remove('success-message');
            successMessage.textContent = '';
        }, 3000);
    }, 1000);
}

function validateSignupForm(event) {
    event.preventDefault(); 
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
    document.getElementById('successs').textContent='';
    const spinner = document.getElementById('signup-spinner');

    const usserErr=document.getElementById('sign-userErr');
   const emailErr= document.getElementById('sign-emailErr');
    const passErr=document.getElementById('sign-passErr');
    const phoneErr=document.getElementById('sign-phoneErr');
    usserErr.textContent='';
    emailErr.textContent='';
    passErr.textContent='';
    phoneErr.textContent='';

    const error=document.getElementsByClassName('error-1');
    

    spinner.style.display = 'block'; 

    
        if (username.length < 6) {
           
            usserErr.textContent='Username must have at least 6 character';
            spinner.style.display = 'none'; 
            document.querySelector('.error-1').style.marginTop='-0.2rem';
           
            return false;
        }

        if (!validateEmail(email)) {
          emailErr.textContent='Enter Valid Email';
            spinner.style.display = 'none'; 
            document.querySelector('.error-2').style.marginTop='-0.2rem';
            return false;
        }

        if (password.length < 8 || !validatePasswordComplexity(password)) {
            passErr.textContent='Password must have 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.';
            spinner.style.display = 'none'; 
            document.querySelector('.error-3').style.marginTop='-1.2rem';
            return false;
        }

        if (!validatePhoneNumber(phone)) {
           phoneErr.textContent='Phone number must have 10 digits.';
            spinner.style.display = 'none'; 
            document.querySelector('.error-4').style.marginTop='-0.2rem';
            return false;
        }
     
     setTimeout(() => {
        spinner.style.display = 'none';
    
        const successMessage = document.getElementById('successs');
        successMessage.textContent = 'SignUp Successfully ✅';
        document.querySelector(".error-1").style.marginTop='0.2rem';
        document.querySelector(".error-2").style.marginTop='0.2rem';
        document.querySelector(".error-3").style.marginTop='0.2rem';
        document.querySelector(".error-4").style.marginTop='0.2rem';
        successMessage.classList.add('success-message');
    
        setTimeout(() => {
            successMessage.classList.remove('success-message');
            successMessage.textContent = '';
        }, 3000);
    
    }, 1000);
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