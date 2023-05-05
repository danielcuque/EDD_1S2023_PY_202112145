export class Graph {
    constructor() {
        this.nodes = 0;
        this.adjacentMatrix = {};
    }
    addVertex(node) {
        if (!this.adjacentMatrix[node]) {
            this.adjacentMatrix[node] = [];
            this.nodes++;
        }
    }
    addEdge(node1, node2) {
        this.adjacentMatrix[node1].push(node2);
    }

    toDot() {
        let dot = "graph G { \n rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato;\n";
        for (let node in this.adjacentMatrix) {
            dot += `    "${node}";\n`;
        }
        for (let node in this.adjacentMatrix) {
            this.adjacentMatrix[node].forEach(adjacentNode => {
                dot += `    "${node}" -- "${adjacentNode}" [len=2.00];\n`;
            });
        }
        dot += "}";
        return dot;
    }
}