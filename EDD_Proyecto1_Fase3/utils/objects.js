import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";
import { HashTable } from "../controller/structs/hash-table.js";

export const displayUserTable = () => {
    const userTable = document.getElementById('adminStudentsBody');
    userTable.innerHTML = ``;

    const hashTable = getHashTable();

    hashTable.data.forEach(student => {
        const row = document.createElement('div');
        row.innerHTML = `
        <div class="w-full flex flex-row py-6 border border-gray-300">
            <div class="w-1/4 text-center">${student.id}</div>
            <div class="w-1/4 text-center">${student.name}</div>
            <div class="w-1/2 text-center">${student.password}</div>
        </div>`
        userTable.appendChild(row);
    });

}

export const displayUserCredentials = () => {
    const userCredentials = document.getElementById('userCredentialsBody');
    userCredentials.innerHTML = ``;
    getUsersCredentials().forEach(student => {
        const row = document.createElement('div');
        row.innerHTML = `
        <div class="w-full flex flex-row py-6 border border-gray-300">
            
        </div>`
        userCredentials.appendChild(row);
    });

}

export const getTree = () => {
    const treeAVL = Object.setPrototypeOf(JSON.parse(localStorage.getItem("treeAVLContainer")), TreeAVL.prototype);
    treeAVL.deserealizeTreeAVL();
    return treeAVL;
}

export const getHashTable = () => {
    const tree = getTree();
    const hashTable = new HashTable();

    tree.getInorder().forEach(student => {
        hashTable.set(student.id, student.name, student.password);
    });
    return hashTable;
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
    // Retornamos la promesa resuelta 
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    }
    );
}

export const getUsersCredentials = () => {
    const tree = getTree();
    return tree.getInorder().map(student => {
        if (student.storage.files === undefined) {
            return {
                owner: student.id,
                userShared: [],
            }
        }
        return {
            owner: student.id,
            userShared: JSON.parse(JSON.stringify(student.storage.files)),
        }
    });
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