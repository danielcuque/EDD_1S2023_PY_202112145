import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";
import { HashTable } from "../controller/structs/hash-table.js";
import { encode } from "../controller/structs/encrypt.js";

export const displayUserTable = async () => {
    const userTable = document.getElementById('adminStudentsBody');
    userTable.innerHTML = ``;

    const hashTable = await getHashTable();

    hashTable.data.forEach(student => {
        if (student !== null) {
            const row = document.createElement('div');
            row.innerHTML = `
            <div class="w-full flex flex-row py-6 border border-gray-300">
                <div class="w-1/4 text-center">${student.id}</div>
                <div class="w-1/4 text-center">${student.name}</div>
                <div class="w-1/2 text-center text-xs break-words pr-2">${student.password}</div>
            </div>`
            userTable.appendChild(row);
        }
    });

}

export const displayUserCredentials = () => {
    const userCredentials = document.getElementById('userCredentialsBody');
    userCredentials.innerHTML = ``;
    getUsersCredentials().forEach(obj => {
        const row = document.createElement('div');
        row.innerHTML = `
            <div class="w-full flex flex-row py-6 border border-gray-300">
            <div class="w-1/5 text-center">${obj.owner}</div>
            <div class="w-1/5 text-center">${obj.userShared}</div>
            <div class="w-1/5 text-left">${obj.path}</div>
            <div class="w-1/5 text-center">${obj.filename}</div>
            <div class="w-1/5 text-center">${obj.credentials}</div>
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
    const hashTable = Object.setPrototypeOf(JSON.parse(localStorage.getItem("hashTableContainer")), HashTable.prototype);
    hashTable.deserializeHashTable();
    return hashTable;
}

export const setHashTable = async () => {
    const tree = getTree();
    const hashTable = new HashTable();
    const students = tree.getInorder();

    for (const student of students) {
        const encryptedPassword = await encode(student.password);
        hashTable.set(student.id, student.name, encryptedPassword, student.storage, undefined);
    }
    return hashTable;
}

export const setTree = (tree) => {
    localStorage.setItem("treeAVLContainer", JSON.stringify(tree));
}

export const setHashTableContainer = (hashTable) => {
    localStorage.setItem("hashTableContainer", JSON.stringify(hashTable));
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
    const table = []
    const hashTable = getHashTable();
    const students = hashTable.data;
    students.map(student => {
        if (student !== null) {
            const graph = student.graph
            graph.getAllFiles().map(file => {
                file.credentials.map(objCredential => {
                    table.push({
                        owner: student.id,
                        userShared: objCredential.id,
                        path: file.path,
                        filename: objCredential.filename,
                        credentials: objCredential.credential,
                        fileContent: file.convertedFiles.find(obj => obj.filename === objCredential.filename).content
                    });
                })
            })
        }
    });
    return table;
}

export const getFileContentConverted = (filename, fileContent) => {
    const extensionFile = filename.split('.')[1];
    switch (extensionFile) {
        case 'pdf':
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '100vh';
            iframe.src = `data:application/pdf;base64,${fileContent}`
            return iframe;
        case 'txt':
            const contentTxt = atob(fileContent);
            const textarea = document.createElement('textarea');
            textarea.value = contentTxt;
            textarea.style.width = '100%';
            textarea.style.height = '100%';
            textarea.readOnly = true;
            return textarea;
        case 'jpg':
        case 'png':
        case 'jpeg':

            const img = document.createElement('img');
            img.src = `data:image/${extensionFile};base64,${fileContent}`;
            img.style.width = '100%';
            img.style.height = '100%';
            return img;
        default:
            return document.createElement('div');
    }
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