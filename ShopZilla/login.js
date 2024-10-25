const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Optionally, you can validate credentials here

        // Redirect to the home page
        window.location.href = "index.html"; // Change this to your actual home page URL
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        alert('Login button clicked!'); // This should show when the button is clicked

        // Redirect to the home page
        window.location.href = "index.html"; // Change this to your actual home page URL
    });
});
