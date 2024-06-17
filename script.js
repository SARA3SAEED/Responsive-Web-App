// script.js
function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (name.length <= 5) {
        alert('الاسم يجب أن يكون أكثر من 5 أحرف');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('البريد الالكتروني غير صالح');
        return;
    }

    if (password.length <= 8) {
        alert('كلمة السر يجب أن تكون أكثر من 8 أحرف');
        return;
    }

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));

    // Redirect to login page
    window.location.href = 'login.html';
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        // Redirect to profile page
        localStorage.setItem('loggedIn', true);
        window.location.href = 'profile.html';
    } else {
        alert('البريد الالكتروني أو كلمة السر غير صحيحة');
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}

// Prevent access to profile page without login
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('profile.html')) {
        const loggedIn = localStorage.getItem('loggedIn');
        const user = JSON.parse(localStorage.getItem('user'));

        if (loggedIn) {
            document.getElementById('username').innerText = user.name;
        } else {
            window.location.href = 'login.html';
        }
    }
});
