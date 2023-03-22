import { Student } from '../controller/classes/student.js'
import { TreeAVL } from '../controller/structs/tree-avl.js';

document.addEventListener("DOMContentLoaded", (e) => {
    // Insertamos el arbol AVL en el DOM
    const treeContainer = new TreeAVL();
    const treeContainerJSON = JSON.stringify(treeContainer);
    localStorage.setItem("treeContainer", treeContainerJSON);
    // Verificar si el valor de admin ya existe en localStorage
    var admin = localStorage.getItem("admin");

    // Si el valor de admin no existe en localStorage, asignar un valor predeterminado
    if (admin === null) {
        const adminObj = new Student('admin', 'admin');
        adminObj.isAdmin = true;
        const adminJSON = JSON.stringify(adminObj);
        localStorage.setItem("admin", adminJSON);
    }
});