import { getBlockChain, getCurrentUser, getElement, getHashTable, setBlockChain } from "../utils/objects.js";

const userList = getElement('userList');
const chatName = getElement('chatName');
const messsageContainer = getElement('messageContainer');

const blockChain = getBlockChain();
const hashTable = getHashTable();

userList.innerHTML = ``;

hashTable.data.forEach(student => {
    if (student !== null && getCurrentUser('currentUser').id !== student.id) {
        const li = document.createElement('li');
        li.classList.add('px-4', 'py-2', 'hover:bg-gray-300', 'border-b', 'border-gray-200', 'cursor-pointer');
        const container = document.createElement('div');
        container.classList.add('flex', 'flex-col');
        const name = document.createElement('div');
        const userId = document.createElement('div');
        name.innerHTML = `${student.name}`;
        userId.innerHTML = `${student.id}`;
        userId.setAttribute('id', 'userId');
        container.appendChild(name);
        container.appendChild(userId);
        li.appendChild(container);

        li.addEventListener('click', (e) => {
            localStorage.setItem('userChat', JSON.stringify(student));
        })
        userList.appendChild(li);
    }
})

// // Colocamos como chatUser al primer chat de la lista
const userListChildren = userList.children;
if (userListChildren.length > 0) {
    const user = hashTable.data.find(student => student !== null && student.id == userListChildren[0].querySelector('#userId').innerHTML);
    localStorage.setItem('userChat', JSON.stringify(user));
}


getElement('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = './index.html';
});


const renderCharWindow = async () => {

    // Get messages from blockChain
    const currentUser = getCurrentUser('currentUser');
    const userChat = getCurrentUser('userChat');
    chatName.innerHTML = `${userChat.id}`

    // Clear chat window

    let aux = blockChain.start;
    while (aux != null) {
        console.log(aux.data)
        if ((aux.data.emiter == currentUser.id && aux.data.receptor == userChat.id)) {
            const message = document.createElement('p');
            message.classList.add('w-1/2', 'text-justify', 'break-words', 'mb-2', aux.data.emiter == currentUser.id ? 'self-end' : 'self-start');
            message.innerText = await aux.decryptMsg();
            messsageContainer.appendChild(message);

        }
        aux = aux.next;
    }
}



getElement('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = getElement('messageInput').value;
    const currentUser = getCurrentUser('currentUser');
    const userChat = getCurrentUser('userChat');
    await blockChain.insert(new Date(), currentUser.id, Number(userChat.id), message);

    renderCharWindow();
    setBlockChain(blockChain);
    getElement('messageInput').value = '';
})

renderCharWindow(localStorage.getItem('userChat').id);



