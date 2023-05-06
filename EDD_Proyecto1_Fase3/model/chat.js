import { getBlockChain, getCurrentUser, getElement, setBlockChain } from "../utils/objects.js";

const blockChain = getBlockChain();

getElement('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = './index.html';
});


export const displayUserChat = () => {
    const chatContainer = getElement('chatContainer');
    const userChat = getCurrentUser('userChat');
    getElement('chatName').innerHTML = `Chat con ${userChat.id}`;
}


getElement('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = getElement('messageInput').value;
    const currentUser = getCurrentUser('currentUser');
    await blockChain.insert(new Date(), currentUser.id, Number(1), message);

    console.log(blockChain);
    // renderCharWindow(recieverInput.value);
    setBlockChain(blockChain);
    getElement('messageInput').value = '';
})