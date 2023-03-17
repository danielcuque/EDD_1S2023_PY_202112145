class NodeAVL {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

class TreeAVL{
    constructor(){
        this.root = null;
    }

    insert(value){
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node, value) {
        if (node == null) return new NodeAVL(value);
    }
}