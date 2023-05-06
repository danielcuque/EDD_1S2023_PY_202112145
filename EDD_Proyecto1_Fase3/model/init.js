import { Student } from '../controller/classes/student.js'
import { displayUserCredentials, displayUserTable, getCurrentUser, setHashTable } from '../utils/objects.js';

// Vamos a verificar en que ruta estamos
document.addEventListener("DOMContentLoaded", (e) => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    switch (page) {
        case 'index.html':
        default:
            // Insertamos el arbol AVL en el DOM
            initBaseApp();
            break;
        case 'user-view.html':
            initUserView();
            break;
        case 'admin-view.html':
            initAdminView();
            break;
    }
});

const initBaseApp = async () => {
    // Si el valor de verifyTree no existe en localStorage, asignar un valor del tree vacío

    const verifyTree = localStorage.getItem("treeAVLContainer");
    if (verifyTree != null) {
        const hashTable = await setHashTable();
        localStorage.setItem("hashTableContainer", JSON.stringify(hashTable));
        // localStorage.removeItem("treeAVLContainer");
    }

    // Verificar si el valor de admin ya existe en localStorage
    var admin = localStorage.getItem("admin");

    // Si el valor de admin no existe en localStorage, asignar un valor predeterminado
    if (admin === null) {
        const adminObj = new Student('admin', 'admin', 'admin', '/');
        const adminJSON = JSON.stringify(adminObj);
        localStorage.setItem("admin", adminJSON);
    }
}

const initUserView = () => {
    document.getElementById('carnetStudentSpan').innerHTML = `${getCurrentUser().id}`
    localStorage.setItem('currentPath', '/');
}

const initAdminView = () => {
    displayUserTable();
    displayUserCredentials();
}
