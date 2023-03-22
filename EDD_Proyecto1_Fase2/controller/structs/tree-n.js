export class TreeN {

    constructor() {
        this.root = null;
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node;
        } else {
            this.root.addNode(node);
        }
    }

    removeNode(node) {
        if (this.root === null) {
            return;
        } else {
            this.root.removeNode(node);
        }
    }

    searchNode(node) {
        if (this.root === null) {
            return;
        } else {
            this.root.searchNode(node);
        }
    }

    printTree() {
        if (this.root === null) {
            return;
        } else {
            this.root.printTree();
        }
    }

    clearTree() {
        this.root = null;
    }

    getRoot() {
        return this.root;
    }

}