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
}
