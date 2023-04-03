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

const newPathForm = document.getElementById('newPathForm');
const deletePathForm = document.getElementById('deletePathForm');

createFolderButton.addEventListener('click', () => {
    document.getElementById('newPathForm').classList.remove('hidden');
})

document.getElementById('cancelNewFolderBtn').addEventListener('click', () => {
    document.getElementById('newPathForm').classList.add('hidden');
})

newPathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('newPath').value;
    console.log(path);
})

searchPathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('default-search').value;
    console.log(path);
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
}