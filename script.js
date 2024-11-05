document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.forms['signUp'];
    const signInForm = document.forms['signIn'];

    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = signUpForm['email'].value;
            const password = signUpForm['password'].value;
            const confirmPassword = signUpForm['cnfm'].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
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
                window.location.href = '../index.html';
            } else {
                alert('Invalid email or password!');
            }

            
        });
    }
});