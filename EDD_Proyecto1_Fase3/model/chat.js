import { getBlockChain, getCurrentUser, getElement } from "../utils/objects.js";

const blockChain = getBlockChain();

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = './index.html';
});


export const displayUserChat = () => {
    const chatContainer = getElement('chatContainer');
    const userChat = getCurrentUser('userChat');
    getElement('chatName').innerHTML = `Chat con ${userChat.id}`;
}