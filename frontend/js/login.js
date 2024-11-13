import { login } from './funcs/auth.js';

const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    login();
});
