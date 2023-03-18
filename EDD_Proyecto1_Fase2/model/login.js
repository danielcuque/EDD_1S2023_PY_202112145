const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const carnet = document.getElementById('carnet').value;
    const password = document.getElementById('password').value;
    console.log(carnet, password)
});