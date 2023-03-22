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

    insert(student) {
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
                        node = this.rightRotate(node);
                    } else {
                        node = this.doubleRightRotate(node);
                    }
                }
            } else {
                node.student = student;
            }
        }
        node.height = this.max(this.height(node.left), this.height(node.right)) + 1
        return node;
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
        var aux = node.right;
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


    preOrden() {
        this.pre_orden(this.root);
    }

    pre_orden(node) {
        if (node != null) {
            console.log("Valor:", node.student);
            this.pre_orden(node.left);
            this.pre_orden(node.right);
        }
    }

    inOrden() {
        this.in_orden(this.root);
    }

    in_orden(node) {
        if (node != null) {
            this.in_orden(node.left);
            console.log("Valor:", node.student);
            this.in_orden(node.right);
        }
    }

    postOrden() {
        this.post_orden(this.root);
    }

    post_orden(node) {
        if (node != null) {
            this.post_orden(node.left);
            this.post_orden(node.right);
            console.log("Valor:", node.student);
        }
    }

    getRoot() {
        return this.root;
    }
}