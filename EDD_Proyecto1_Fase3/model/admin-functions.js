import { getBlockChain } from "../utils/objects.js";

// Buttons for actions
const logoutButton = document.getElementById('logoutBtn');
const blockChainButton = document.getElementById('blockChainBtn');
const modal = document.getElementById('treeModalPreview');
const closeModal = document.getElementById('closeModalBtn');
const imgPreview = document.getElementById('treeImagePreview');

logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
})

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
})

blockChainButton.addEventListener('click', () => {
    const imgSrc = getBlockChain().toDot();
    imgPreview.src = imgSrc;
    modal.classList.remove('hidden');
})

