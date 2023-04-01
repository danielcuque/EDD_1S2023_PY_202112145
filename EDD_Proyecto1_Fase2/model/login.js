import { checkLogin } from './auth.js';
import { clearLoginForm } from '../utils/forms.js';

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const carnet = document.getElementById('carnet').value;
    const password = document.getElementById('password').value;
    const isLogged = checkLogin(carnet, password)
    if (isLogged) {
        clearLoginForm();
        if (carnet === 'admin') {
            window.location.href = './admin-view.html';
            return;
        } else {
            window.location.href = './user-view.html';
            return
        }
    }
    alert('Carnet o contraseña incorrectos');

});