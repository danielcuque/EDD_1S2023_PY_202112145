import { showSnackbar } from "../utils/fields.js";
import { validFilesLoad } from "../utils/forms.js";
import { getCurrentPath, getCurrentUser } from "../utils/objects.js";
import { getTree, setTree } from "../utils/objects.js";

// .txt, .pdf, .jpg, .png, .jpeg
const inputFile = document.getElementById('dropzone-file');
const logoutButton = document.getElementById('logoutBtn');
const AVLTree = getTree();


// Check if all files are accepted
inputFile.addEventListener('change', () => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
    const files = inputFile.files;
    const isInvalidEntry = validFilesLoad(
        allowedExtensions,
        files
    )
    if (isInvalidEntry && files.length > 0) {
        const currentUser = getCurrentUser();
        const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
        const isAdded = user.storage.createFile(getCurrentPath(), files[0].name);

        if (isAdded) {
            showFilesInCurrentPath();
            showSnackbar('Archivo añadido', 'success');
            setTree(AVLTree);
            return;
        }
        showSnackbar('Archivo no añadido', 'error');
        return;
    }
    showSnackbar('Archivo no permitido', 'error');
})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
})

export const showFilesInCurrentPath = () => {
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const files = user.storage.getFiles(getCurrentPath());
    const filesContainer = document.getElementById('showFilesSection');
    filesContainer.innerHTML = '';
    files.forEach(file => {
        const fileContainer = document.createElement('div');
        fileContainer.innerHTML = `<div class="w-full h-full">
        <img src="./assets/directoryIcon.svg" class="text-gray-500" alt="si">
        <span>${file.name}</span>
        </div>`
        filesContainer.appendChild(fileContainer);
    })

}