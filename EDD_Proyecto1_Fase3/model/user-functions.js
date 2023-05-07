import { getTypeOfFile, showSnackbar } from "../utils/fields.js";
import { getCurrentPath, getCurrentUser, getFileContentConverted, getHashTable, getUsersCredentials, setHashTableContainer } from "../utils/objects.js";

// .txt, .pdf, .jpg, .png, .jpeg
const hashTable = getHashTable();
const logoutButton = document.getElementById('logoutBtn');
const searchPathForm = document.getElementById('searchPathForm');
// const inputFile = document.getElementById('dropzone-file');
// const createFolderButton = document.getElementById('createFolderBtn');
// const deleteFolderButton = document.getElementById('deleteFolderBtn');

document.getElementById('closeSharedFilesModal').addEventListener('click', () => {
    document.getElementById('sharedFilesModal').classList.add('hidden');
})


// HTML elements for the new path form
const newPathForm = document.getElementById('newPathForm');
// createFolderButton.addEventListener('click', () => {
//     document.getElementById('newPathModal').classList.remove('hidden');
// })

document.getElementById('cancelNewFolderBtn').addEventListener('click', () => {
    document.getElementById('newPathModal').classList.add('hidden');
})

newPathForm.addEventListener('submit', (e) => {


})

// HTML elements for the delete path form
// deleteFolderButton.addEventListener('click', () => {
//     document.getElementById('deletePathModal').classList.remove('hidden');
// })

document.getElementById('cancelDeleteFolderBtn').addEventListener('click', () => {
    document.getElementById('deletePathModal').classList.add('hidden');
})

document.getElementById('deletePathForm').addEventListener('submit', (e) => {

})

// HTML elements for the search path form
searchPathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = document.getElementById('default-search').value;
    const currentUser = getCurrentUser('currentUser');
    const isAdded = currentUser.graph.findPath(path);

    if (isAdded) {
        localStorage.setItem('currentPath', path);
        showFilesInCurrentPath();
        return;
    }
    showSnackbar('Carpeta no encontrada', 'error');
})

// Check if all files are accepted
// inputFile.addEventListener('change', () => {
//     const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
//     const files = inputFile.files;
//     processFile(files, allowedExtensions);
// })

// inputFile.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// })

// inputFile.addEventListener('dragleave', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// })

// inputFile.addEventListener('drop', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
//     const files = e.dataTransfer.files;
//     processFile(files, allowedExtensions);
// })

const processFile = async (files, allowedExtensions) => {

}

// Set permissions
// document.getElementById('setPermissionBtn').addEventListener('click', () => {
//     document.getElementById('setPermissionModal').classList.remove('hidden');
// })

document.getElementById('cancelSetPermission').addEventListener('click', () => {
    document.getElementById('setPermissionModal').classList.add('hidden');
})

document.getElementById('setPermissionForm').addEventListener('submit', (e) => {

})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
})

// Reports section
document.getElementById('reportFolderBtn').addEventListener('click', () => {
    const currentUser = getCurrentUser('currentUser');
    const user = hashTable.findUserByIdAndPass(currentUser.id, currentUser.password);
    const report = user.graph.toDot();
    const img = document.getElementById('treeImagePreview');
    img.src = report;
    document.getElementById('treeModalPreview').classList.remove('hidden');
})

// document.getElementById('reportFilesBtn').addEventListener('click', () => {

// })

document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('treeModalPreview').classList.add('hidden');
})

export const showFilesInCurrentPath = () => {
    const currentUser = getCurrentUser('currentUser');
    const user = hashTable.findUserByIdAndPass(currentUser.id, currentUser.password);

    const currentPath = getCurrentPath();
    const folders = user.graph.getFolders(currentPath);
    const files = user.graph.getFiles(currentPath);

    if (folders.length === 0 && files.length === 0) {
        showSnackbar('No hay contenido en esta carpeta', 'warning');
    }

    const documentsContainers = document.getElementById('showFilesSection');
    documentsContainers.innerHTML = '';

    folders.forEach((folder) => {
        const folderContainer = document.createElement('div');
        folderContainer.classList.add('folder-container');
        folderContainer.innerHTML = `
        <div class="w-full h-full flex flex-col items-center mt-2 cursor-pointer">
        <img src="./assets/directoryIcon.svg" class="text-gray-500" alt="si">
        <span>${folder}</span>
    </div>
        `;
        folderContainer.addEventListener('click', () => {
            const newPath = currentPath === '/' ? currentPath + folder : currentPath + '/' + folder;
            localStorage.setItem('currentPath', newPath);
            document.getElementById('default-search').value = newPath;
            showFilesInCurrentPath();
        })
        documentsContainers.appendChild(folderContainer);
    }
    )

    files.forEach((file) => {
        const fileIcon = getTypeOfFile(file);

        const fileContainer = document.createElement('div');
        fileContainer.classList.add('file-container');
        fileContainer.innerHTML = `
        <div class="w-full h-full flex flex-col items-center mt-2 cursor-pointer">
        <img src=${fileIcon} class="text-gray-500" alt="si">
        <span>${file}</span>
    </div>`;
        documentsContainers.appendChild(fileContainer);

    })
}

// Shared files

document.getElementById('sharedFilesBtn').addEventListener('click', () => {
    const sharedFilesContainer = document.getElementById('sharedFilesContainer');
    sharedFilesContainer.innerHTML = '';

    const userCredentials = getUsersCredentials();
    userCredentials.forEach((user) => {
        if (user.userShared == getCurrentUser('currentUser').id) {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add('w-full', 'h-full', 'flex', 'flex-col', 'items-center', 'mt-2', 'border-t-2', 'border-gray-500', 'p-2');
            fileContainer.innerHTML = `
            <div class="font-bold text-left w-full">${user.filename}</div>
            <div class="text-left w-full text-sm text-gray-600">Compartido por: ${user.owner}</div>
        `;
            const content = getFileContentConverted(user.filename, user.fileContent);
            fileContainer.appendChild(content);
            sharedFilesContainer.appendChild(fileContainer);
        }
    })

    document.getElementById('sharedFilesModal').classList.remove('hidden');
})

document.getElementById('messagesBtn').addEventListener('click', () => {
    // Cambiamos de pestaña
    window.location.href = './chat.html';
})