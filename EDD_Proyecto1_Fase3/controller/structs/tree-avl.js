import { Student } from "../classes/student.js";

class Node {
    constructor(student) {
        this.student = student;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

export class TreeAVL {
    constructor() {
        this.root = null;
    }

    max(studentA, studentB) {
        if (studentA.id > studentB.id) return studentA;
        return studentB;
    }

    height(node) {
        if (node == null) return -1;
        return node.height;
    }

    insert(student) {
        this.root = this.add(student, this.root);
    }

    add(student, node) {
        if (node == null) return new Node(student);
        else {
            if (student.id < node.student.id) {
                node.left = this.add(student, node.left);
                if (this.height(node.right) - this.height(node.left) === -2) {
                    if (student.id < node.left.student.id) {
                        node = this.leftRotate(node);
                    } else {
                        node = this.doubleLeftRotate(node);
                    }
                }
            } else if (student.id > node.student.id) {
                node.right = this.add(student, node.right);
                if (this.height(node.right) - this.height(node.left) == 2) {
                    if (student.id > node.right.student.id) {
                        node = this.rightRotate(node);
                    } else {
                        node = this.doubleRightRotate(node);
                    }
                }
            } else {
                node.student = student;
            }
            node.height = this.max(this.height(node.left), this.height(node.right)) + 1;
            return node;
        }
    }

    leftRotate(node) {
        let aux = node.left;
        node.left = aux.right;
        aux.right = node;
        node.height = this.max(this.height(node.right), this.height(node.left)) + 1;
        aux.height = this.max(this.height(node.left), node.height) + 1;
        return aux;
    }

    doubleLeftRotate(node) {
        node.left = this.rightRotate(node.left);
        return this.leftRotate(node);
    }

    rightRotate(node) {
        let aux = node.right;
        node.right = aux.left;
        aux.left = node;
        node.height = this.max(this.height(node.right), this.height(node.left)) + 1;
        aux.height = this.max(this.height(node.right), node.height) + 1;
        return aux;
    }

    doubleRightRotate(node) {
        node.right = this.leftRotate(node.right);
        return this.rightRotate(node);
    }


    preOrder() {

        this.pre_order(this.root);
    }

    pre_order(node) {
        if (node != null) {
            document.getElementById('adminStudentsBody').appendChild(node.student.createRow());
            this.pre_order(node.left);
            this.pre_order(node.right);
        }
    }

    inOrder() {

        this.in_order(this.root);
    }

    in_order(node) {
        if (node != null) {
            this.in_order(node.left);
            document.getElementById('adminStudentsBody').appendChild(node.student.createRow());
            this.in_order(node.right);
        }
    }

    postOrder() {
        this.post_order(this.root);
    }

    post_order(node) {
        if (node != null) {
            this.post_order(node.left);
            this.post_order(node.right);
            document.getElementById('adminStudentsBody').appendChild(node.student.createRow());
        }
    }

    convertToGraphivz() {
        let graph = "https://quickchart.io/graphviz?graph=digraph G {";
        graph += this.convertToGraphivzAux(this.root);
        graph += "}";
        return graph;
    }

    convertToGraphivzAux(node) {
        let graph = "";
        if (node != null) {
            if (node.left != null) {
                graph += node.student.id + " -> " + node.left.student.id + ";";
            }
            if (node.right != null) {
                graph += node.student.id + " -> " + node.right.student.id + ";";
            }
            const studentName = node.student.name;
            const nodeHeight = node.height;
            graph += `${node.student.id} [label="${studentName}\\n ${node.student.id} \\nAltura: ${nodeHeight}"]`;
            graph += this.convertToGraphivzAux(node.left);
            graph += this.convertToGraphivzAux(node.right);
        }
        return graph;
    }

    searchStudentWithId(id) {
        return this.searchStudentWithIdAux(id, this.root);
    }

    searchStudentWithIdAux(id, node) {
        if (node != null) {
            if (node.student.id == id) {
                return node.student;
            } else if (node.student.id > id) {
                return this.searchStudentWithIdAux(id, node.left);
            } else {
                return this.searchStudentWithIdAux(id, node.right);
            }
        }
        return null;
    }

    searchStudent(id, password) {
        return this.searchStudentAux(id, password, this.root);
    }

    searchStudentAux(id, password, node) {
        if (node != null) {
            if (node.student.id == id && node.student.password == password) {
                return node.student;
            } else if (node.student.id > id) {
                return this.searchStudentAux(id, password, node.left);
            } else {
                return this.searchStudentAux(id, password, node.right);
            }
        }
        return null;
    }

    deserealizeTreeAVL() {
        this.deserealizeTreeAVLAux(this.root)
    }

    deserealizeTreeAVLAux(tree) {
        if (tree != null) {
            const node = Object.setPrototypeOf(tree, Node.prototype);
            const student = Object.setPrototypeOf(tree.student, Student.prototype);
            student.deserealizeStudent();
            node.left = this.deserealizeTreeAVLAux(tree.left);
            node.right = this.deserealizeTreeAVLAux(tree.right);
            return node;
        }
        return null;
    }
}