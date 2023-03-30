import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";


export const getTree = () => {
    return Object.setPrototypeOf(JSON.parse(localStorage.getItem("treeAvlContainer")), TreeAVL.prototype);
}

export const getStudent = (node) => {
    return Object.setPrototypeOf(node.student, Student.prototype);
}