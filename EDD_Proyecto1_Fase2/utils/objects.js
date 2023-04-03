import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";

export const displayUserTable = (order) => {
    const userTable = document.getElementById('adminStudentsBody');
    const tree = getTree();

    if (tree.root === null) {
        userTable.innerHTML = `
            <div class="text-center font-semibold py-10 text-lg">
                No hay estudiantes registrados
            </div>
        `;
        return;
    }

    userTable.innerHTML = ``;
    switch (order) {
        case 'inOrder':
            tree.inOrder();
            break;
        case 'preOrder':
            tree.preOrder();
            break;
        case 'postOrder':
            tree.postOrder();
            break;
        default:
            tree.inOrder();
            break;
    }
}

export const getTree = () => {
    const treeAVL = Object.setPrototypeOf(JSON.parse(localStorage.getItem("treeAVLContainer")), TreeAVL.prototype);
    treeAVL.deserealizeTreeAVL();
    return treeAVL;
}

export const setTree = (tree) => {
    localStorage.setItem("treeAVLContainer", JSON.stringify(tree));
}

export const getAdmin = () => {
    return Object.setPrototypeOf(JSON.parse(localStorage.getItem("admin")), Student.prototype);
}

export const getCurrentPath = () => {
    return localStorage.getItem("currentPath");
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
}

// Retornamos el string el contenido del archivo en base64
export const encodeBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
            // "data:image/jpg;base64,    =sdCXDSAsadsadsa"
        };
    });
}

export const decodeBase64 = (base64) => {
}


export const generateUniqueName = (fileName, existingFiles) => {
    let newFileName = fileName;
    let fileExists = existingFiles.includes(newFileName);
    let counter = 1;

    while (fileExists) {
        const extensionIndex = fileName.lastIndexOf('.');
        const extension = fileName.substring(extensionIndex);
        const baseFileName = fileName.substring(0, extensionIndex);
        newFileName = `${baseFileName}(${counter})${extension}`;
        fileExists = existingFiles.includes(newFileName);
        counter++;
    }

    return newFileName;
}