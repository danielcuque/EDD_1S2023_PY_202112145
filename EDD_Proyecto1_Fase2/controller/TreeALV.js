class TreeALV{
    
    constructor(){
        this.tree = new Tree();
    }
    
    addNode(){
        let node = new Node();
        node.value = document.getElementById("value").value;
        this.tree.addNode(node);
        this.tree.printTree();
    }
    
    removeNode(){
        let node = new Node();
        node.value = document.getElementById("value").value;
        this.tree.removeNode(node);
        this.tree.printTree();
    }
    
    searchNode(){
        let node = new Node();
        node.value = document.getElementById("value").value;
        this.tree.searchNode(node);
        this.tree.printTree();
    }
    
    printTree(){
        this.tree.printTree();
    }
    
    clearTree(){
        this.tree.clearTree();
        this.tree.printTree();
    }
    
    getTree(){
        return this.tree;
    }
}