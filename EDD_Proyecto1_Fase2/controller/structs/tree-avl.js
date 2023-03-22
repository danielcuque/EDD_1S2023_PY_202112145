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
        if (studentA > studentB) return studentA;
        return studentB;
    }

    height(node) {
        if (node == null) return -1;
        return node.height;
    }

    insertar(student) {
        this.root = this.add(student, this.root);
    }

    add(student, node) {
        if (node == null) return new Node(student);
        else {
            if (student.id < node.student.id) {
                node.left = this.add(student, node.left)
                if (this.height(node.right) - this.height(node.left) == -2) {
                    if (student < node.left.student) {
                        node = this.leftRotate(node);
                    } else {
                        node = this.doubleLeftRotate(node);
                    }
                }
            } else if (student > node.student) {
                node.right = this.add(student, node.right);
                if (this.height(node.right) - this.height(node.left) == 2) {
                    if (student > node.right.student) {
                        nodo = this.rightRotate(nodo);
                    } else {
                        nodo = this.doubleRightRotate(nodo);
                    }
                }
            } else {
                nodo.student = student;
            }
        }
        nodo.height = this.max(this.height(nodo.left), this.height(nodo.right)) + 1
        return nodo;
    }

    _

    leftRotate(nodo) {
        let aux = nodo.left;
        nodo.left = aux.right;
        aux.right = nodo;
        nodo.height = this.max(this.height(nodo.right), this.height(nodo.left)) + 1;
        aux.height = this.max(this.height(nodo.left), nodo.height) + 1;
        return aux;
    }

    doubleLeftRotate(nodo) {
        nodo.left = this.rightRotate(nodo.left);
        return this.leftRotate(nodo);
    }

    rightRotate(nodo) {
        var aux = nodo.right;
        nodo.right = aux.left;
        aux.left = nodo;
        nodo.height = this.max(this.height(nodo.right), this.height(nodo.left)) + 1;
        aux.height = this.max(this.height(nodo.right), nodo.height) + 1;
        return aux;
    }

    doubleRightRotate(nodo) {
        nodo.right = this.leftRotate(nodo.right);
        return this.rightRotate(nodo);
    }


    preOrden() {
        this.pre_orden(this.root);
    }

    pre_orden(nodo) {
        if (nodo != null) {
            console.log("Valor:", nodo.student);
            this.pre_orden(nodo.left);
            this.pre_orden(nodo.right);
        }
    }

    inOrden() {
        this.in_orden(this.root);
    }

    in_orden(nodo) {
        if (nodo != null) {
            this.in_orden(nodo.left);
            console.log("Valor:", nodo.student);
            this.in_orden(nodo.right);
        }
    }

    postOrden() {
        this.post_orden(this.root);
    }

    post_orden(nodo) {
        if (nodo != null) {
            this.post_orden(nodo.left);
            this.post_orden(nodo.right);
            console.log("Valor:", nodo.student);
        }
    }
}