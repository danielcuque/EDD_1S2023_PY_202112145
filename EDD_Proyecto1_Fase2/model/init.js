import { Student } from '../controller/classes/student.js'
import { TreeAVL } from '../controller/structs/tree-avl.js';
import { getTree } from '../utils/objects.js';

// Vamos a verificar en que ruta estamos
document.addEventListener("DOMContentLoaded", (e) => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    switch (page) {
        case 'index.html':
            // Insertamos el arbol AVL en el DOM
            initTreeAvl();
            break;
        case 'user-view.html':
            break;
        case 'admin-view.html':
            const selectTraverseTree = document.getElementById('selectTraverseTree');
            selectTraverseTree.selectedIndex = 0;
            selectTraverseTree.click();
            break;
    }
});

const initTreeAvl = () => {
    // Si el valor de verifyTree no existe en localStorage, asignar un valor del tree vacío

    const verifyTree = localStorage.getItem("treeAvlContainer");
    if (verifyTree === null) {
        const treeContainer = new TreeAVL();
        const treeContainerJSON = JSON.stringify(treeContainer);
        localStorage.setItem("treeAvlContainer", treeContainerJSON);
    }

    // Verificar si el valor de admin ya existe en localStorage
    var admin = localStorage.getItem("admin");

    // Si el valor de admin no existe en localStorage, asignar un valor predeterminado
    if (admin === null) {
        const adminObj = new Student('admin', 'admin');
        const adminJSON = JSON.stringify(adminObj);
        localStorage.setItem("admin", adminJSON);
    }
}
