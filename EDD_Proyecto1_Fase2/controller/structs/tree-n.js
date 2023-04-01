class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

export class NaryTree {
    constructor() {
        this.root = null;
    }

    addNode(value, parentValue) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.traverse((node) => {
            if (node.value === parentValue) {
                node.children.push(newNode);
            }
        });
    }

    traverse(callback) {
        function walk(node) {
            callback(node);
            node.children.forEach(walk);
        }

        walk(this.root);
    }
}
