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
    return Object.setPrototypeOf(JSON.parse(localStorage.getItem("treeAVLContainer")), TreeAVL.prototype);
}

export const getStudent = (node) => {
    return Object.setPrototypeOf(node.student, Student.prototype);
}

export const getAdmin = () => {
    return Object.setPrototypeOf(JSON.parse(localStorage.getItem("admin")), Student.prototype);
}

export const getCurrentUser = () => {
    const user = Object.setPrototypeOf(JSON.parse(localStorage.getItem("currentUser")), Student.prototype);
    user.getNaryTree();
    return user;
}