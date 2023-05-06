import { getBlockChain, getElement } from "../utils/objects.js";

const blockChain = getBlockChain();

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = './index.html';
});


getElement('chatContainer').addEventListener('click', (e) => {

})
