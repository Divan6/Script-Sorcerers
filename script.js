document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.forms['signUp'];
    const signInForm = document.forms['signIn'];

    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = signUpForm['email'].value;
            const password = signUpForm['password'].value;
            const confirmPassword = signUpForm['cnfm'].value;
            const username = signUpForm['username'].value; // Ensure you have a username field

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('username', username); // Store username
            alert('Sign up successful!');
            window.location.href = 'signin.html'; // Redirect to sign-in page
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = signInForm['email'].value;
            const password = signInForm['password'].value;

            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                alert('Sign in successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password!');
            }

            
        });
    }
});

// Function to update user section based on login status
function updateUserSection() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        $('#welcomeUser').show();
        $('#username').text(storedUsername);
        $('#logoutLink').show();
        $('#loginLink').hide();
    } else {
        $('#welcomeUser').hide();
        $('#logoutLink').hide();
        $('#loginLink').show();
    }
}

// Call the function on page load
$(document).ready(function() {
    updateUserSection();

    // Handle logout
    $('#logoutLink').on('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        updateUserSection();
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    });
});