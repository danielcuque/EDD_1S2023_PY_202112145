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
    const tree = getTree();
    const studentToSearch = JSON.parse(localStorage.getItem("currentUser"));
    const student = tree.searchStudent(studentToSearch.id, studentToSearch.password);
    return student;
}
