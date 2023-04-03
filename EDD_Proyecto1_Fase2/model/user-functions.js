import { showSnackbar } from "../utils/fields.js";
import { validFilesLoad } from "../utils/forms.js";
import { getCurrentPath, getCurrentUser } from "../utils/objects.js";
import { getTree, setTree } from "../utils/objects.js";

// .txt, .pdf, .jpg, .png, .jpeg
const AVLTree = getTree();

const inputFile = document.getElementById('dropzone-file');
const logoutButton = document.getElementById('logoutBtn');
const searchPathForm = document.getElementById('searchPathForm');
const createFolderButton = document.getElementById('createFolderBtn');
const deleteFolderButton = document.getElementById('deleteFolderBtn');

// HTML elements for the new path form
const newPathForm = document.getElementById('newPathForm');
createFolderButton.addEventListener('click', () => {
    document.getElementById('newPathModal').classList.remove('hidden');
})

document.getElementById('cancelNewFolderBtn').addEventListener('click', () => {
    document.getElementById('newPathModal').classList.add('hidden');
})

newPathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('newFolderInput').value;

    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const isAdded = user.storage.createPath(getCurrentPath() + '/' + path);

    if (isAdded) {
        showFilesInCurrentPath();
        showSnackbar('Carpeta añadida', 'success');
        setTree(AVLTree);
        document.getElementById('newFolderInput').value = '';
        return;
    }

})

// HTML elements for the delete path form
deleteFolderButton.addEventListener('click', () => {
    document.getElementById('deletePathModal').classList.remove('hidden');
})

document.getElementById('cancelDeleteFolderBtn').addEventListener('click', () => {
    document.getElementById('deletePathModal').classList.add('hidden');
})



searchPathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('default-search').value;
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const isAdded = user.storage.searchPath(path);

    if (isAdded) {
        localStorage.setItem('currentPath', path);
        showFilesInCurrentPath();
        return;
    }
    showSnackbar('Carpeta no encontrada', 'error');
})

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
        const isAdded = user.storage.createFile(getCurrentPath(), files[0]);

        if (isAdded) {
            showFilesInCurrentPath();
            showSnackbar('Archivo añadido', 'success');
            setTree(AVLTree);
            inputFile.value = '';
            return;
        }
        inputFile.value = '';
        showSnackbar('Archivo no añadido', 'error');
        return;
    }
    inputFile.value = '';
    showSnackbar('Archivo no permitido', 'error');
})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
})


const showFilesInCurrentPath = () => {
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);

    const currentPath = getCurrentPath();
    const folders = user.storage.getFolders(currentPath);
    const files = user.storage.getFiles(currentPath);

    const documentsContainers = document.getElementById('showFilesSection');
    documentsContainers.innerHTML = '';

    folders.forEach((folder) => {
        const folderContainer = document.createElement('div');
        folderContainer.classList.add('folder-container');
        folderContainer.innerHTML = `
            <div class="folder-icon">
                <i class="fas fa-folder"></i>
            </div>
            <div class="folder-name">
                <p>${folder.name}</p>
            </div>
        `;
        folderContainer.addEventListener('click', () => {
            const newPath = currentPath + '/' + folder;
            localStorage.setItem('currentPath', newPath);
            showFilesInCurrentPath();
        })
        documentsContainers.appendChild(folderContainer);
    }
    )
}