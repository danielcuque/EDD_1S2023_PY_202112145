import { showSnackbar } from "../utils/fields.js";
import { validFilesLoad } from "../utils/forms.js";
import { getCurrentPath, getCurrentUser, getTree, setTree } from "../utils/objects.js";

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

document.getElementById('deletePathForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('deleteFolderInput').value;

    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const isDeleted = user.storage.deletePath(getCurrentPath() + '/' + path);

    if (isDeleted) {
        showFilesInCurrentPath();
        showSnackbar('Carpeta eliminada', 'success');
        setTree(AVLTree);
        document.getElementById('deleteFolderInput').value = '';
        return;
    }
    showSnackbar('Carpeta no encontrada', 'error');
})

// HTML elements for the search path form
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
    processFile(files, allowedExtensions);
})

inputFile.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
})

inputFile.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
})

inputFile.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
    const files = e.dataTransfer.files;
    processFile(files, allowedExtensions);
})

const processFile = (files, allowedExtensions) => {
    const isInvalidEntry = validFilesLoad(
        allowedExtensions,
        files
    )
    if (isInvalidEntry && files.length > 0) {
        const currentUser = getCurrentUser();
        const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
        const isAdded = user.storage.createFiles(getCurrentPath(), files);

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
}


logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
})

// Reports section
document.getElementById('reportFolderBtn').addEventListener('click', () => {
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const report = user.storage.getFolderReport();
    const img = document.getElementById('treeImagePreview');
    img.src = report;
    document.getElementById('treeModalPreview').classList.remove('hidden');
})

document.getElementById('reportFilesBtn').addEventListener('click', () => {
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);
    const report = "https://quickchart.io/graphviz?graph=" + user.storage.getFilesReport(getCurrentPath());
    const img = document.getElementById('treeImagePreview');
    img.src = report;
    document.getElementById('treeModalPreview').classList.remove('hidden');
})

document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('treeModalPreview').classList.add('hidden');
})

const showFilesInCurrentPath = () => {
    const currentUser = getCurrentUser();
    const user = AVLTree.searchStudent(currentUser.id, currentUser.password);

    const currentPath = getCurrentPath();
    const folders = user.storage.getFolders(currentPath);
    const files = user.storage.getFiles(currentPath);

    if (folders.length === 0 && files.length === 0) {
        showSnackbar('No hay archivos en esta carpeta', 'warning');
    }

    const documentsContainers = document.getElementById('showFilesSection');
    documentsContainers.innerHTML = '';

    folders.forEach((folder) => {
        const folderContainer = document.createElement('div');
        folderContainer.classList.add('folder-container');
        folderContainer.innerHTML = `
        <div class="w-full h-full flex flex-col items-center mt-2 cursor-pointer">
        <img src="./assets/directoryIcon.svg" class="text-gray-500" alt="si">
        <span>${folder.name}</span>
    </div>
        `;
        folderContainer.addEventListener('click', () => {
            const newPath = currentPath === '/' ? currentPath + folder.name : currentPath + '/' + folder.name;
            localStorage.setItem('currentPath', newPath);
            document.getElementById('default-search').value = newPath;
            showFilesInCurrentPath();
        })
        documentsContainers.appendChild(folderContainer);
    }
    )
}