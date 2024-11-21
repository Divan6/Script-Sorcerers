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
            } else {
                alert('Invalid email or password!');
            }
        });
    }
});









const stars = document.querySelectorAll('.star-icon');
let currentRating = 0;

stars.forEach((star, index) => {
  // Hover effect to show potential rating
  star.addEventListener('mouseenter', () => {
    fillStars(index + 1);
  });

  // Reset stars when mouse leaves
  star.addEventListener('mouseleave', () => {
    fillStars(currentRating);
  });

  // Set rating on click
  star.addEventListener('click', () => {
    currentRating = index + 1;
    fillStars(currentRating);
  });
});

function fillStars(rating) {
  stars.forEach((star, i) => {
    if (i < rating) {
      star.src = "../assets/images/starfill.svg"; // Filled star image
    } else {
      star.src = "../assets/images/star.svg"; // Empty star image
    }
  });
}