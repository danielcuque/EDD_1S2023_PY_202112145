import { showSnackbar } from "../utils/fields.js";
import { validFilesLoad } from "../utils/forms.js";
import { getCurrentUser } from "../utils/objects.js";

// .txt, .pdf, .jpg, .png, .jpeg
const inputFile = document.getElementById('dropzone-file');
const logoutButton = document.getElementById('logoutBtn');

// Check if all files are accepted
inputFile.addEventListener('change', () => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
    const files = inputFile.files;
    const isInvalidEntry = validFilesLoad(
        allowedExtensions,
        files
    )
    if (isInvalidEntry) {
        const tree = getCurrentUser();
        tree.createFile(localStorage.getItem('currentPath'), files[0].name);
        showSnackbar('Archivo añadido', 'success');
        return;
    }
    showSnackbar('Archivo no permitido', 'error');
})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
})