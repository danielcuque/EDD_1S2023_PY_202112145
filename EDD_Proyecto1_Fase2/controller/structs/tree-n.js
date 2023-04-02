class Node {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.children = [];
    }
}

export class NaryTree {
    constructor() {
        this.root = new Node("/", 'directory');
    }

    searchPath(path) {
        let current = this.root;
        const pathArray = path.split('/');
        for (let i = 1; i < pathArray.length; i++) {
            const child = current.children.find(child => child.name === pathArray[i]);
            if (child) {
                current = child;
            } else {
                return null;
            }
        }
        return current;
    }

    createPath(path) {
        let current = this.root;
        const pathArray = path.split('/');
        for (let i = 1; i < pathArray.length; i++) {
            const child = current.children.find(child => child.name === pathArray[i]);
            if (child) {
                current = child;
            } else {
                const newNode = new Node(pathArray[i], 'directory');
                current.children.push(newNode);
                current = newNode;
            }
        }
        return current;
    }

    createFile(path, name) {
        const current = this.searchPath(path);
        if (current) {
            const newNode = new Node(name, 'file');
            current.children.push(newNode);
            return true;
        }
        return false;
    }

    deleteFile(path, name) {
        const current = this.searchPath(path);
        if (current) {
            const index = current.children.findIndex(child => child.name === name);
            if (index !== -1) {
                current.children.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    deletePath(path) {
        const pathArray = path.split('/');
        const parentPath = pathArray.slice(0, pathArray.length - 1).join('/');
        const parent = this.searchPath(parentPath);
        if (parent) {
            const index = parent.children.findIndex(child => child.name === pathArray[pathArray.length - 1]);
            if (index !== -1) {
                parent.children.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    // Este método sirve para convertir el árbol del local storage y recuperar todos sus nodos
    deserializeTree() {
        Object.setPrototypeOf(this.root, Node.prototype);
        this.root.children.forEach(child => {
            this.deserializeNode(child);
        });
    }

    deserializeNode(node) {
        Object.setPrototypeOf(node, Node.prototype);
        node.children.forEach(child => {
            this.deserializeNode(child);
        });
    }
}
