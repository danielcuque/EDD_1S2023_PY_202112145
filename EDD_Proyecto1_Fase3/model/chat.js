import { getBlockChain, getCurrentUser, getElement, getHashTable, setBlockChain } from "../utils/objects.js";

const userList = getElement('userList');
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


// export const displayUserChat = () => {
//     const chatContainer = getElement('chatContainer');
//     const userChat = getCurrentUser('userChat');
//     getElement('chatName').innerHTML = `Chat con ${userChat.id}`;
// }


getElement('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Enviando mensaje');
    // const message = getElement('messageInput').value;
    // const currentUser = getCurrentUser('currentUser');
    // await blockChain.insert(new Date(), currentUser.id, Number(1), message);

    // console.log(blockChain);
    // // renderCharWindow(recieverInput.value);
    // setBlockChain(blockChain);
    getElement('messageInput').value = '';
})


